# 🎓 Sistema de Gestió Escolar Avançat
### **Node.js + Vue.js + SQLite**

[![Version](https://img.shields.io/badge/version-1.0.0--fase1-blue.svg)](https://github.com/Oskarpp7/appnode/releases)
[![Node.js](https://img.shields.io/badge/node.js-18+-green.svg)](https://nodejs.org)
[![Vue.js](https://img.shields.io/badge/vue.js-3-green.svg)](https://vuejs.org)
[![SQLite](https://img.shields.io/badge/database-SQLite-blue.svg)](https://sqlite.org)

## 🎯 **Fase 1 Completada - Sistema Avançat de Gestió d'Estudiants**

Sistema complet de gestió escolar multi-tenant amb autenticació basada en rols, dissenyat per centres educatius moderns.

---

## 🚀 **Característiques Principals**

### **Backend (Node.js + Express)**
- 🔐 **Autenticació JWT** amb 5 rols específics
- 🏢 **Multi-tenant** amb aïllament complet
- 📊 **API RESTful** amb validació Joi
- 🗄️ **SQLite + Sequelize** amb 7 taules relacionals
- 📁 **Sistema de fitxers** amb Multer i validació SHA-256
- ✅ **Validacions avançades** (DNI/NIE, mides fitxers, RGPD)

### **Frontend (Vue.js 3 + Tailwind CSS)**
- 🎨 **25+ Components** modulars i reutilitzables
- 📱 **Responsive Design** adaptatiu
- 🎛️ **5 Dashboards específics** per rol
- ⚡ **Validació en temps real** amb feedback visual
- 🧩 **Composables Vue** per lògica reutilitzable

---

## 👥 **Sistema de Rols**

| Rol | Descripció | Permisos |
|-----|------------|----------|
| **SUPER_ADMIN** | Administrador del sistema | Gestió de tenants i configuració global |
| **ADMIN_CENTRE** | Director del centre | Gestió completa del centre educatiu |
| **COORDINADOR** | Coordinador pedagògic | Gestió estudients i professors |
| **MONITOR** | Monitor/Professor | Consulta i assistència d'estudiants |
| **FAMILIA** | Família/Tutor | Consulta dades dels seus fills |

---

## 🏗️ **Arquitectura del Sistema**

### **Models de Base de Dades**
```
students (estudiant principal)
├── persones_autoritzades (tutors i persones autoritzades)
├── student_medical (informació mèdica)
├── student_documents (documents i fitxers)
├── service_enrollments (inscripcions a serveis)
├── service_attendance (registre d'assistència)
└── attendance_sessions (sessions d'activitats)
```

### **Components Frontend**
```
components/
├── StudentFormComplete.vue (formulari principal)
├── TutorManager.vue (gestió tutors)
├── MedicalDataForm.vue (informació mèdica)
├── DocumentUpload.vue (sistema documents)
├── ui/ (components reutilitzables)
└── layout/ (estructures de pàgina)
```

---

## 🛠️ **Instal·lació i Configuració**

### **1. Prerequisits**
```bash
# Node.js 18+ i npm
node --version  # v18+
npm --version   # 8+
```

### **2. Clonació i Instal·lació**
```bash
# Clonar repositori
git clone https://github.com/Oskarpp7/appnode.git
cd appnode

# Instal·lar dependències backend
npm install

# Instal·lar dependències frontend
cd client
npm install
cd ..
```

### **3. Configuració Base de Dades**
```bash
# Executar migracions
node run-migrations.js

# Poblar dades de prova (opcional)
node seed.js
```

### **4. Iniciar Aplicació**
```bash
# Terminal 1: Backend (port 3000)
npm start

# Terminal 2: Frontend (port 5173)
cd client
npm run dev
```

### **5. Accés a l'Aplicació**
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api
- **Formulari Avançat:** http://localhost:5173/test

---

## 📋 **Funcionalitats Implementades**

### **✅ Gestió d'Estudiants Avançada**
- Informació personal completa
- Necessitats educatives especials
- Dades de contacte detallades
- Sistema acadèmic amb cursos i grups

### **✅ Sistema Multi-Tutor**
- Múltiples tutors per estudiant
- Relacions familiars definides
- Prioritats de contacte
- Autoritzacions específiques (recollir, decisions mèdiques)
- Validació DNI/NIE amb controls de duplicats

### **✅ Informació Mèdica**
- Targeta sanitària i centre de salut
- Gestió d'al·lèrgies amb sistema de tags
- Medicaments habituals i condicions cròniques
- Contactes d'emergència mèdica
- Flags d'atenció especial

### **✅ Sistema de Documents**
- Pujada de fitxers amb validació tipus/mida
- Categorització (DNI, targeta sanitària, informes...)
- Control d'expiració automàtic
- Estats de verificació (pendent/verificat/rebutjat)
- Hash SHA-256 per integritat

### **✅ Dashboards per Rol**
- Mètriques específiques per cada rol
- Gràfics interactius amb Chart.js
- Accions ràpides contextuals
- Notificacions i alertes

---

## 🔧 **API Endpoints Principals**

### **Estudiants**
```http
GET    /api/students           # Llistar estudiants
POST   /api/students           # Crear estudiant
GET    /api/students/:id       # Obtenir estudiant
PUT    /api/students/:id       # Actualitzar estudiant
DELETE /api/students/:id       # Eliminar estudiant
```

### **Tutors**
```http
GET    /api/students/:id/tutors     # Llistar tutors
POST   /api/students/:id/tutors     # Afegir tutor
PUT    /api/tutors/:id              # Actualitzar tutor
DELETE /api/tutors/:id              # Eliminar tutor
```

### **Documents**
```http
GET    /api/students/:id/documents  # Llistar documents
POST   /api/students/:id/documents  # Pujar document
GET    /api/documents/:id/download  # Descarregar document
DELETE /api/documents/:id           # Eliminar document
```

---

## 🎨 **Tecnologies Utilitzades**

### **Backend**
- **Node.js** + **Express.js** - Servidor i API
- **Sequelize** - ORM per SQLite
- **JWT** - Autenticació i autorització
- **Joi** - Validació de dades
- **Multer** - Gestió de fitxers
- **bcrypt** - Hash de contrasenyes

### **Frontend**
- **Vue.js 3** - Framework reactiu
- **Vue Router** - Navegació SPA
- **Pinia** - Gestió d'estat
- **Tailwind CSS** - Disseny i estils
- **Heroicons** - Iconografia
- **Chart.js** - Gràfics i visualitzacions

### **Base de Dades**
- **SQLite** - Base de dades local
- **7 taules relacionals** amb integritat referencial
- **Migracions automàtiques** amb control de versions

---

## 🧪 **Dades de Prova**

### **Usuaris per Defecte** (password: `password123`)
```
super@admin.com     # SUPER_ADMIN
admin@escola.cat    # ADMIN_CENTRE  
coord@escola.cat    # COORDINADOR
monitor@escola.cat  # MONITOR
familia@escola.cat  # FAMILIA
```

### **Estudiant de Prova**
- **Nom:** Marc Puig García
- **Curs:** 3r Primària
- **Tutors:** 2 tutors configurats
- **Documents:** Targeta sanitària i autoritzacions

---

## 🚀 **Roadmap - Pròximes Fases**

### **📅 Fase 2 - Sistema d'Assistència (Planificada)**
- ✨ Generació de QR codes per estudiants
- 📷 Escàner QR per registre d'assistència
- 📊 Panell de control d'assistència en temps real
- 🔔 Notificacions automàtiques a famílies
- 📈 Informes d'assistència detallats

### **📅 Fase 3 - Automatització de Facturació (Planificada)**
- 💰 Gestió de quotes i pagaments
- 📄 Generació automàtica de factures
- 💳 Integració amb passarel·les de pagament
- 📧 Enviament automàtic per email
- 📊 Dashboard financer

---

## 🤝 **Contribució**

1. Fork del projecte
2. Crear branch de funcionalitat (`git checkout -b feature/nova-funcionalitat`)
3. Commit dels canvis (`git commit -m 'Afegir nova funcionalitat'`)
4. Push al branch (`git push origin feature/nova-funcionalitat`)
5. Obrir Pull Request

---

## 📄 **Llicència**

Aquest projecte està sota llicència MIT. Consulta el fitxer [LICENSE](LICENSE) per més detalls.

---

## 🏆 **Estat del Projecte**

**✅ Fase 1 Completada** - Sistema Avançat de Gestió d'Estudiants
- 16,000+ línies de codi
- 76 fitxers nous/modificats
- 25+ components Vue
- 15+ endpoints API
- Cobertura completa de funcionalitats

**📊 Estadístiques:**
- **Models:** 7 taules de base de dades
- **Migracions:** 4 executades correctament
- **Components:** 25+ components reutilitzables
- **Endpoints:** 15+ amb validació completa
- **Rols:** 5 sistemes de permisos diferents

---

## 📞 **Suport**

Per preguntes o suport tècnic:
- 📧 Email: [oskarpujol@gmail.com](mailto:oskarpujol@gmail.com)
- 🐛 Issues: [GitHub Issues](https://github.com/Oskarpp7/appnode/issues)
- 📖 Documentació: Disponible al repositori

---

<div align="center">

**🎓 Desenvolupat per a centres educatius moderns**

[![GitHub](https://img.shields.io/badge/GitHub-Oskarpp7-black?logo=github)](https://github.com/Oskarpp7)
[![Version](https://img.shields.io/badge/version-1.0.0--fase1-blue.svg)](https://github.com/Oskarpp7/appnode/releases)

</div>
