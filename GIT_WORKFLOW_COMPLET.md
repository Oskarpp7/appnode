# 🚀 Workflow Git Complet - Sistema de Gestió Escolar

## 📋 Configuració Inicial Completada

### ✅ Configuració Global
```bash
git config --global user.name "Oskar Pujol"
git config --global user.email "oskarpujol@gmail.com"
git config --global core.editor "code --wait"
git config --global push.default current
git config --global pull.rebase true
```

### ✅ Alias Personalitzats Configurats

#### 🌿 Gestió de Branques
```bash
# Crear nova feature branch
git new-feature nom-funcionalitat
# Equivalent a: checkout main + pull + checkout -b feature/nom-funcionalitat

# Finalitzar feature branch
git finish-feature nom-funcionalitat  
# Equivalent a: checkout main + merge --no-ff + branch -d
```

#### 🛡️ Rollback Segur
```bash
# Veure opcions de rollback amb historial
git safe-rollback
```

#### 📊 Estat del Projecte
```bash
# Vista completa de l'estat del projecte
git project-status
```

## 🎯 Workflow de Desenvolupament

### 1. Crear Nova Funcionalitat
```bash
git new-feature auth-improvements
# Automàticament et situa a feature/auth-improvements
```

### 2. Desenvolupar i Fer Commits
```bash
# Seguir Conventional Commits
git commit -m "feat(auth): implement password reset functionality"
git commit -m "fix(dashboard): resolve loading spinner issue"
git commit -m "docs(readme): update installation instructions"
```

### 3. Finalitzar Funcionalitat
```bash
git finish-feature auth-improvements
# Merge automàtic a main + eliminació de la branch
```

### 4. Crear Tags de Versió
```bash
git tag -a v1.1.0 -m "Release v1.1.0: Enhanced Authentication"
```

## 🛡️ Sistema de Rollback

### Opcions Disponibles (de més segur a més perillós):

#### 1. ✅ REVERT (RECOMANAT)
```bash
git revert HEAD
# Crea un nou commit que desfà els canvis
# Manté l'historial complet
```

#### 2. ⚠️ SOFT RESET
```bash
git reset --soft HEAD~1
# Desfà el commit però manté els fitxers modificats
# Els canvis queden staged
```

#### 3. 🚨 HARD RESET (PERILLOS)
```bash
git reset --hard HEAD~1
# Desfà el commit i elimina tots els canvis
# NO ES POT DESFER - Usar només si estàs segur
```

#### 4. 🔍 CHECKOUT A COMMIT ESPECÍFIC
```bash
git log --oneline -10  # Veure commits
git checkout abc1234   # Anar a commit específic
git checkout main      # Tornar a main
```

## 📦 Versions i Tags Actuals

### v1.0.0-dashboards
- ✅ Sistema complet de 5 dashboards role-specific
- ✅ Arquitectura estable sense dependències externes  
- ✅ UI/UX optimitzada per escoles de música
- ✅ Sistema d'autenticació robusc
- ✅ Production ready

## 🔄 Procediments de Recuperació

### Si Alguna Cosa Va Malament:

1. **Primer pas sempre:**
   ```bash
   git project-status
   git safe-rollback
   ```

2. **Per veure què ha passat:**
   ```bash
   git reflog  # Historial complet d'operacions
   git log --graph --oneline --all  # Vista gràfica
   ```

3. **Recuperar fitxers eliminats:**
   ```bash
   git checkout HEAD~1 -- fitxer.js  # Recuperar fitxer específic
   ```

4. **Emergència total:**
   ```bash
   git reflog  # Troba el commit abans del problema
   git reset --hard abc1234  # Torna a aquell punt
   ```

## 🚀 Desplegament a Producció

### 1. Verificacions Pre-Desplegament
```bash
npm run test        # Tests unitaris
npm run lint        # Validació ESLint
npm run build       # Compilació producció
git project-status  # Estat del repositori
```

### 2. Crear Release Tag
```bash
git tag -a v1.0.0 -m "Production Release v1.0.0"
git push origin v1.0.0
```

### 3. Deploy
```bash
# Segons el teu sistema de deploy
npm run deploy
# o
git push heroku main
```

## 📚 Convencions de Commits

### Format Estàndard:
```
type(scope): description

feat(auth): implement OAuth login
fix(dashboard): resolve responsive issues
docs(readme): update setup instructions
style(css): improve button styling
refactor(api): optimize database queries
test(unit): add user validation tests
chore(deps): update package dependencies
```

### Types Principals:
- `feat`: Nova funcionalitat
- `fix`: Correcció de bug
- `docs`: Documentació
- `style`: Canvis d'estil (no afecten lògica)
- `refactor`: Refactorització de codi
- `test`: Afegir o modificar tests
- `chore`: Tasques de manteniment

## 🎯 Bones Pràctiques

### ✅ Fer:
- Commits petits i específics
- Missatges de commit descriptius
- Usar branques per funcionalitats
- Fer merge amb --no-ff per mantenir historial
- Crear tags per versions estables
- Provar abans de fer merge a main

### ❌ Evitar:
- Commits massa grans
- Missatges poc descriptius ("fix stuff")
- Treballar directament a main
- Force push a branques compartides
- Eliminar historial sense backup

## 🆘 Contacte i Suport

Si tens problemes amb Git:
1. Consulta aquest document
2. Usa `git safe-rollback` per veure opcions
3. Revisa `git project-status` per context
4. En cas d'emergència, crea backup manual abans de fer canvis dràstics

---

**Última actualització:** $(date)
**Versió del workflow:** v1.0.0
**Projecte:** Sistema de Gestió Escolar NodeJS + Vue.js
