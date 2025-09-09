#!/bin/bash
# Crear release des de development

if [ -z "$1" ]; then
    echo "Usage: $0 <version>"
    echo "Example: $0 1.0.0"
    exit 1
fi

VERSION="$1"
RELEASE_BRANCH="release/v$VERSION"

echo "🚀 Creant release v$VERSION"

# Anar a development actualitzat
git checkout development
git pull origin development 2>/dev/null || echo "No remote development branch"

# Crear release branch
git checkout -b "$RELEASE_BRANCH"

# Actualitzar version en package.json
npm version "$VERSION" --no-git-tag-version 2>/dev/null || echo "⚠️  package.json no trobat"

# Actualitzar version en client/package.json si existeix
if [ -f "client/package.json" ]; then
    cd client
    npm version "$VERSION" --no-git-tag-version
    cd ..
fi

# Commit canvi version
git add package.json client/package.json 2>/dev/null || git add package.json
git commit -m "chore(release): bump version to $VERSION"

# Push release branch
git push -u origin "$RELEASE_BRANCH"

echo "✅ Release branch $RELEASE_BRANCH creada"
echo "🔄 Següents passos:"
echo "   1. Revisar i testejar release"
echo "   2. Merge a main: git checkout main && git merge $RELEASE_BRANCH"
echo "   3. Crear tag: git tag v$VERSION && git push origin v$VERSION"
echo "   4. Merge de volta a development"
