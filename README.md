# 🏫 Sistema de Gestió Escolar - Node.js

Sistema web complet de gestió de serveis escolars multi-tenant desenvolupat amb Node.js i Vue.js.

## 📋 Característiques

- **Multi-tenant**: Suport per múltiples centres educatius
- **Gestió d'usuaris**: Famílies, monitors, admins del centre i super admins
- **Assistència**: Registre i seguiment d'assistència
- **Temps real**: Notificacions instantànies amb Socket.IO
- **Responsive**: Interfície optimitzada per tots els dispositius
- **Segur**: Autenticació JWT i aïllament de dades per tenant

## 🚀 Stack Tecnològic

### Backend
- **Node.js** 18+ amb Express.js
- **Base de dades**: SQLite (dev) / MySQL (prod)
- **ORM**: Sequelize
- **Autenticació**: JWT + bcryptjs
- **Temps real**: Socket.IO

### Frontend
- **Vue.js 3** amb Composition API
- **Router**: Vue Router 4
- **State**: Pinia
- **Styling**: Tailwind CSS
- **Build**: Vite

## 🏗️ Estructura del Projecte

```
gestio-escolar-nodejs/
├── server.js              # Servidor principal
├── package.json
├── .env                   # Variables d'entorn
├── config/
│   ├── database.js        # Configuració Sequelize
│   └── jwt.js            # Configuració JWT
├── models/               # Models Sequelize
│   ├── Tenant.js
│   ├── User.js
│   ├── Student.js
│   └── associations.js
├── controllers/          # Controladors API
├── middleware/           # Middleware personalitzat
├── routes/               # Definició de routes
├── services/             # Lògica de negoci
└── client/               # Frontend Vue.js
```

## ⚡ Instal·lació Ràpida

### Prerequisits
- Node.js 18+ i npm
- Git

### Setup Backend

```bash
# Clonar/descarregar el projecte
cd gestio-escolar-nodejs

# Instal·lar dependències
npm install

# Configurar variables d'entorn
cp .env.example .env
# Editar .env amb les teves configuracions

# Iniciar servidor de desenvolupament
npm run server:dev
```

El servidor estarà disponible a: http://localhost:3000

### Setup Frontend (Proper pas - Fase 2)

```bash
# Crear aplicació Vue.js
mkdir client && cd client
npm create vue@latest . --router --pinia
npm install axios socket.io-client @headlessui/vue @heroicons/vue
npm install -D @tailwindcss/forms

# Iniciar frontend
npm run dev
```

## 🧪 Testing de l'API

### Health Check
```bash
curl http://localhost:3000/health
```

### Registre d'usuari
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@escola.com",
    "password": "123456",
    "tenant_slug": "escola-demo"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@escola.com",
    "password": "123456",
    "tenant_slug": "escola-demo"
  }'
```

## 📊 Models de Dades

### Rols d'usuari
- **FAMILIA**: Accés a dades dels fills
- **MONITOR**: Registre d'assistència
- **ADMIN_CENTRE**: Gestió del centre
- **SUPER_ADMIN**: Accés global a tots els tenants

### Estructura Multi-tenant
Cada centre educatiu (tenant) té les seves dades completament aïllades:
- Usuaris únics per tenant
- Estudiants per tenant
- Configuració independent

## 🔐 Seguretat

- Autenticació JWT amb expiració
- Contrasenya hashejada amb bcrypt
- Middleware d'aïllament multi-tenant
- Validació d'entrada amb Joi
- Headers de seguretat amb Helmet
- CORS configurat correctament

## 🚀 Scripts Disponibles

```bash
npm run dev          # Desenvolupament complet (backend + frontend)
npm run server:dev   # Només servidor backend
npm run client:dev   # Només frontend
npm start           # Producció
npm test            # Tests
npm run lint        # Linting
```

## 📈 Roadmap

- [x] **Fase 1**: Foundation - Models, auth, API bàsica
- [ ] **Fase 2**: Dashboard família
- [ ] **Fase 3**: Dashboard monitor tàctil
- [ ] **Fase 4**: Sistema de preus
- [ ] **Fase 5**: Administració
- [ ] **Fase 6**: Deploy i optimització

## 🤝 Contribució

Aquest projecte segueix les millors pràctiques de desenvolupament:
- Code clean i documentat
- Error handling robust
- Testing automatitzat
- Commits semàntics

## 📄 Llicència

MIT License - Veure arxiu LICENSE per detalls.

---

**Desenvolupat amb ❤️ per al sistema educatiu català**
