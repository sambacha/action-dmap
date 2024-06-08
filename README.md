## GitHub Dependency Submission Documentation:

#### Endpoint Details:

1. **API Endpoint**: `/repos/{owner}/{repo}/dependency-graph/snapshots`
    - **Method**: POST
    - **Headers**:
        - `accept: application/vnd.github.v4+json`
        - `authorization: token <YOUR-TOKEN>`

#### Payload Structure:

The JSON payload to be submitted should conform to the following structure:

- **version**: An integer indicating the version of the snapshot format.
- **sha**: A string representing the commit SHA for which the snapshot applies.
- **ref**: A string representing the Git reference (e.g., refs/heads/main).
- **job**: A string uniquely identifying the job run.
- **detector**: An object containing details about the tool used to detect the dependencies:
    - **name**: The name of the tool.
    - **version**: The version of the tool.
    - **url**: The URL of the tool's documentation.
- **metadata** (optional): Additional information about the environment, job, scanner, and scan ID.
- **dependencies**: An array of objects representing dependencies, each containing:
    - **ref**: A string representing the reference to the dependency.
    - **metadata** (optional): Additional metadata about the dependency.

### JSON Format Specification (from the provided file `format.json`):

- Required properties: `version`, `sha`, `ref`, `job`, `detector`, and `dependencies`.
- `detector` object must contain `name`, `version`, and `url`.