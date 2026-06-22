import os

root_dirs = [
    r'c:\Users\prana\Desktop\Birbal-Sahni\app',
    r'c:\Users\prana\Desktop\Birbal-Sahni\components'
]

for root_dir in root_dirs:
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(('.ts', '.tsx', '.css')):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    for i, line in enumerate(f, 1):
                        if '//' in line and not line.strip().startswith('//'):
                            print(f"{file}:{i} -> {line.strip()}")
