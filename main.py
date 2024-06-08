import json
import subprocess

def get_commit_sha():
    result = subprocess.run(["git", "rev-parse", "HEAD"], capture_output=True, text=True)
    return result.stdout.strip()

def get_git_ref():
    result = subprocess.run(["git", "rev-parse", "--abbrev-ref", "HEAD"], capture_output=True, text=True)
    return result.stdout.strip()

def get_submodules():
    result = subprocess.run(["git", "submodule", "status", "--recursive"], capture_output=True, text=True)
    submodules = []
    for line in result.stdout.strip().split('\n'):
        parts = line.split()
        submodule = {
            "ref": parts[1]
        }
        submodules.append(submodule)
    return submodules

def generate_dependency_graph():
    commit_sha = get_commit_sha()
    git_ref = get_git_ref()
    submodules = get_submodules()
    
    dependency_graph = {
        "version": 1,
        "sha": commit_sha,
        "ref": f"refs/heads/{git_ref}",
        "job": "unique-job-id",  # Replace with your job identifier
        "detector": {
            "name": "CustomTool",
            "version": "1.0.0",
            "url": "http://example.com/tool-docs"
        },
        "dependencies": submodules
    }
    
    return dependency_graph

if __name__ == "__main__":
    dependency_graph = generate_dependency_graph()
    print(json.dumps(dependency_graph, indent=2))
