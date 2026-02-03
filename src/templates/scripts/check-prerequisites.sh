#!/bin/bash

# Check prerequisites for creator-kit workflow
# Usage: ./check-prerequisites.sh [--json] [--require-tasks] [--include-tasks]

set -e

CONTENT_DIR=""
JSON_OUTPUT=false
REQUIRE_TASKS=false
INCLUDE_TASKS=false

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --json)
            JSON_OUTPUT=true
            shift
            ;;
        --require-tasks)
            REQUIRE_TASKS=true
            shift
            ;;
        --include-tasks)
            INCLUDE_TASKS=true
            shift
            ;;
        *)
            CONTENT_DIR="$1"
            shift
            ;;
    esac
done

# Find content directory
if [ -z "$CONTENT_DIR" ]; then
    # Look for most recent content directory
    if [ -d "content" ]; then
        CONTENT_DIR=$(ls -td content/*/ 2>/dev/null | head -1)
    fi
fi

# Check for required files
AVAILABLE_DOCS=()

check_file() {
    local file="$1"
    local name="$2"
    if [ -f "$CONTENT_DIR/$file" ]; then
        AVAILABLE_DOCS+=("$name")
        return 0
    fi
    return 1
}

check_dir() {
    local dir="$1"
    local name="$2"
    if [ -d "$CONTENT_DIR/$dir" ]; then
        AVAILABLE_DOCS+=("$name")
        return 0
    fi
    return 1
}

# Check for documentation files
check_file "brief.md" "brief.md"
check_file "outline.md" "outline.md"
check_file "tasks.md" "tasks.md"
check_file "research.md" "research.md"
check_file "data-model.md" "data-model.md"
check_dir "contracts" "contracts/"
check_file "quickstart.md" "quickstart.md"

# Check if tasks is required
if [ "$REQUIRE_TASKS" = true ]; then
    if ! check_file "tasks.md" ""; then
        if [ "$JSON_OUTPUT" = true ]; then
            echo '{"error": "tasks.md not found", "CONTENT_DIR": "'"$CONTENT_DIR"'"}'
        else
            echo "Error: tasks.md not found in $CONTENT_DIR"
        fi
        exit 1
    fi
fi

# Output results
if [ "$JSON_OUTPUT" = true ]; then
    DOCS_JSON=$(printf '%s\n' "${AVAILABLE_DOCS[@]}" | jq -R . | jq -s .)
    echo "{\"CONTENT_DIR\":\"$CONTENT_DIR\",\"AVAILABLE_DOCS\":$DOCS_JSON}"
else
    echo "Content Directory: $CONTENT_DIR"
    echo "Available Documentation:"
    for doc in "${AVAILABLE_DOCS[@]}"; do
        echo "  - $doc"
    done
fi
