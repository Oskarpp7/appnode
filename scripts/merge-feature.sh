#!/bin/bash
# Merge feature branch a development

if [ -z "$1" ]; then
    echo "Usage: $0 <feature-branch-name>"
    echo "Example: $0 feature/family-dashboard"
    exit 1
fi

FEATURE_BRANCH="$1"

echo "🔄 Fent merge de $FEATURE_BRANCH a development"

# Anar a development i actualitzar
git checkout development
git pull origin development 2>/dev/null || echo "No remote development branch"

# Merge feature branch
git merge "$FEATURE_BRANCH" --no-ff -m "feat: merge $FEATURE_BRANCH to development"

# Push canvis
git push origin development

# Opcional: eliminar feature branch
read -p "Eliminar branch $FEATURE_BRANCH? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git branch -d "$FEATURE_BRANCH"
    git push origin --delete "$FEATURE_BRANCH" 2>/dev/null || echo "Branch només eliminada localment"
    echo "✅ Branch $FEATURE_BRANCH eliminada"
fi

echo "✅ Feature merged a development"
