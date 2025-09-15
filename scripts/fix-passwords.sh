#!/bin/bash
# Fix automàtic: actualitza el hash bcrypt de la contrasenya per tots els usuaris de prova

DB_PATH="database.sqlite"
PASSWORD="password123"

# 1. Assegura que bcrypt-cli està instal·lat
if ! command -v bcrypt-cli &> /dev/null; then
  npm i -g bcrypt-cli
fi

# 2. Actualitza el hash per cada usuari
for usuari in admin@gestioescolar.com admin@edutech.com familia@edutech.com coordinador@edutech.com monitor@edutech.com; do
  hash=$(bcrypt-cli "$PASSWORD")
  sqlite3 "$DB_PATH" "UPDATE users SET password='$hash' WHERE email='$usuari';"
  echo "Contrasenya actualitzada per $usuari"
done

# 3. Torna a provar logins automàticament
TENANT_SLUG="escola-demo"
for usuario in admin@gestioescolar.com admin@edutech.com familia@edutech.com coordinador@edutech.com monitor@edutech.com; do
  echo "Test: $usuario"
  response=$(curl -s --max-time 10 -X POST http://localhost:3000/api/auth/login \
    -H 'Content-Type: application/json' \
    -d "{\"email\":\"$usuario\",\"password\":\"$PASSWORD\",\"tenant_slug\":\"$TENANT_SLUG\"}")
  if echo "$response" | grep -q 'token'; then
    echo "✅ LOGIN FUNCIONA!"
  else
    echo "❌ Encara falla"
    echo "Depurar: $response"
  fi
done
