#!/usr/bin/env python3
"""
Add missing trailing commas to lines that now have a Spanish translation following them.
Original format had text/attribution/items as last property (no comma needed).
Adding textEs/attributionEs/itemsEs/leftEs/rightEs means they now need commas.
"""

import re

with open('/mnt/agents/output/app/src/data/lessons.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
fixed = 0

for i, line in enumerate(lines):
    new_lines.append(line)
    stripped = line.strip()
    
    # Check if this line ends with text/attribution/items/left/right WITHOUT a comma
    # and the next line has the corresponding Es field
    if i + 1 < len(lines):
        next_line = lines[i + 1]
        next_stripped = next_line.strip()
        
        # text: '...' → needs comma if followed by textEs:
        if re.search(r"text:\s*'[^']*'$", stripped) and next_stripped.startswith('textEs:'):
            if not line.rstrip().endswith(','):
                new_lines[-1] = line.rstrip() + ',\n'
                fixed += 1
        
        # attribution: '...' → needs comma if followed by attributionEs:
        if re.search(r"attribution:\s*'[^']*'$", stripped) and next_stripped.startswith('attributionEs:'):
            if not line.rstrip().endswith(','):
                new_lines[-1] = line.rstrip() + ',\n'
                fixed += 1
        
        # items: [ ... ] → needs comma if followed by itemsEs:
        if re.search(r"items:\s*\[", stripped) and next_stripped.startswith('itemsEs:'):
            # Find the line where the items array ends
            pass  # Multi-line items arrays already end with ], which has a comma in the original
        
        # left: { ... } → needs comma if followed by leftEs:
        if re.search(r"left:\s*\{", stripped) and next_stripped.startswith('leftEs:'):
            if not line.rstrip().endswith(','):
                new_lines[-1] = line.rstrip() + ',\n'
                fixed += 1
        
        # right: { ... } → needs comma if followed by rightEs:
        if re.search(r"right:\s*\{", stripped) and next_stripped.startswith('rightEs:'):
            if not line.rstrip().endswith(','):
                new_lines[-1] = line.rstrip() + ',\n'
                fixed += 1

# Now handle items: [ ... ] arrays — find lines ending with ], that are followed by itemsEs:
new_lines2 = []
for i, line in enumerate(new_lines):
    new_lines2.append(line)
    stripped = line.strip()
    
    # Match items array closing: '...', (last item of array, no trailing comma on the item)
    # Actually, the items array closing line is: "        ],"
    # We need to check if itemsEs follows after the closing ],
    
    if re.search(r"\],$", stripped) and not stripped.endswith("'],"):
        # Check if next non-empty line is itemsEs:
        if i + 1 < len(new_lines):
            next_stripped = new_lines[i + 1].strip()
            if next_stripped.startswith('itemsEs:'):
                # Make sure current line ends with comma
                if not line.rstrip().endswith(','):
                    new_lines2[-1] = line.rstrip() + ',\n'
                    fixed += 1

with open('/mnt/agents/output/app/src/data/lessons.ts', 'w', encoding='utf-8') as f:
    f.writelines(new_lines2)

print(f"Fixed {fixed} lines — added trailing commas")
