#!/bin/bash
# Usage: ./scripts/new-feature.sh feature-name

if [ -z "$1" ]; then
    echo "Usage: $0 <feature-name>"
    echo "Example: $0 family-dashboard"
    exit 1
fi

FEATURE_NAME="feature/$1"

# Assegurar que estem en development actualitzat
git checkout development 2>/dev/null || git checkout -b development
git pull origin development 2>/dev/null || echo "No remote development branch yet"

# Crear nova feature branch
git checkout -b "$FEATURE_NAME"

echo "✅ Feature branch '$FEATURE_NAME' creada"
echo "📝 Desenvolupar la funcionalitat i fer commits"
echo "🔄 Quan acabis: git push -u origin $FEATURE_NAME"
