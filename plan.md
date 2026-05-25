# Product Page Spanish Translation — Plan

## Problem
The 4 product deep-dive pages (SyringePage.tsx, PeelingPage.tsx, ScrubPage.tsx, NailKitPage.tsx) have ALL content hardcoded inline in English JSX. No bilingual support at all. This is why the screenshot shows English despite language being set to Español.

## Solution
1. Create unified bilingual data structure in `src/data/productDeepDives.ts`
2. Extract ALL content from 4 product pages into data objects
3. Translate everything to Spanish
4. Rewrite all 4 pages to read from bilingual data based on language setting

## Stage 1: Data Structure + Content Extraction (parallel)
- 4 agents, 1 per product page
- Each reads the full page, extracts every English string, and returns a bilingual data object

## Stage 2: Page Rewriting (parallel)
- Rewrite all 4 product pages to use the data + `useLanguage()` hook

## Stage 3: Build + Deploy
