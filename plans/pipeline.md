# ML Engine Integration Pipeline Plan

## Overview
This plan outlines the steps to integrate the Python-based machine learning risk scoring engine (`python-ml-engine`) into the application's build and release pipelines. The goal is to ensure that the standalone Python binary is automatically built for each target platform and bundled with the Electron application.

## 1. Local Configuration Changes

### Electron Forge Configuration (`forge.config.ts`)
Update `packagerConfig` to include the `ml_engine` directory as an extra resource. This directory will contain the platform-specific binary (e.g., `ml_engine` for macOS/Linux, `ml_engine.exe` for Windows).

```typescript
packagerConfig: {
    asar: true,
    extraResource: [
        'db.sqlite',
        'ml_engine' // This directory will be created during the build process
    ],
}
```

### Git Configuration (`.gitignore`)
Add the `ml_engine/` directory to `.gitignore` to prevent the platform-specific binaries from being committed to the repository.

```
# ML Engine Binaries
ml_engine/
```

## 2. GitHub Workflows Integration

### Build Workflow (`.github/workflows/build.yml`)
Modify the build workflow to:
1.  Setup Python environment (already present).
2.  Install Python dependencies and PyInstaller.
3.  Run the build script in `python-ml-engine/`.
4.  Create the `ml_engine/` directory in the project root.
5.  Move the built binary from `python-ml-engine/dist/` to `ml_engine/`.
6.  Proceed with `npm run make`.

### Release Workflow (`.github/workflows/release.yml`)
Similar to the build workflow, the release workflow (currently targeting `windows-latest`) must build the Windows executable before running `npm run publish`.

## 3. Implementation Steps

### Step 1: Update `.gitignore`
Add `ml_engine/` to the root `.gitignore` file.

### Step 2: Update `forge.config.ts`
Modify the `extraResource` list in `forge.config.ts`.

### Step 3: Update GitHub Workflows
Update `build.yml`, `release_tag.yml`, and `release.yml` with the following steps to build the ML engine binary:

**For Windows (in `build.yml` and `release.yml`):**
```yaml
- name: Build ML Engine (Windows)
  run: |
    cd python-ml-engine
    pip install -r requirements.txt
    pip install pyinstaller
    ./build.sh
    cd ..
    mkdir ml_engine
    move python-ml-engine\dist\ml_engine.exe ml_engine\
```

**For Unix (in `build.yml` and `release_tag.yml`):**
```yaml
- name: Build ML Engine (Unix)
  run: |
    cd python-ml-engine
    pip install -r requirements.txt
    pip install pyinstaller
    chmod +x build.sh
    ./build.sh
    cd ..
    mkdir ml_engine
    mv python-ml-engine/dist/ml_engine ml_engine/
```

### Step 4: Verification (Release Workflow)
To start the release pipeline:
1.  Update `version` in `package.json` (e.g., `2.0.2`).
2.  Ensure `release_notes/v<version>.md` exists.
3.  Push a tag matching the version:
    ```bash
    git tag v2.0.2
    git push origin v2.0.2
    ```
4.  The `Release and Publish` workflow will create the GitHub release and publish Linux artifacts.
5.  The `Release` workflow will be triggered automatically to publish Windows artifacts.

