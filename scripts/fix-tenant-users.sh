#!/bin/bash
# Fix automàtic: associar usuaris de prova al tenant 'escola-demo' i validar login

DB_PATH="database.sqlite"
TENANT_SLUG="escola-demo"

# 1. Troba l'id del tenant 'escola-demo'
TENANT_ID=$(sqlite3 "$DB_PATH" "SELECT id FROM tenants WHERE slug='$TENANT_SLUG' AND status='active' LIMIT 1;")

if [ -z "$TENANT_ID" ]; then
  echo "❌ No s'ha trobat el tenant '$TENANT_SLUG'."
  exit 1
fi

# 2. Actualitza cada usuari de prova per associar-lo al tenant correcte

for usuari in admin@gestioescolar.com admin@edutech.com familia@edutech.com coordinador@edutech.com monitor@edutech.com; do
  sqlite3 "$DB_PATH" "UPDATE users SET tenant_id='$TENANT_ID' WHERE email='$usuari';"
  echo "Usuari $usuari associat al tenant '$TENANT_SLUG' (id $TENANT_ID)"
done



for usuario in admin@gestioescolar.com admin@edutech.com familia@edutech.com coordinador@edutech.com monitor@edutech.com; do
  echo "Test: $usuario"
  response=$(curl -s --max-time 10 -X POST http://localhost:3000/api/auth/login \
    -H 'Content-Type: application/json' \
    -d '{"email":"'$usuario'","password":"password123","tenant_slug":"'$TENANT_SLUG'"}')
  if echo "$response" | grep -q 'token'; then
    echo "✅ LOGIN FUNCIONA!"
  else
    echo "❌ Encara falla"
    echo "Depurar: $response"
  fi
done
