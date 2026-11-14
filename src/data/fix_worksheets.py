# -*- coding: utf-8 -*-
with open(r'C:\Users\Acer Nitro\.gemini\antigravity\scratch\qazmarket\src\data\worksheets.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
i = 0
while i < len(lines):
    line = lines[i]
    stripped = line.rstrip('\r\n')
    # Count quotes
    quotes = stripped.count('"') - stripped.count(r'\"')
    if quotes % 2 != 0:
        # String started on this line and didn't close
        merged = stripped
        i += 1
        while i < len(lines):
            next_line = lines[i].rstrip('\r\n')
            next_quotes = next_line.count('"') - next_line.count(r'\"')
            merged += r'\n' + next_line
            if next_quotes % 2 != 0:
                # String closed
                break
            i += 1
        new_lines.append(merged + '\n')
    else:
        new_lines.append(line)
    i += 1

with open(r'C:\Users\Acer Nitro\.gemini\antigravity\scratch\qazmarket\src\data\worksheets.ts', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print('worksheets.ts fixed. New line count:', len(new_lines))
