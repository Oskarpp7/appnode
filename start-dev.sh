#!/bin/bash

# Script per arrencar tots els servidors de desenvolupament de manera estable

echo "🚀 Arrencant Sistema de Gestió Escolar..."

# Colors per a la sortida
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funció per manejar la sortida
cleanup() {
    echo -e "\n${YELLOW}🛑 Aturant servidors...${NC}"
    kill $(jobs -p) 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

# Comprovar que estem al directori correcte
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Executar des del directori arrel del projecte${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Comprovant dependències...${NC}"

# Arrencar backend
echo -e "${GREEN}🟢 Arrencant Backend (Node.js)...${NC}"
npm start > logs/backend.log 2>&1 &
BACKEND_PID=$!

# Esperar uns segons per assegurar que el backend s'arrenqui
sleep 3

# Arrencar frontend
echo -e "${GREEN}🔥 Arrencant Frontend (Vite)...${NC}"
cd client
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Esperar que ambdós serveis s'arrenquin
sleep 2

echo -e "${GREEN}✅ Servidors arrencats correctament!${NC}"
echo -e "${BLUE}📍 URLs:${NC}"
echo -e "   Backend:  ${YELLOW}http://localhost:3000${NC}"
echo -e "   Frontend: ${YELLOW}http://localhost:5173${NC}"
echo ""
echo -e "${YELLOW}💡 Premeu Ctrl+C per aturar tots els servidors${NC}"
echo ""

# Mostrar logs en temps real (opcional)
echo -e "${BLUE}📄 Logs backend:${NC}"
tail -f logs/backend.log &

echo -e "${BLUE}📄 Logs frontend:${NC}"
tail -f logs/frontend.log &

# Esperar fins que l'usuari aturi els serveis
wait