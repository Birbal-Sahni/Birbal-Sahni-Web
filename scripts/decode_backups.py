import json

def decode_file(bak_path, target_path):
    with open(bak_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # If double quoted and escaped, json.loads will decode it
    try:
        decoded = json.loads(content)
    except Exception as e:
        # Fallback: decode unicode escape
        decoded = content.encode('utf-8').decode('unicode-escape')
    
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(decoded)
    print(f"Decoded {bak_path} into {target_path}")

decode_file("components/Hero.tsx.bak", "components/Hero.tsx")
decode_file("components/Preloader.tsx.bak", "components/Preloader.tsx")
