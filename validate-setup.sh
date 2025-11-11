#!/bin/bash

# Setup Validation Script for AK Soles TypeScript Migration

echo "🔍 AK Soles TypeScript Migration Validator"
echo "=========================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Function to print success
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

# Function to print error
print_error() {
    echo -e "${RED}✗${NC} $1"
    ERRORS=$((ERRORS + 1))
}

# Function to print warning
print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
    WARNINGS=$((WARNINGS + 1))
}

echo "📋 Checking Project Structure..."
echo ""

# Check main configuration files
if [ -f "tsconfig.json" ]; then
    print_success "tsconfig.json found"
else
    print_error "tsconfig.json NOT found"
fi

if [ -f "package.json" ]; then
    print_success "package.json found"
else
    print_error "package.json NOT found"
fi

echo ""
echo "📁 Checking Source Files..."
echo ""

# Check TypeScript source files
if [ -f "src/types.ts" ]; then
    print_success "src/types.ts found"
else
    print_error "src/types.ts NOT found"
fi

if [ -f "src/responsive.ts" ]; then
    print_success "src/responsive.ts found"
else
    print_error "src/responsive.ts NOT found"
fi

if [ -f "src/script.ts" ]; then
    print_success "src/script.ts found"
else
    print_error "src/script.ts NOT found"
fi

if [ -f "src/slide.ts" ]; then
    print_success "src/slide.ts found"
else
    print_error "src/slide.ts NOT found"
fi

echo ""
echo "📚 Checking Documentation..."
echo ""

if [ -f "QUICKSTART.md" ]; then
    print_success "QUICKSTART.md found"
else
    print_error "QUICKSTART.md NOT found"
fi

if [ -f "TYPESCRIPT_MIGRATION.md" ]; then
    print_success "TYPESCRIPT_MIGRATION.md found"
else
    print_error "TYPESCRIPT_MIGRATION.md NOT found"
fi

if [ -f "MIGRATION_SUMMARY.md" ]; then
    print_success "MIGRATION_SUMMARY.md found"
else
    print_error "MIGRATION_SUMMARY.md NOT found"
fi

if [ -f "ARCHITECTURE.md" ]; then
    print_success "ARCHITECTURE.md found"
else
    print_error "ARCHITECTURE.md NOT found"
fi

echo ""
echo "🌐 Checking HTML Files..."
echo ""

# Check if HTML files reference dist files
check_html_file() {
    local file=$1
    if grep -q "dist/script.js" "$file"; then
        print_success "$file updated"
    else
        print_warning "$file might not be updated - check manually"
    fi
}

check_html_file "index.html" 2>/dev/null || print_warning "index.html not found"
check_html_file "cart.html" 2>/dev/null || print_warning "cart.html not found"
check_html_file "checkout.html" 2>/dev/null || print_warning "checkout.html not found"

echo ""
echo "💾 Checking Original Files..."
echo ""

if [ -f "script.js" ]; then
    print_warning "Original script.js still exists (can be deleted)"
else
    print_success "Original script.js removed/archived"
fi

if [ -f "slide.js" ]; then
    print_warning "Original slide.js still exists (can be deleted)"
else
    print_success "Original slide.js removed/archived"
fi

echo ""
echo "📦 Checking NPM Dependencies..."
echo ""

if [ -d "node_modules" ]; then
    print_success "node_modules directory exists"
    if [ -d "node_modules/typescript" ]; then
        print_success "TypeScript installed"
    else
        print_error "TypeScript NOT installed - run 'npm install'"
    fi
else
    print_warning "node_modules not found - run 'npm install'"
fi

echo ""
echo "🔨 Checking Build Output..."
echo ""

if [ -d "dist" ]; then
    print_success "dist/ directory found"

    if [ -f "dist/script.js" ]; then
        print_success "dist/script.js compiled"
    else
        print_error "dist/script.js NOT found - run 'npm run build'"
    fi

    if [ -f "dist/slide.js" ]; then
        print_success "dist/slide.js compiled"
    else
        print_error "dist/slide.js NOT found - run 'npm run build'"
    fi
else
    print_warning "dist/ directory NOT found - run 'npm run build'"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Validation Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Ready to go!${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Run: npm run build"
    echo "  2. Open any HTML file in your browser"
    echo "  3. Resize the window to test responsive design"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Setup mostly complete with warnings${NC}"
    echo ""
    echo "Errors: $ERRORS"
    echo "Warnings: $WARNINGS"
    echo ""
    echo "Next steps:"
    echo "  1. Address warnings above if needed"
    echo "  2. Run: npm install (if needed)"
    echo "  3. Run: npm run build"
    echo "  4. Test in browser"
    exit 0
else
    echo -e "${RED}❌ Setup incomplete - please fix errors above${NC}"
    echo ""
    echo "Errors: $ERRORS"
    echo "Warnings: $WARNINGS"
    echo ""
    echo "Fix checklist:"
    echo "  1. Ensure tsconfig.json exists"
    echo "  2. Ensure package.json exists"
    echo "  3. Ensure all src/*.ts files exist"
    echo "  4. Run: npm install"
    echo "  5. Run: npm run build"
    exit 1
fi
