import os

# Configuration
OUTPUT_FILE = "full_context.md"
ROOT_DIR = "."
INCLUDED_EXTENSIONS = {".md", ".json", ".ts", ".tsx", ".py", ".prisma", ".txt"}
EXCLUDED_DIRS = {
    "node_modules", ".git", ".next", "dist", "build", "coverage", "lib",
    ".turbo", ".vscode", "pnpm-lock.yaml", "yarn.lock", "package-lock.json"
}
EXCLUDED_FILES = {
    "pnpm-lock.yaml", "yarn.lock", "package-lock.json", ".DS_Store"
}

# Key directories to focus on (whitelist approach for code, wildcard for docs)
PRIORITY_DIRS = [
    "docs-specs",
    "apps",
    "packages",
]

def is_text_file(filepath):
    """Check if file is text by reading first chunk."""
    try:
        with open(filepath, 'rb') as f:
            chunk = f.read(1024)
        return not b'\0' in chunk
    except:
        return False

def generate_context():
    with open(OUTPUT_FILE, "w", encoding="utf-8") as outfile:
        outfile.write("# Code Context Aggregation\n\n")
        
        # 1. Add Root Files (Config & Docs)
        for filename in os.listdir(ROOT_DIR):
            if filename in EXCLUDED_FILES: continue
            if os.path.isfile(filename) and (filename.endswith(".md") or filename.endswith(".json") or filename == "README.md" or filename == "context-PRJ009.md"):
                 if filename == "pnpm-lock.yaml": continue
                 write_file_content(outfile, filename)

        # 2. Add Priority Directories
        for directory in PRIORITY_DIRS:
             if not os.path.exists(directory): continue
             
             for root, dirs, files in os.walk(directory):
                # Modify dirs in-place to skip excluded
                dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]
                
                for file in files:
                    if file in EXCLUDED_FILES: continue
                    ext = os.path.splitext(file)[1]
                    
                    # Logic: 
                    # - Include ALL .md / .txt files in docs-specs
                    # - Include package.json everywhere
                    # - Include .ts/.tsx in apps/packages but SKIP overly large files or generated ones if possible
                    
                    path = os.path.join(root, file)
                    
                    should_include = False
                    if ext == ".md" or ext == ".txt":
                        should_include = True
                    elif file == "package.json" or file == "tsconfig.json":
                        should_include = True
                    elif "src" in path and (ext == ".ts" or ext == ".tsx" or ext == ".py"):
                         # Basic filter to avoid test files if needed, but keeping for now
                         should_include = True
                    
                    if should_include and is_text_file(path):
                        write_file_content(outfile, path)

def write_file_content(outfile, path):
    print(f"Adding: {path}")
    outfile.write(f"## File: {path}\n")
    outfile.write("```\n")
    try:
        with open(path, "r", encoding="utf-8", errors='ignore') as infile:
            outfile.write(infile.read())
    except Exception as e:
        outfile.write(f"Error reading file: {e}")
    outfile.write("\n```\n\n")

if __name__ == "__main__":
    generate_context()
