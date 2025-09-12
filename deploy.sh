#!/bin/bash
echo "📦 Preparant deployment..."

# Verificacions pre-deployment
echo "🔍 Verificant estat del repositori..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️ Repositori té canvis sense cometre:"
    git status --short
    read -p "Continuar amb deployment? (y/N): " confirm
    if [[ $confirm != [yY] ]]; then
        echo "❌ Deployment cancel·lat"
        exit 1
    fi
fi

echo "🧪 Executant tests..."
npm test || { echo "❌ Tests fallen"; exit 1; }

echo "🔧 Verificant configuració ESLint..."
if [ -f "client/.eslintrc.json" ]; then
    echo "✅ ESLint configurat"
else
    echo "⚠️ ESLint no configurat correctament"
fi

echo "🏗️ Construint frontend per producció..."
cd client && npm run build || { echo "❌ Build frontend fallit"; exit 1; }
cd ..

echo "📊 Verificant backend..."
if [ -f "server.js" ]; then
    echo "✅ Backend preparat"
else
    echo "❌ server.js no trobat"
    exit 1
fi

echo "📋 Generant resum deployment..."
echo "================== DEPLOYMENT SUMMARY =================="
echo "📅 Data: $(date)"
echo "🏷️ Versió actual: $(git describe --tags --abbrev=0 2>/dev/null || echo "No tags")"
echo "📝 Últim commit: $(git log --oneline -1)"
echo "🧪 Tests: ✅ Passats"
echo "🏗️ Build: ✅ Completat"
echo "========================================================"

echo ""
echo "✅ Sistema validat per deployment"
echo "🚀 Llest per pujar a producció"
echo ""
echo "📋 Següents passos recomanats:"
echo "1. git tag -a v1.x.x -m 'Release description'"
echo "2. git push origin main --tags"
echo "3. Executar deployment al servidor"
