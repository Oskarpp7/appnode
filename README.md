# 🏫 Sistema de Gestió Escolar Multi-tenant

Un sistema integral de gestió escolar desenvolupat amb Node.js i Vue.js, dissenyat per suportar múltiples centres educatius (multi-tenant) amb funcionalitats completes per a la gestió d'estudiants, famílies, serveis i facturació.

## ✅ ESTAT ACTUAL: TOTALMENT OPERATIU

- **Backend API**: ✅ Funcionant al port 3000
- **Frontend Vue**: ✅ Funcionant al port 5173 (ESTABILITZAT)
- **Autenticació multi-tenant**: ✅ Implementada i testejada
- **Dashboards per rol**: ✅ 5 dashboards únics creats
- **Demo data**: ✅ Tenant 'escola-demo' amb usuaris de prova

## 🚀 Característiques Principals

### 🔐 Autenticació i Autorització ✅ IMPLEMENTADA
- Sistema multi-tenant amb identificació per slug
- Autenticació JWT amb tokens segurs
- Rols d'usuari: SUPER_ADMIN, ADMIN_CENTRE, COORDINADOR, MONITOR, FAMILIA
- ✅ **IMPLEMENTAT**: Suport per X-Tenant-Slug header i case-insensitive search
- ✅ **IMPLEMENTAT**: Middleware de protecció de rutes amb guards per rol

### 👨‍👩‍👧‍👦 Gestió d'Usuaris ✅ OPERATIVA
- Registre i gestió de famílies
- Administració del personal del centre
- Perfils d'usuari personalitzables
- Sistema de permisos per rols
- ✅ **6 usuaris de prova** creats amb diferents rols

### 🎨 Dashboards per Rol ✅ IMPLEMENTATS
- **SUPER_ADMIN** → `/superadmin` (Gestió multi-tenant, colors porpra)
- **ADMIN_CENTRE** → `/admin` (Administració centre, colors blaus)
- **COORDINADOR** → `/coordinador` (Coordinació activitats, colors verds)
- **MONITOR** → `/monitor` (Gestió estudiants, colors taronja)
- **FAMILIA** → `/familia` (Portal famílies, colors rosa)
- ✅ **Router amb guards automàtics** i redireccions basades en rol

## 🚀 Stack Tecnològic

### Backend ✅ OPERATIU
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web (port 3000)
- **Sequelize** - ORM per base de dades
- **SQLite** - Base de dades ✅ amb demo data
- **JWT** - Autenticació ✅ amb X-Tenant-Slug header
- **Socket.IO** - Comunicació en temps real ✅ amb CORS
- **CORS** - ✅ Configurat per localhost:5173 amb credentials

### Frontend ✅ ESTABILITZAT
- **Vue.js 3** - Framework progressiu
- **Vue Router** - Navegació SPA ✅ amb guards per rol
- **Pinia** - Gestió d'estat ✅ amb auth store
- **Vite** - ✅ **ESTABILITZAT** (strictPort: true, port 5173)
- **Tailwind CSS** - Framework CSS ✅ amb colors per rol
- **Axios** - Client HTTP ✅ amb tenant headers

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
