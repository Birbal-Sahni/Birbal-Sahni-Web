import os
import re

def strip_js_comments(text):
    pattern = re.compile(
        r'//.*?$|/\*.*?\*/|"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'|`(?:\\.|[^`\\])*`|/(?:\\.|[^/\\])+/',
        re.DOTALL | re.MULTILINE
    )
    def replacer(match):
        s = match.group(0)
        if s.startswith('/'):
            if s.startswith('//'):
                return ''
            elif s.startswith('/*'):
                return '\n' * s.count('\n')
            else:
                return s
        else:
            return s
    return pattern.sub(replacer, text)

def strip_css_comments(text):
    pattern = re.compile(
        r'/\*.*?\*/|"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'',
        re.DOTALL
    )
    def replacer(match):
        s = match.group(0)
        if s.startswith('/*'):
            return '\n' * s.count('\n')
        else:
            return s
    return pattern.sub(replacer, text)

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    ext = os.path.splitext(filepath)[1]
    if ext in ['.ts', '.tsx']:
        new_content = strip_js_comments(content)
    elif ext == '.css':
        new_content = strip_css_comments(content)
    else:
        return
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Stripped comments from: {filepath}")

def main():
    root_dirs = [
        r'c:\Users\prana\Desktop\Birbal-Sahni\app',
        r'c:\Users\prana\Desktop\Birbal-Sahni\components'
    ]
    for root_dir in root_dirs:
        for root, dirs, files in os.walk(root_dir):
            for file in files:
                filepath = os.path.join(root, file)
                if file.endswith(('.ts', '.tsx', '.css')):
                    process_file(filepath)

if __name__ == '__main__':
    main()
