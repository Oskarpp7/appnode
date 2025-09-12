#!/bin/bash
echo "🚀 Iniciant Sistema de Gestió Escolar..."

# Verificar Node.js i npm
node --version && npm --version || { echo "❌ Node.js no instal·lat"; exit 1; }

# Verificar que estem al directori correcte
if [ ! -f "package.json" ]; then
    echo "❌ No es troba package.json. Executa des del directori del projecte."
    exit 1
fi

# Iniciar backend
echo "🔧 Iniciant backend..."
npm start &
BACKEND_PID=$!
echo "📊 Backend iniciat amb PID: $BACKEND_PID"

# Esperar que el backend s'iniciï
sleep 3

# Iniciar frontend  
echo "🎨 Iniciant frontend..."
cd client && npm run dev &
FRONTEND_PID=$!
cd ..
echo "🎯 Frontend iniciat amb PID: $FRONTEND_PID"

# Esperar que els serveis s'iniciïn
sleep 5

echo ""
echo "✅ Sistema iniciat correctament:"
echo "📊 Backend: http://localhost:3000"
echo "🎯 Frontend: http://localhost:5173" 
echo "🔄 PIDs: Backend($BACKEND_PID), Frontend($FRONTEND_PID)"
echo ""
echo "⚠️  Per aturar el sistema:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "🎯 Credencials de prova:"
echo "   admin@edutech.com / password123"
echo "   coordinador@edutech.com / password123"
echo "   monitor@edutech.com / password123"
echo "   familia@edutech.com / password123"

# Guardar PIDs per cleanup posterior
echo "$BACKEND_PID" > .backend.pid
echo "$FRONTEND_PID" > .frontend.pid
