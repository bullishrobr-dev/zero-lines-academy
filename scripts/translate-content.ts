#!/usr/bin/env tsx
// ─────────────────────────────────────────────────────────────────────────────
// translate-content.ts — Build-time auto-translation using DeepL API
// 
// USAGE:
//   1. Sign up at deepl.com, get free API key (500K chars/month)
//   2. Set environment variable: export DEEPL_API_KEY=your-key
//   3. Run: npx tsx scripts/translate-content.ts
//
// This script finds all English content without Spanish translations
// and auto-translates them using DeepL (best quality EN→ES).
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs';
import path from 'path';

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

interface DeepLResponse {
  translations: { text: string; detected_source_language: string }[];
}

/** Call DeepL API to translate text */
async function translateWithDeepL(text: string): Promise<string> {
  if (!DEEPL_API_KEY) {
    console.error('❌ DEEPL_API_KEY not set. Get a free key at deepl.com/pro-account');
    console.error('   Then run: export DEEPL_API_KEY=your-key');
    process.exit(1);
  }

  const response = await fetch(DEEPL_API_URL, {
    method: 'POST',
    headers: { 'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ text, source_lang: 'EN', target_lang: 'ES' }),
  });

  if (!response.ok) {
    throw new Error(`DeepL API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json() as DeepLResponse;
  return data.translations[0]?.text || text;
}

/** Find all untranslated strings in a TypeScript data file */
function findUntranslatedStrings(filePath: string): { line: number; enText: string; field: string }[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const untranslated: { line: number; enText: string; field: string }[] = [];

  // Look for patterns like: text: 'English' without matching textEs: '...'
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Match text: '...' or question: '...' or answer: '...' (English fields)
    const enMatch = line.match(/^(\s+)(text|question|answer|explanation|title|subtitle|prompt|tip):\s*['"`](.+?)['"`],?\s*$/);
    if (enMatch) {
      const indent = enMatch[1];
      const field = enMatch[2];
      const enText = enMatch[3];
      const esField = `${field}Es`;
      
      // Check if the next few lines have the Spanish version
      let hasSpanish = false;
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
        if (lines[j].includes(`${esField}:`) || lines[j].includes(`${esField} :`)) {
          // Check if it has a non-empty value
          const esMatch = lines[j].match(new RegExp(`${esField}\\s*:\\s*['"`](.+?)['"`]`));
          if (esMatch && esMatch[1].trim()) {
            hasSpanish = true;
            break;
          }
        }
        // If we hit a new English field or closing brace, stop looking
        if (lines[j].match(/^(\s+)(text|question|answer)\s*:/) || lines[j].trim() === '},' || lines[j].trim() === '}') {
          break;
        }
      }
      
      if (!hasSpanish) {
        untranslated.push({ line: i + 1, enText, field: esField });
      }
    }
  }

  return untranslated;
}

/** Add Spanish translations to a file */
async function translateFile(filePath: string): Promise<void> {
  console.log(`\n📄 Processing: ${path.basename(filePath)}`);
  
  const untranslated = findUntranslatedStrings(filePath);
  if (untranslated.length === 0) {
    console.log('   ✅ All content already translated');
    return;
  }

  console.log(`   Found ${untranslated.length} untranslated strings`);
  
  let content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  // Process from bottom to top to preserve line numbers
  const sorted = [...untranslated].sort((a, b) => b.line - a.line);
  
  for (const item of sorted) {
    try {
      const spanish = await translateWithDeepL(item.enText);
      // Insert the Spanish translation after the English line
      const indentMatch = lines[item.line - 1].match(/^(\s+)/);
      const indent = indentMatch ? indentMatch[1] : '    ';
      lines.splice(item.line, 0, `${indent}${item.field}: '${spanish.replace(/'/g, "\\'")}',`);
      console.log(`   ✓ Line ${item.line}: "${item.enText.substring(0, 40)}..." → "${spanish.substring(0, 40)}..."`);
    } catch (err) {
      console.error(`   ✗ Failed to translate line ${item.line}: ${err}`);
    }
  }

  fs.writeFileSync(filePath, lines.join('\n'));
  console.log(`   💾 Saved: ${path.basename(filePath)}`);
}

/** Main */
async function main() {
  console.log('🌐 Zero Lines Content Auto-Translator');
  console.log('=====================================\n');
  
  if (!DEEPL_API_KEY) {
    console.log('⚠️  DEEPL_API_KEY not set.');
    console.log('   Get a FREE API key: https://www.deepl.com/pro-account');
    console.log('   Then run: export DEEPL_API_KEY=your-key');
    console.log('   Free tier: 500,000 characters/month\n');
    return;
  }

  const dataDir = path.join(process.cwd(), 'src', 'data');
  const files = [
    'lessons.ts',
    'generalQuizzes.ts', 
    'moreQuizzes.ts',
    'moreQuizzes2.ts',
    'flashcards.ts',
    'dailyDoses.ts',
    'objectionLessons.ts',
    'scenarioLessons.ts',
  ];

  let totalTranslated = 0;
  
  for (const file of files) {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) {
      console.log(`⏭️  Skipping (not found): ${file}`);
      continue;
    }
    
    const before = findUntranslatedStrings(filePath).length;
    if (before > 0) {
      await translateFile(filePath);
      const after = findUntranslatedStrings(filePath).length;
      totalTranslated += (before - after);
    } else {
      console.log(`\n📄 ${file}: ✅ All translated`);
    }
  }

  console.log(`\n🎉 Done! Translated ${totalTranslated} new strings.`);
  console.log('   Run `npm run build` to deploy the updated translations.\n');
}

main().catch(console.error);
