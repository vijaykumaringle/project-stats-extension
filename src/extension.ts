import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Project Stats Analyzer is now active');

    // Register command
    let disposable = vscode.commands.registerCommand('projectStats.analyzeProject', () => {
        analyzeProject();
    });

    context.subscriptions.push(disposable);

    // Analyze on startup (with delay to ensure workspace is loaded)
    setTimeout(() => {
        analyzeProject();
    }, 1000);
}

async function analyzeProject() {
    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showWarningMessage('No workspace folder is open');
        return;
    }

    const workspaceFolder = vscode.workspace.workspaceFolders[0];
    const rootPath = workspaceFolder.uri.fsPath;

    vscode.window.showInformationMessage('Analyzing project...');

    try {
        const stats = await calculateProjectStats(rootPath);
        displayStats(stats, workspaceFolder.name);
    } catch (error) {
        vscode.window.showErrorMessage(`Error analyzing project: ${error}`);
    }
}

interface ProjectStats {
    totalFiles: number;
    totalLines: number;
    codeLines: number;
    commentLines: number;
    blankLines: number;
    functions: number;
    classes: number;
    extensions: { [key: string]: number };
    largestFiles: Array<{ path: string; lines: number }>;
}

async function calculateProjectStats(rootPath: string): Promise<ProjectStats> {
    const stats: ProjectStats = {
        totalFiles: 0,
        totalLines: 0,
        codeLines: 0,
        commentLines: 0,
        blankLines: 0,
        functions: 0,
        classes: 0,
        extensions: {},
        largestFiles: []
    };

    const files = await vscode.workspace.findFiles('**/*', '**/node_modules/**', 10000);
    
    for (const file of files) {
        try {
            const fileStats = await analyzeFile(file.fsPath);
            
            stats.totalFiles++;
            stats.totalLines += fileStats.totalLines;
            stats.codeLines += fileStats.codeLines;
            stats.commentLines += fileStats.commentLines;
            stats.blankLines += fileStats.blankLines;
            stats.functions += fileStats.functions;
            stats.classes += fileStats.classes;
            
            const ext = file.fsPath.split('.').pop()?.toLowerCase() || 'none';
            stats.extensions[ext] = (stats.extensions[ext] || 0) + 1;
            
            stats.largestFiles.push({
                path: file.fsPath.replace(rootPath, ''),
                lines: fileStats.totalLines
            });
            
        } catch (error) {
            console.log(`Error analyzing file ${file.fsPath}:`, error);
        }
    }

    // Sort and limit largest files
    stats.largestFiles.sort((a, b) => b.lines - a.lines);
    stats.largestFiles = stats.largestFiles.slice(0, 10);

    return stats;
}

interface FileStats {
    totalLines: number;
    codeLines: number;
    commentLines: number;
    blankLines: number;
    functions: number;
    classes: number;
}

