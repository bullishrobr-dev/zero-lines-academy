#!/usr/bin/env python3
"""
Robust trailing comma fix: any line ending with '}' or ']' or "'" 
that is followed by an Es field gets a comma added.
"""

with open('/mnt/agents/output/app/src/data/lessons.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
fixed = 0

es_fields = ('textEs:', 'itemsEs:', 'attributionEs:', 'leftEs:', 'rightEs:')

for i, line in enumerate(lines):
    new_lines.append(line)
    stripped = line.strip()
    
    if i + 1 >= len(lines):
        continue
    
    next_stripped = lines[i + 1].strip()
    
    # Only care if next line is an Es translation field
    if not any(next_stripped.startswith(ef) for ef in es_fields):
        continue
    
    # Check if current line ends properly (should end with ',' or '{' or '[')
    rstrip = line.rstrip()
    if rstrip.endswith(','):
        continue  # Already has comma
    
    # Add comma to the end of this line
    new_lines[-1] = rstrip + ',\n'
    fixed += 1

with open('/mnt/agents/output/app/src/data/lessons.ts', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Fixed {fixed} lines — added trailing commas")
