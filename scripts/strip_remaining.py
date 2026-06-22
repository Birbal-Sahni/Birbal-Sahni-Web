import re

def strip_comments(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove JSX comments {.../* ... */}
    content = re.sub(r'\{\s*/\*.*?\*/\s*\}', '', content, flags=re.DOTALL)

    # 2. Remove JS block comments /* ... */
    content = re.sub(r'/\*.*?\*/', lambda m: '\n' * m.group(0).count('\n'), content, flags=re.DOTALL)

    # 3. Remove leading // comments line-by-line
    lines = content.split('\n')
    new_lines = []
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('//'):
            if "CALIBRATION" in stripped:
                new_lines.append(line)
            else:
                new_lines.append('')
        else:
            new_lines.append(line)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))
    print(f"Stripped comments safely from {filepath}")

strip_comments("components/Hero.tsx")
strip_comments("components/Preloader.tsx")
