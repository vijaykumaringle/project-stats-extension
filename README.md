# Project Stats Analyzer VS Code Extension

A powerful VS Code extension that analyzes project statistics and provides detailed insights into your codebase.

## Features

📊 **Comprehensive Project Analysis**
- **File Count**: Total number of files in your project
- **Line Count**: Total, code, comment, and blank lines
- **Code Structure**: Number of functions and classes
- **File Distribution**: Breakdown by file extension
- **Largest Files**: Top 10 largest files by line count
- **Health Metrics**: Comments-to-code ratio and efficiency metrics

🎯 **Smart Detection**
- Supports multiple programming languages (JavaScript, TypeScript, Python, Java, C++, C#, etc.)
- Intelligent comment detection for each language
- Function and class recognition patterns
- Automatic workspace scanning

📈 **Visual Output**
- Clean, formatted output channel with detailed reports
- Status bar notifications for quick feedback
- Command palette integration

## Installation

### From Source (Development)
1. Clone this repository
2. Open in VS Code
3. Run `npm install` in the terminal
4. Press `F5` to launch extension in development mode

### Package and Install
```bash
npm install -g @vscode/vsce
vsce package
code --install-extension project-stats-analyzer-1.0.0.vsix
```

## Usage

### Quick Analysis
- **Command Palette**: `Ctrl+Shift+P` → "Project Stats Analyzer"
- **Status**: Automatically runs on startup after a short delay

### Manual Activation
1. Open your project in VS Code
2. Use `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. Search for "Analyze Project Statistics"
4. Press Enter

### Output Location
Check the **Output Channel** called "Project Statistics" for detailed results.

Sample Output:
```
📊 PROJECT STATISTICS REPORT
==================================

Project: my-awesome-project
Analysis Date: 2/8/2026, 2:47 PM

📁 OVERVIEW
-----------
Total Files: 245
Total Lines: 15,847
Code Lines: 12,456
Comment Lines: 2,134
Blank Lines: 1,257

🔧 CODE STRUCTURE
-----------------
Total Functions: 1,423
Total Classes: 89

📈 FILE TYPE DISTRIBUTION
-------------------------
ts       :   156 files
js       :    67 files
css      :    22 files
```

## Development

### Project Structure
```
project-stats-extension/
├── src/
│   └── extension.ts          # Main extension code
├── .vscode/
│   ├── launch.json          # Debug configuration
│   └── tasks.json           # Build tasks
├── package.json             # Extension manifest
├── tsconfig.json            # TypeScript configuration
└── README.md               # This file
```

### Available Scripts
```bash
npm run compile            # Build TypeScript
npm run watch             # Watch and rebuild
npm test                  # Run tests
vsce package              # Create VSIX package
```

### Adding New Features

#### 1. Support New Language
Edit `analyzeFile()` function in `src/extension.ts`:
```typescript
// Add new language patterns
} else if (ext === 'your-lang') {
    if (trimmed.match(/your-function-pattern/)) {
        stats.functions++;
    }
}
```

#### 2. Add New Metrics
Modify the `ProjectStats` interface and calculation logic:
```typescript
interface ProjectStats {
    // ... existing fields
    interfaces: number;  // New metric
}
```

#### 3. Custom Output Format
Update `displayStats()` function to include new information or change formatting.

## Supported Languages

- **Web Development**: JavaScript, TypeScript, JSX, TSX, CSS, HTML
- **Backend**: Python, Java, C++, C#, Go, Rust
- **Scripts**: Shell scripts, PowerShell
- **Data**: JSON, YAML, XML (basic line counting)

## License

MIT License - feel free to modify and distribute!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request
4. Follow the existing code style

## Tips for Usage

💡 **Best Practices**
- Close large binary files (images, videos) before analysis
- Use `.gitignore` patterns to exclude unwanted directories
- Run analysis after major code changes to track growth

🔍 **Troubleshooting**
- If no workspace is open, extension won't run
- Large projects may take longer to analyze
- Check Output Channel for detailed error messages

---

**Happy Coding! 🚀**# project-stats-extension