async function analyzeFile(filePath: string): Promise<FileStats> {
    try {
        const fs = await import('fs');
        const content = fs.readFileSync(filePath, 'utf8');
        
        const lines = content.split('\n');
        const stats: FileStats = {
            totalLines: lines.length,
            codeLines: 0,
            commentLines: 0,
            blankLines: 0,
            functions: 0,
            classes: 0
        };

        let inBlockComment = false;
        const ext = filePath.split('.').pop()?.toLowerCase() || '';
        
        for (const line of lines) {
            const trimmed = line.trim();
            
            if (trimmed === '') {
                stats.blankLines++;
                continue;
            }

            // Count code lines
            stats.codeLines++;
            
            // Count comments
            if (ext === 'js' || ext === 'ts' || ext === 'jsx' || ext === 'tsx') {
                if (trimmed.startsWith('//')) {
                    stats.commentLines++;
                }
                if (trimmed.startsWith('/*')) {
                    inBlockComment = true;
                    stats.commentLines++;
                }
                if (inBlockComment && trimmed.endsWith('*/')) {
                    inBlockComment = false;
                }
            } else if (ext === 'py') {
                if (trimmed.startsWith('#')) {
                    stats.commentLines++;
                }
            } else if (ext === 'java' || ext === 'c' || ext === 'cpp' || ext === 'cs') {
                if (trimmed.startsWith('//')) {
                    stats.commentLines++;
                }
                if (trimmed.includes('/*') && trimmed.includes('*/')) {
                    stats.commentLines++;
                }
                if (trimmed.startsWith('/*')) {
                    inBlockComment = true;
                }
                if (inBlockComment && trimmed.includes('*/')) {
                    inBlockComment = false;
                }
            }

            // Count functions and classes (simple patterns)
            if (ext === 'js' || ext === 'ts' || ext === 'jsx' || ext === 'tsx') {
                const isFunction = trimmed.startsWith('function ') || 
                                  trimmed.includes('=>') || 
                                  trimmed.includes('const ') && trimmed.includes('=');
                const isClass = trimmed.startsWith('class ');
                if (isFunction) {
                    stats.functions++;
                }
                if (isClass) {
                    stats.classes++;
                }
            } else if (ext === 'py') {
                const isFunction = trimmed.startsWith('def ') && trimmed.includes('(');
                const isClass = trimmed.startsWith('class ') && trimmed.includes(':');
                if (isFunction) {
                    stats.functions++;
                }
                if (isClass) {
                    stats.classes++;
                }
            } else if (ext === 'java' || ext === 'cpp' || ext === 'c' || ext === 'cs') {
                const isFunction = (trimmed.includes('(') && trimmed.includes(')') && 
                                  (trimmed.includes('{') || trimmed.startsWith('public ') || trimmed.startsWith('private ')));
                const isClass = trimmed.startsWith('class ');
                if (isFunction) {
                    stats.functions++;
                }
                if (isClass) {
                    stats.classes++;
                }
            }
        }

        return stats;
    } catch (error) {
        return {
            totalLines: 0,
            codeLines: 0,
            commentLines: 0,
            blankLines: 0,
            functions: 0,
            classes: 0
        };
    }
}

function displayStats(stats: ProjectStats, projectName: string) {
    const output = vscode.window.createOutputChannel('Project Statistics');
    
    const report = `
📊 PROJECT STATISTICS REPORT
==================================

Project: ${projectName}
Analysis Date: ${new Date().toLocaleString()}

📁 OVERVIEW
-----------
Total Files: ${stats.totalFiles.toLocaleString()}
Total Lines: ${stats.totalLines.toLocaleString()}
Code Lines: ${stats.codeLines.toLocaleString()}
Comment Lines: ${stats.commentLines.toLocaleString()}
Blank Lines: ${stats.blankLines.toLocaleString()}

🔧 CODE STRUCTURE
-----------------
Total Functions: ${stats.functions.toLocaleString()}
Total Classes: ${stats.classes.toLocaleString()}

📈 FILE TYPE DISTRIBUTION
-------------------------
${Object.entries(stats.extensions)
    .sort(([,a], [,b]) => b - a)
    .map(([ext, count]) => `${ext.padEnd(10)}: ${count.toString().padStart(4)} files`)
    .join('\n')}

📄 TOP 10 LARGEST FILES
----------------------
${stats.largestFiles.map((file, index) => 
    `${(index + 1).toString().padStart(2)}. ${file.path.padEnd(30)} ${file.lines.toString().padStart(6)} lines`
).join('\n')}

🎯 PROJECT HEALTH METRICS
------------------------
Comments-to-Code Ratio: ${stats.codeLines > 0 ? ((stats.commentLines / stats.codeLines) * 100).toFixed(1) : 0}%
Average Lines per File: ${stats.totalFiles > 0 ? (stats.totalLines / stats.totalFiles).toFixed(1) : 0}

==================================
Analysis complete!
`;

    output.appendLine(report);
    output.show();

    // Show quick summary in status bar
    vscode.window.setStatusBarMessage(`📊 ${stats.totalFiles} files, ${stats.totalLines.toLocaleString()} lines analyzed`, 10000);
}