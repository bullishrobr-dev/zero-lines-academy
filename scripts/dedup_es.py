#!/usr/bin/env python3
"""
Remove duplicate Es fields that appear twice for the same property.
"""

with open('/mnt/agents/output/app/src/data/lessons.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
removed = 0

i = 0
while i < len(lines):
    line = lines[i]
    stripped = line.strip()
    new_lines.append(line)
    
    # Check if this is an Es field
    for prefix in ['textEs:', 'itemsEs:', 'attributionEs:', 'leftEs:', 'rightEs:']:
        if stripped.startswith(prefix):
            # Look ahead: if the next line is the SAME Es field, skip it
            if i + 1 < len(lines):
                next_stripped = lines[i + 1].strip()
                if next_stripped.startswith(prefix):
                    # Skip the duplicate
                    i += 1  # Skip the next line (we'll i++ at end too)
                    removed += 1
            break
    
    i += 1

with open('/mnt/agents/output/app/src/data/lessons.ts', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Removed {removed} duplicate Es fields")
