# Comandes Útils - Sistema de Gestió Escolar

## Desenvolupament diari
```bash
# Iniciar sistema complet
cd /Users/oskarpujol/Desktop/nodeapp
npm start &
cd client && npm run dev

# Crear nova funcionalitat
git new-feature nom-funcionalitat

# Finalitzar i integrar funcionalitat
git finish-feature nom-funcionalitat
```

## Verificació sistema
```bash
# Status complet del projecte
git project-status

# Verificar servidors
curl http://localhost:3000/api/health
curl http://localhost:5173
```

## Rollback segur
```bash
# Veure opcions de rollback
git safe-rollback

# Rollback recomanat (crea commit invers)
git revert HEAD
```

## Desplegament
```bash
# Crear nova versió
git tag -a v1.x.x -m "Descripció versió"
git push origin v1.x.x

# Backup abans de canvis importants
git checkout -b backup/pre-changes
git push -u origin backup/pre-changes
```

## Tests i Lint
```bash
# Executar tots els tests
npm test

# Executar ESLint
npm run lint

# Executar en mode watch per desenvolupament
npm run test:watch
```

## Base de dades
```bash
# Reset completa de la base de dades
node reset-passwords.js
node seed.js

# Executar migracions
node run-migrations.js

# Crear nous usuaris
node create-users.js
```

## Credencials de desenvolupament
```bash
# Usuaris de prova disponibles:
# admin@edutech.com / password123 (Admin Centre)
# coordinador@edutech.com / password123 (Coordinador)  
# monitor@edutech.com / password123 (Monitor)
# familia@edutech.com / password123 (Família)
# admin@gestioescolar.com / password123 (Super Admin)
```
