# 🚀 GIT WORKFLOW - SISTEMA GESTIÓ ESCOLAR

## 📋 BRANCHING STRATEGY

### Branques Principals
- **`main`** - Codi de producció estable
- **`development`** - Desenvolupament actiu i integració
- **`staging`** - Testing pre-producció
- **`feature/*`** - Noves funcionalitats
- **`hotfix/*`** - Correccions urgents producció
- **`backup/*`** - Backups automàtics

## 🔄 WORKFLOWS QUOTIDIANS

### Començar Nova Funcionalitat
```bash
# Crear nova feature branch
./scripts/new-feature.sh dashboard-familia

# Desenvolupar amb commits regulars
git add .
git commit -m "feat(dashboard): afegir card estudiants"

# Push quan ready
git push -u origin feature/dashboard-familia
```

### Merge Funcionalitat
```bash
# Merge a development
./scripts/merge-feature.sh feature/dashboard-familia
```

### Backup Ràpid
```bash
# Crear backup automàtic
./scripts/backup.sh
```

### Crear Release
```bash
# Crear release preparatòria
./scripts/create-release.sh 1.0.0

# Després de testing, merge a main
git checkout main
git merge release/v1.0.0
git tag v1.0.0
git push origin main --tags
```

## 📝 COMMIT MESSAGE CONVENTIONS

Format: `tipus(àmbit): descripció`

### Tipus disponibles:
- **feat**: Nova funcionalitat
- **fix**: Correcció bug
- **docs**: Documentació
- **style**: Formatació codi
- **refactor**: Refactoring
- **test**: Tests
- **chore**: Manteniment

### Exemples:
```
feat(auth): afegir login amb JWT
fix(dashboard): corregir càrrega dades família
docs(api): actualitzar documentació endpoints
chore(deps): actualitzar dependencies seguretat
```

## 🛠️ COMANDOS ÚTILS

### Estat i navegació
```bash
git st                    # Status
git lg                    # Log visual
git br                    # Branches
git co development        # Checkout branch
```

### Debug i recuperació
```bash
git log --oneline --grep="bug"    # Buscar bugs
git blame filename.js             # Responsable per línia
git reflog                        # Historial complet
git reset --soft HEAD~1          # Desfer últim commit
```

### Cleanup
```bash
git branch -d feature/completada  # Eliminar branch local
git push origin --delete feature/completada  # Eliminar branch remota
```

## 🔒 PRE-COMMIT VALIDACIONS

El hook pre-commit executa automàticament:
- ✅ Detecta console.log i debugger
- ✅ Executa ESLint si està configurat
- ✅ Executa tests si estan configurats

## 📁 ESTRUCTURA FITXERS GIT

```
.git/
├── hooks/
│   └── pre-commit          # Validacions automàtiques
├── config                  # Configuració local
.gitignore                  # Fitxers ignorats
.gitmessage                 # Template commits
scripts/
├── new-feature.sh          # Crear feature branch
├── merge-feature.sh        # Merge features
├── backup.sh               # Backup automàtic
└── create-release.sh       # Crear releases
```

## 🎯 MILLORS PRÀCTIQUES

### ✅ Fer sempre:
1. Commits petits i freqüents
2. Messages descriptius amb context
3. Treballar en feature branches
4. Pull abans de push
5. Tests abans de merge

### ❌ Evitar:
1. Commits directes a main
2. Force push a branques compartides
3. Commits amb codi trencat
4. Messages poc descriptius
5. Branques de llarga durada

## 🆘 RECUPERACIÓ D'EMERGÈNCIA

### Recuperar commit eliminat
```bash
git reflog
git checkout <commit-hash>
git checkout -b recovery-branch
```

### Desfer canvis no commitejats
```bash
git checkout -- filename.js    # Fitxer específic
git reset --hard HEAD          # Tots els canvis (PERILL!)
```

### Recuperar branch eliminada
```bash
git reflog show --all
git checkout -b recovered-branch <commit-hash>
```

---

## 📞 SUPORT

Per dubtes o problemes amb Git:
1. Consultar aquesta documentació
2. Utilitzar `git help <command>`
3. Revisar historial amb `git lg`
4. Crear backup abans de canvis grans

**Repository:** https://github.com/Oskarpp7/appnode.git
**Branques principals:** main, development, staging
