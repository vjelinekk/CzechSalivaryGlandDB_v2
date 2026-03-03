# Creating a New Release

This document describes the manual steps required to trigger the automated release pipeline for CSGDB.

## Prerequisites

1.  **Code is Ready:** Ensure all changes are committed and pushed to the `main` branch (or your feature branch if you are testing).
2.  **ML Engine:** Ensure the `python-ml-engine/` code is stable. The pipeline will automatically build the standalone binaries.

## Step-by-Step Release Process

### 1. Update the Application Version
Update the `version` field in the root `package.json` file.
- Example: If the current version is `2.0.1`, change it to `2.0.2`.

### 2. Prepare Release Notes
Create a new Markdown file in the `release_notes/` directory. The filename must match the version exactly (with a leading `v`).
- Example: `release_notes/v2.0.2.md`
- Content: Describe the new features, bug fixes, and changes in this version.

### 3. Commit the Changes
Commit the updated `package.json` and the new release notes file.
```bash
git add package.json release_notes/v2.0.2.md
git commit -m "chore: bump version to 2.0.2"
git push origin <your-branch>
```

### 4. Create and Push a Git Tag
Create a new tag that matches the version number and push it to GitHub. This is the trigger for the automated release pipeline.
```bash
git tag v2.0.2
git push origin v2.0.2
```

## What Happens Next? (Automated Workflows)

Once the tag is pushed, two GitHub Actions are triggered:

1.  **Release and Publish (`release_tag.yml`):**
    - Triggered by: The new tag `v*`.
    - Action: Creates a GitHub Release, uploads the release notes, builds the Linux/Unix ML engine, and publishes the Linux artifacts (deb, rpm).
2.  **Release (`release.yml`):**
    - Triggered by: The creation of the GitHub Release by the first workflow.
    - Action: Builds the Windows ML engine and publishes the Windows artifacts (exe, zip).

## Troubleshooting

### Release Fails Due to Missing Release Notes
If the pipeline fails with `❌ Release notes not found`, ensure that the filename in `release_notes/` matches the tag name exactly (e.g., tag `v2.0.2` requires `release_notes/v2.0.2.md`).

### Deleting a Failed Release
If you accidentally tag the wrong version or the build fails and you want to start over:
1.  **On GitHub:** Go to the "Releases" page, delete the release, and then delete the associated tag in the "Tags" tab.
2.  **Locally:**
    ```bash
    git tag -d v2.0.2
    git push --delete origin v2.0.2
    ```
