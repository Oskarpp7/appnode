
#!/bin/bash
# Script de comprovació de login per a tots els usuaris

if ! curl -s --max-time 5 http://localhost:3000/health | grep -q 'success":true"\|Connected'; then
  echo "❌ El backend no està actiu. Comprova que el servidor funciona a http://localhost:3000."
  exit 1
fi

for usuario in admin@edutech.com familia@edutech.com coordinador@edutech.com monitor@edutech.com admin@gestioescolar.com; do
  echo "Test: $usuario"
  response=$(curl -s --max-time 10 -X POST http://localhost:3000/api/auth/login \
    -H 'Content-Type: application/json' \
    -d '{"email":"'$usuario'","password":"password123","tenant_slug":"demo"}')
  if echo "$response" | grep -q 'token'; then
    echo "✅ LOGIN FUNCIONA!"
  else
    echo "❌ Encara falla"
    echo "Depurar: $response"
  fi
done
