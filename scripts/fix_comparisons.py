#!/usr/bin/env python3
"""
Second-pass fix for single-line comparison objects (left/right).
Adds leftEs/rightEs fields after each untranslated left/right line.
"""

import re

with open('/mnt/agents/output/app/src/data/lessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Load all translations
import sys
sys.path.insert(0, '/mnt/agents/output/app/scripts')
all_translations = {}
for i in range(1, 9):
    path = f'/mnt/agents/output/app/scripts/translations_group{i}.py'
    with open(path, 'r', encoding='utf-8') as f:
        code = f.read()
    namespace = {}
    try:
        exec(code, namespace)
        var_name = [k for k in namespace if k.startswith('translations_group')][0]
        group_dict = namespace[var_name]
        for k, v in group_dict.items():
            if v and v.strip():
                all_translations[k] = v
    except Exception as e:
        print(f"Warning: could not load {path}: {e}")

def escape_js(s):
    return s.replace("'", "\\'")

def unescape_js(s):
    return s.replace("\\'", "'")

changes = 0
lines = content.split('\n')
new_lines = []

for i, line in enumerate(lines):
    stripped = line.strip()
    
    # Match single-line left/right: { label: '...', text: '...' },
    pattern = r"^(\s*)(left|right):\s*\{\s*label:\s*'((?:[^'\\]|\\.)*)'\s*,\s*text:\s*'((?:[^'\\]|\\.)*)'\s*\},"
    match = re.search(pattern, stripped)
    if match:
        indent_str = line[:len(line) - len(line.lstrip())]
        side = match.group(2)
        label_en = unescape_js(match.group(3))
        text_en = unescape_js(match.group(4))
        
        # Check if leftEs/rightEs already exists on next line
        already_has = False
        if i + 1 < len(lines):
            next_stripped = lines[i + 1].strip()
            if f'{side}Es:' in next_stripped:
                already_has = True
        
        new_lines.append(line)
        
        if not already_has:
            label_es = escape_js(all_translations.get(label_en, label_en))
            text_es = escape_js(all_translations.get(text_en, text_en))
            new_lines.append(indent_str + side + "Es: { label: '" + label_es + "', text: '" + text_es + "' },")
            changes += 1
    else:
        new_lines.append(line)

output = '\n'.join(new_lines)
with open('/mnt/agents/output/app/src/data/lessons.ts', 'w', encoding='utf-8') as f:
    f.write(output)

print(f"Added {changes} {side}Es fields for comparison objects")
