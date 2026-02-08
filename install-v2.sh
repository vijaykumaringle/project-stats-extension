#!/bin/bash

echo "🔥 Enhanced Project Stats Analyzer v2.0.0 - Installation Script"
echo "================================================================="

# Check if VS Code is installed
if ! command -v code &> /dev/null; then
    echo "❌ Visual Studio Code not found!"
    echo "Please install VS Code first: https://code.visualstudio.com/"
    exit 1
fi

echo "✅ VS Code found at: $(which code)"

# Get the path to the VSIX file
VSIX_FILE="${BASH_SOURCE%/*}/project-stats-analyzer-2.0.0.vsix"

if [ ! -f "$VSIX_FILE" ]; then
    echo "❌ VSIX file not found: $VSIX_FILE"
    echo "Make sure you're running this script from the extension directory."
    exit 1
fi

echo "📦 Installing Enhanced Extension v2.0.0..."
echo "🚀 New Features Include:"
echo "  📦 Dependency Analysis (NPM, Python, Rust)"
echo "  🕒 Time-Based Project Insights"  
echo "  🔒 Security Vulnerability Scanning"
echo "  ⚡ Performance Hotspot Detection"
echo "  🧪 Test Coverage Analysis"
echo ""

# Install the extension
code --install-extension "$VSIX_FILE" --force

if [ $? -eq 0 ]; then
    echo "✅ Enhanced extension installed successfully!"
    echo ""
    echo "🎊 What's New in v2.0.0:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📊 Project Overview: Files, lines, structure"
    echo "📦 Dependencies: Package health & vulnerability"  
    echo "⏰ Development Speed: Productivity insights"
    echo "🔒 Security Scan: Vulnerability detection"
    echo "⚡ Performance: Code complexity & optimization"
    echo "🧪 Test Coverage: Quality assurance metrics"
    echo "🎯 Smart Recommendations: Actionable improvements"
    echo ""
    echo "🚀 Quick Start Guide:"
    echo "1. Open or create any project in VS Code"
    echo "2. Press Ctrl+Shift+P (Cmd+Shift+P on Mac)"
    echo "3. Type 'Analyze Project Statistics'"
    echo "4. Press Enter and wait for comprehensive analysis"
    echo "5. Check 'Project Statistics' Output Channel for results"
    echo ""
    echo "📈 The analysis now provides:"
    echo "• Risk levels (🟢 Low 🟡 Medium 🔴 High)"
    echo "• Optimization scores (1-10 rating)"
    echo "• Development velocity (Low/Medium/High)"
    echo "• Test coverage percentages"
    echo "• Dependency health metrics"
    echo "• Security vulnerability alerts"
    echo ""
    echo "📖 Full feature documentation in:"
    echo "   - README.md (Basic guide)"
    echo "   - CHANGELOG-v2.0.md (Complete changes)"
    echo "   - FEATURES-ROADMAP.md (Future plans)"
else
    echo "❌ Installation failed. Please try manually:"
    echo "Run: code --install-extension project-stats-analyzer-2.0.0.vsix --force"
    exit 1
fi