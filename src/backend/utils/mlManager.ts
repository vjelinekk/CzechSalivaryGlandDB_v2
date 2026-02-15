import { app } from 'electron';
import * as path from 'path';
import { spawn } from 'child_process';
import * as fs from 'fs';
import { MLInputData, MLOutputData } from '../types/ml';

/**
 * Get the directory where ML models are stored.
 * Creates the directory if it doesn't exist.
 */
export const getModelsDirectory = (): string => {
    const modelsDir = path.join(app.getPath('userData'), '.csgdb', 'models');
    if (!fs.existsSync(modelsDir)) {
        fs.mkdirSync(modelsDir, { recursive: true });
    }
    return modelsDir;
};

/**
 * Resolves the path to the Python ML engine.
 * In development, it points to the .py script.
 * In production, it points to the bundled executable.
 */
export const getPythonBinaryPath = (): string => {
    if (app.isPackaged) {
        // In production, the binary is expected to be in the resources/ml_engine folder
        // (added via extraResource in forge.config.ts)
        const base = app.getAppPath().replace(`${path.sep}app.asar`, '');
        const binaryName = process.platform === 'win32' ? 'ml_engine.exe' : 'ml_engine';
        return path.join(base, 'ml_engine', binaryName);
    } else {
        // In development, we use the python script directly from the project root
        return path.join(app.getAppPath(), 'python-ml-engine', 'ml_engine.py');
    }
};

/**
 * Executes the Python ML engine with the provided input data.
 * Communication is done via stdin (JSON) and stdout (JSON).
 */
export const executePythonML = async (inputData: MLInputData): Promise<MLOutputData> => {
    return new Promise((resolve, reject) => {
        const pythonPath = getPythonBinaryPath();
        let child;

        if (app.isPackaged) {
            // In production, we run the compiled binary
            child = spawn(pythonPath, []);
        } else {
            // In development, we run the script using python3
            // Note: On Windows development, this might need to be 'python' 
            const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
            child = spawn(pythonCmd, [pythonPath]);
        }

        let stdout = '';
        let stderr = '';

        child.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        child.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        child.on('close', (code) => {
            if (code !== 0 && !stdout) {
                reject(new Error(`ML Engine process exited with code ${code}. Stderr: ${stderr}`));
                return;
            }

            try {
                const output = JSON.parse(stdout) as MLOutputData;
                if (output.success) {
                    resolve(output);
                } else {
                    reject(new Error(output.error || 'Unknown ML engine error'));
                }
            } catch (e) {
                reject(new Error(`Failed to parse ML engine output: ${stdout.substring(0, 100)}... Error: ${e.message}`));
            }
        });

        child.on('error', (err) => {
            reject(new Error(`Failed to start ML engine: ${err.message}`));
        });

        // Write input to stdin as JSON
        child.stdin.write(JSON.stringify(inputData));
        child.stdin.end();
    });
};
