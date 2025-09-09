#!/bin/bash
# Backup ràpid de treball actual

BACKUP_BRANCH="backup/$(date +%Y%m%d_%H%M%S)"

echo "🔄 Creant backup branch: $BACKUP_BRANCH"

# Fer commit dels canvis actuals (fins i tot unstaged)
git add .
git commit -m "chore(backup): backup automàtic $(date)"

# Crear branch backup
git checkout -b "$BACKUP_BRANCH"
git push -u origin "$BACKUP_BRANCH" 2>/dev/null || echo "⚠️  Backup local creat (sense push)"

# Tornar a branch anterior
git checkout -

echo "✅ Backup creat: $BACKUP_BRANCH"
echo "📍 Per recuperar: git checkout $BACKUP_BRANCH"
