#!/usr/bin/env python3
"""
Master injection script: combines all 8 translation group files and injects
textEs, itemsEs, leftEs, rightEs, attributionEs fields into lessons.ts.
Processes line-by-line to avoid false matches.
"""

import re, os, sys

# ── Load all translation dictionaries ──
all_translations = {}
for i in range(1, 9):
    path = f'/mnt/agents/output/app/scripts/translations_group{i}.py'
    with open(path, 'r', encoding='utf-8') as f:
        code = f.read()
    # Extract the dictionary from the file
    dict_match = re.search(r'translations_group\d+\s*=\s*\{', code)
    if dict_match:
        # Execute the file in a namespace to get the dict
        namespace = {}
        exec(code, namespace)
        var_name = [k for k in namespace if k.startswith('translations_group')][0]
        group_dict = namespace[var_name]
        print(f"Loaded {var_name}: {len(group_dict)} entries")
        # Merge (later groups can override earlier ones)
        for k, v in group_dict.items():
            if v and v.strip():  # Skip empty translations
                all_translations[k] = v

print(f"\nTotal unique translations: {len(all_translations)}")

# Read lessons.ts
with open('/mnt/agents/output/app/src/data/lessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

original_lines = content.split('\n')
new_lines = []
changes = {
    'textEs_added': 0,
    'itemsEs_added': 0,
    'attributionEs_added': 0,
    'leftEs_added': 0,
    'rightEs_added': 0,
    'skipped_already_has': 0,
    'no_translation_found': 0,
}

def has_following_field(lines, start_idx, field_name, max_lookahead=5):
    """Check if a field (like textEs) already exists within next N lines."""
    for j in range(start_idx + 1, min(start_idx + max_lookahead, len(lines))):
        stripped = lines[j].strip()
        if stripped.startswith(f'{field_name}:'):
            return True
        # Stop if we hit a new field that's not the one we're looking for
        # and it's at the same or lower indentation
        if stripped and not stripped.startswith('//') and not stripped.startswith('*'):
            # Check if it's a new field at the same section level
            if ':' in stripped and not stripped.startswith("'"):
                indent_j = len(lines[j]) - len(lines[j].lstrip())
                indent_start = len(lines[start_idx]) - len(lines[start_idx].lstrip())
                if indent_j <= indent_start + 4:
                    # Could be a sibling field - check if it's textEs/itemsEs etc
                    if any(stripped.startswith(x) for x in ['text:', 'items:', 'attribution:', 'left:', 'right:', 'type:', 'script:', 'quote:', 'tip:', 'divider', 'subheader', 'keypoint', 'paragraph', 'header:', 'comparison:']):
                        break
    return False

def get_indent(line):
    return len(line) - len(line.lstrip())

def find_section_end(lines, start_idx):
    """Find the closing }, or ], for a section starting at start_idx."""
    depth = 0
    in_string = False
    string_char = None
    escape_next = False
    
    for j in range(start_idx, len(lines)):
        line = lines[j]
        for k, ch in enumerate(line):
            if escape_next:
                escape_next = False
                continue
            if ch == '\\':
                escape_next = True
                continue
            if not in_string:
                if ch in "'\"`":
                    in_string = True
                    string_char = ch
                elif ch in '{[(':
                    depth += 1
                elif ch in '}])':
                    depth -= 1
                    if depth <= 0:
                        return j
            else:
                if ch == string_char:
                    in_string = False
    return start_idx

def escape_quotes(s):
    """Escape single quotes for JavaScript string literal."""
    return s.replace("'", "\\'")

def unescape_quotes(s):
    """Unescape single quotes from regex capture."""
    return s.replace("\\'", "'")

i = 0
while i < len(original_lines):
    line = original_lines[i]
    stripped = line.strip()
    indent_str = line[:len(line) - len(line.lstrip())]
    indent = len(indent_str)
    
    # ── Handle text: fields ──
    text_match = re.search(r"text:\s*'((?:[^'\\]|\\.)*)'", stripped)
    if text_match:
        english = unescape_quotes(text_match.group(1))
        new_lines.append(line)
        # Check if textEs already follows
        already_has = False
        for j in range(i + 1, min(i + 4, len(original_lines))):
            if 'textEs:' in original_lines[j]:
                already_has = True
                break
            # Stop at next field indicator at same indent
            nxt = original_lines[j].strip()
            if nxt and not nxt.startswith('//') and get_indent(original_lines[j]) <= indent:
                break
        if already_has:
            changes['skipped_already_has'] += 1
        elif english in all_translations:
            spanish = escape_quotes(all_translations[english])
            new_lines.append(f"{indent_str}textEs: '{spanish}',")
            changes['textEs_added'] += 1
        else:
            changes['no_translation_found'] += 1
        i += 1
        continue
    
    # ── Handle attribution: fields ──
    attr_match = re.search(r"attribution:\s*'((?:[^'\\]|\\.)*)'", stripped)
    if attr_match:
        english = unescape_quotes(attr_match.group(1))
        new_lines.append(line)
        already_has = False
        for j in range(i + 1, min(i + 4, len(original_lines))):
            if 'attributionEs:' in original_lines[j]:
                already_has = True
                break
            nxt = original_lines[j].strip()
            if nxt and not nxt.startswith('//') and (nxt.startswith('}') or nxt.startswith('],')):
                break
        if already_has:
            changes['skipped_already_has'] += 1
        elif english in all_translations:
            spanish = escape_quotes(all_translations[english])
            new_lines.append(f"{indent_str}attributionEs: '{spanish}',")
            changes['attributionEs_added'] += 1
        i += 1
        continue
    
    # ── Handle items: [ ... ] blocks ──
    items_start_match = re.search(r"items:\s*\[", stripped)
    if items_start_match and 'itemsEs' not in stripped:
        # Find where this items block ends
        items_start_idx = i
        bracket_depth = 0
        in_string = False
        string_char = None
        escape_next = False
        items_end_idx = i
        
        for j in range(i, len(original_lines)):
            scan_line = original_lines[j]
            for k, ch in enumerate(scan_line):
                if escape_next:
                    escape_next = False
                    continue
                if ch == '\\':
                    escape_next = True
                    continue
                if not in_string:
                    if ch in "'\"`":
                        in_string = True
                        string_char = ch
                    elif ch == '[':
                        bracket_depth += 1
                    elif ch == ']':
                        bracket_depth -= 1
                        if bracket_depth == 0:
                            items_end_idx = j
                            break
                else:
                    if ch == string_char:
                        in_string = False
            if bracket_depth == 0:
                break
        
        # Extract all items
        items_block = '\n'.join(original_lines[items_start_idx:items_end_idx+1])
        item_strings = re.findall(r"'((?:[^'\\]|\\.)*)'", items_block)
        # Filter to meaningful strings (not type names, etc.)
        item_strings = [unescape_quotes(s) for s in item_strings if len(s) > 3]
        
        # Write the original items block lines
        for j in range(items_start_idx, items_end_idx + 1):
            new_lines.append(original_lines[j])
        
        # Check if itemsEs follows
        already_has = False
        for j in range(items_end_idx + 1, min(items_end_idx + 5, len(original_lines))):
            if 'itemsEs:' in original_lines[j]:
                already_has = True
                break
            nxt = original_lines[j].strip()
            if nxt and not nxt.startswith('//') and get_indent(original_lines[j]) <= indent and not nxt.startswith(']'):
                break
        
        if already_has:
            changes['skipped_already_has'] += 1
        else:
            # Build itemsEs array
            translated_items = []
            all_found = True
            for item_en in item_strings:
                if item_en in all_translations:
                    translated_items.append(escape_quotes(all_translations[item_en]))
                else:
                    all_found = False
                    # Use original if no translation
                    translated_items.append(escape_quotes(item_en))
            
            if translated_items:
                items_indent = indent_str + '    '
                items_es_lines = [f"{indent_str}itemsEs: ["] + [f"{items_indent}'{ti}'," for ti in translated_items] + [f"{indent_str}  ],"]
                new_lines.extend(items_es_lines)
                changes['itemsEs_added'] += 1
        
        i = items_end_idx + 1
        continue
    
    # ── Handle left: { label: "...", text: "..." } and right: same ──
    lr_match = re.search(r"(left|right):\s*\{", stripped)
    if lr_match:
        side = lr_match.group(1)  # 'left' or 'right'
        # Find the closing brace of this object
        obj_start_idx = i
        brace_depth = 0
        in_string = False
        string_char = None
        escape_next = False
        obj_end_idx = i
        
        for j in range(i, len(original_lines)):
            scan_line = original_lines[j]
            for k, ch in enumerate(scan_line):
                if escape_next:
                    escape_next = False
                    continue
                if ch == '\\':
                    escape_next = True
                    continue
                if not in_string:
                    if ch in "'\"`":
                        in_string = True
                        string_char = ch
                    elif ch == '{':
                        brace_depth += 1
                    elif ch == '}':
                        brace_depth -= 1
                        if brace_depth == 0:
                            obj_end_idx = j
                            break
                else:
                    if ch == string_char:
                        in_string = False
            if brace_depth == 0:
                break
        
        # Write original lines
        for j in range(obj_start_idx, obj_end_idx + 1):
            new_lines.append(original_lines[j])
        
        # Extract label and text
        lr_block = '\n'.join(original_lines[obj_start_idx:obj_end_idx+1])
        label_match = re.search(r"label:\s*'((?:[^'\\]|\\.)*)'", lr_block)
        text_match = re.search(r"text:\s*'((?:[^'\\]|\\.)*)'", lr_block)
        
        already_has = False
        for j in range(obj_end_idx + 1, min(obj_end_idx + 4, len(original_lines))):
            if f'{side}Es:' in original_lines[j]:
                already_has = True
                break
            nxt = original_lines[j].strip()
            if nxt and not nxt.startswith('//') and get_indent(original_lines[j]) <= indent:
                break
        
        if already_has:
            changes['skipped_already_has'] += 1
        else:
            label_en = unescape_quotes(label_match.group(1)) if label_match else ''
            text_en = unescape_quotes(text_match.group(1)) if text_match else ''
            label_es = escape_quotes(all_translations.get(label_en, label_en))
            text_es = escape_quotes(all_translations.get(text_en, text_en))
            
            new_lines.append(indent_str + side + "Es: { label: '" + label_es + "', text: '" + text_es + "' },")
            changes[f'{side}Es_added'] += 1
        
        i = obj_end_idx + 1
        continue
    
    # Default: just copy the line
    new_lines.append(line)
    i += 1

# Write the output
output = '\n'.join(new_lines)
with open('/mnt/agents/output/app/src/data/lessons.ts', 'w', encoding='utf-8') as f:
    f.write(output)

print("\n=== INJECTION COMPLETE ===")
for k, v in changes.items():
    print(f"  {k}: {v}")
print(f"\nTotal lines: {len(original_lines)} → {len(new_lines)} (delta: {len(new_lines) - len(original_lines)})")
