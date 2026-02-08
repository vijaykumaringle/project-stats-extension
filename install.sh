#!/bin/bash

echo "🔧 Project Stats Analyzer Extension Installation Script"
echo "======================================================"

# Check if VS Code is installed
if ! command -v code &> /dev/null; then
    echo "❌ Visual Studio Code not found!"
    echo "Please install VS Code first: https://code.visualstudio.com/"
    exit 1
fi

echo "✅ VS Code found at: $(which code)"

# Get the path to the VSIX file
VSIX_FILE="${BASH_SOURCE%/*}/project-stats-analyzer-1.0.0.vsix"

if [ ! -f "$VSIX_FILE" ]; then
    echo "❌ VSIX file not found: $VSIX_FILE"
    echo "Make sure you're running this script from the extension directory."
    exit 1
fi

echo "📦 Installing extension from: $VSIX_FILE"

# Install the extension
code --install-extension "$VSIX_FILE" --force

if [ $? -eq 0 ]; then
    echo "✅ Extension installed successfully!"
    echo ""
    echo "🚀 To use the extension:"
    echo "1. Open or create a new VS Code workspace"
    echo "2. Press Ctrl+Shift+P (Cmd+Shift+P on Mac)"
    echo "3. Search for 'Analyze Project Statistics'"
    echo "4. Press Enter to run the analysis"
    echo ""
    echo "📊 The extension will show detailed project statistics in the Output panel!"
else
    echo "❌ Installation failed. Please try manually installing the VSIX file."
    echo "Run: code --install-extension project-stats-analyzer-1.0.0.vsix"
    exit 1
fi