import * as fs from 'fs';
import { execSync } from 'child_process';

interface Detector {
  name: string;
  version: string;
  url: string;
}

interface Dependency {
  ref: string;
  metadata?: Record<string, any>;
}

interface DependencyGraph {
  version: number;
  sha: string;
  ref: string;
  job: string;
  detector: Detector;
  dependencies: Dependency[];
  metadata?: Record<string, any>;
}

function getCommitSha(): string {
  return execSync('git rev-parse HEAD').toString().trim();
}

function getGitRef(): string {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}

function getSubmodules(): Dependency[] {
  const result = execSync('git submodule status --recursive').toString().trim();
  const submodules = result.split('\n').map(line => {
    const parts = line.split(/\s+/);
    return {
      ref: parts[1]
    };
  });
  return submodules;
}

function generateDependencyGraph(): DependencyGraph {
  const commitSha = getCommitSha();
  const gitRef = getGitRef();
  const submodules = getSubmodules();

  const dependencyGraph: DependencyGraph = {
    version: 1,
    sha: commitSha,
    ref: `refs/heads/${gitRef}`,
    job: 'unique-job-id',  // Replace with your job identifier
    detector: {
      name: 'CustomTool',
      version: '1.0.0',
      url: 'http://example.com/tool-docs'
    },
    dependencies: submodules
  };

  return dependencyGraph;
}

function main() {
  const dependencyGraph = generateDependencyGraph();
  const jsonContent = JSON.stringify(dependencyGraph, null, 2);

  // Output to a file
  fs.writeFileSync('dependency-graph.json', jsonContent);

  // Also print to the console
  console.log(jsonContent);
}

main();
