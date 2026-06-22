import json
import os

log_path = r"C:\Users\prana\.gemini\antigravity-ide\brain\e92ec6f6-4e06-4ebc-b017-ac610031323a\.system_generated\logs\transcript.jsonl"

hero_code = None
preloader_code = None

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            tool_calls = data.get("tool_calls", [])
            for tc in tool_calls:
                if tc.get("name") == "write_to_file":
                    args = tc.get("args", {})
                    target = args.get("TargetFile", "")
                    content = args.get("CodeContent", "")
                    if "Hero.tsx" in target:
                        hero_code = content
                    if "Preloader.tsx" in target:
                        preloader_code = content
        except Exception as e:
            pass

if hero_code:
    with open("components/Hero.tsx.bak", "w", encoding="utf-8") as f:
        f.write(hero_code)
    print("Saved components/Hero.tsx.bak")

if preloader_code:
    with open("components/Preloader.tsx.bak", "w", encoding="utf-8") as f:
        f.write(preloader_code)
    print("Saved components/Preloader.tsx.bak")
