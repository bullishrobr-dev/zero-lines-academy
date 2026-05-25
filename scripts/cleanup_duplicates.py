#!/usr/bin/env python3
"""
Remove incorrectly-placed standalone textEs lines that appear immediately
after leftEs, left:, rightEs, or right: lines.
These are duplicates because leftEs/rightEs already contain the translated text.
"""

with open('/mnt/agents/output/app/src/data/lessons.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
removed = 0

for i, line in enumerate(lines):
    stripped = line.strip()
    
    # Check if this is a standalone textEs line right after a left/right related line
    if stripped.startswith('textEs:') and i > 0:
        prev_stripped = new_lines[-1].strip() if new_lines else ''
        if any(prev_stripped.startswith(prefix) for prefix in ['leftEs:', 'left:', 'rightEs:', 'right:']):
            removed += 1
            continue  # Skip this duplicate textEs line
    
    new_lines.append(line)

with open('/mnt/agents/output/app/src/data/lessons.ts', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Removed {removed} duplicate textEs lines")
