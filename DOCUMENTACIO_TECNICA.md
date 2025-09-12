# 🔧 Documentació Tècnica - Sistema de Gestió Escolar

## 🏗️ Arquitectura del Sistema

### Stack Tecnològic
```
Frontend: Vue.js 3 + Tailwind CSS + Vite
Backend: Node.js + Express.js + Sequelize
Database: SQLite amb 7 taules relacionals
Auth: JWT amb refresh tokens
Files: Multer + SHA-256 validation
```

### Estructura de Directoris
```
nodeapp/
├── server.js                 # Punt d'entrada principal
├── package.json              # Dependències backend
├── database.sqlite           # Base de dades SQLite
├── config/                   # Configuracions
│   ├── database.js
│   └── jwt.js
├── models/                   # Models Sequelize
│   ├── index.js
│   ├── User.js
│   ├── Student.js
│   ├── PersonaAutoritzada.js
│   ├── StudentMedical.js
│   ├── StudentDocument.js
│   └── ...
├── controllers/              # Lògica de negoci
├── routes/                   # Definició d'endpoints
├── middleware/               # Middleware personalitzat
├── migrations/               # Migracions de BD
└── client/                   # Frontend Vue.js
    ├── src/
    │   ├── components/
    │   ├── views/
    │   ├── stores/
    │   └── router/
    └── package.json
```

---

## 🗄️ Models de Base de Dades

### 1. Model User
```javascript
// models/User.js
const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
  nom: DataTypes.STRING,
  rol: {
    type: DataTypes.ENUM,
    values: ['SUPER_ADMIN', 'ADMIN_CENTRE', 'COORDINADOR', 'MONITOR', 'FAMILIA']
  },
  tenantId: DataTypes.INTEGER
});
```

### 2. Model Student
```javascript
// models/Student.js
const Student = sequelize.define('Student', {
  nom: { type: DataTypes.STRING, allowNull: false },
  cognoms: { type: DataTypes.STRING, allowNull: false },
  dataNaixement: DataTypes.DATE,
  sexe: DataTypes.ENUM('M', 'F', 'Altre'),
  nacionalitat: DataTypes.STRING,
  curs: DataTypes.STRING,
  grup: DataTypes.STRING,
  necessitatsEspecials: DataTypes.TEXT,
  tenantId: DataTypes.INTEGER
});
```

### 3. Model PersonaAutoritzada (Tutors)
```javascript
// models/PersonaAutoritzada.js
const PersonaAutoritzada = sequelize.define('PersonaAutoritzada', {
  nom: { type: DataTypes.STRING, allowNull: false },
  cognoms: { type: DataTypes.STRING, allowNull: false },
  dni: { type: DataTypes.STRING, allowNull: false },
  telefon: { type: DataTypes.STRING, allowNull: false },
  relacio: {
    type: DataTypes.ENUM,
    values: ['mare', 'pare', 'tutor_legal', 'avi_avia', 'oncle_tia', 'germa_germana', 'altre']
  },
  prioritat: { type: DataTypes.INTEGER, defaultValue: 1 },
  potRecollir: { type: DataTypes.BOOLEAN, defaultValue: true },
  autoritzacioMedica: { type: DataTypes.BOOLEAN, defaultValue: false },
  studentId: DataTypes.INTEGER,
  tenantId: DataTypes.INTEGER
});
```

### 4. Model StudentMedical
```javascript
// models/StudentMedical.js
const StudentMedical = sequelize.define('StudentMedical', {
  targeta_sanitaria: DataTypes.STRING,
  centre_salut: DataTypes.STRING,
  allergies: DataTypes.JSON, // Array d'objectes {nom, gravetat, descripcio}
  medicaments: DataTypes.TEXT,
  condicions_croniques: DataTypes.TEXT,
  contacte_emergencia: DataTypes.JSON,
  observacions: DataTypes.TEXT,
  studentId: DataTypes.INTEGER,
  tenantId: DataTypes.INTEGER
});
```

### 5. Model StudentDocument
```javascript
// models/StudentDocument.js
const StudentDocument = sequelize.define('StudentDocument', {
  nom_fitxer: DataTypes.STRING,
  tipus_document: {
    type: DataTypes.ENUM,
    values: ['dni', 'targeta_sanitaria', 'informe_medic', 'autoritzacio', 'fotografia', 'altre']
  },
  ruta_fitxer: DataTypes.STRING,
  mida_fitxer: DataTypes.INTEGER,
  mime_type: DataTypes.STRING,
  hash_sha256: DataTypes.STRING,
  data_expiracio: DataTypes.DATE,
  estat_verificacio: {
    type: DataTypes.ENUM,
    values: ['pendent', 'verificat', 'rebutjat'],
    defaultValue: 'pendent'
  },
  studentId: DataTypes.INTEGER,
  tenantId: DataTypes.INTEGER
});
```

---

## 🛣️ API Endpoints

### Autenticació
```http
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
```

### Gestió d'Estudiants
```http
GET    /api/students              # Llistar estudiants
POST   /api/students              # Crear estudiant
GET    /api/students/:id          # Obtenir estudiant
PUT    /api/students/:id          # Actualitzar estudiant
DELETE /api/students/:id          # Eliminar estudiant
GET    /api/students/:id/complete # Informació completa
```

### Gestió de Tutors
```http
GET    /api/students/:studentId/tutors    # Llistar tutors
POST   /api/students/:studentId/tutors    # Afegir tutor
PUT    /api/tutors/:id                    # Actualitzar tutor
DELETE /api/tutors/:id                    # Eliminar tutor
```

### Informació Mèdica
```http
GET    /api/students/:id/medical          # Obtenir info mèdica
PUT    /api/students/:id/medical          # Actualitzar info mèdica
```

### Gestió de Documents
```http
GET    /api/students/:id/documents        # Llistar documents
POST   /api/students/:id/documents        # Pujar document
GET    /api/documents/:id/download        # Descarregar document
PUT    /api/documents/:id                 # Actualitzar metadades
DELETE /api/documents/:id                 # Eliminar document
```

---

## 🔐 Sistema d'Autenticació i Autorització

### JWT Implementation
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token d\'accés requerit' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token invàlid' });
    req.user = user;
    next();
  });
};
```

### Control de Rols
```javascript
// middleware/roleCheck.js
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.rol)) {
      return res.status(403).json({ error: 'Permisos insuficients' });
    }
    next();
  };
};

// Ús: router.get('/admin', authenticateToken, checkRole(['ADMIN_CENTRE']), handler);
```

### Multi-tenant Isolation
```javascript
// middleware/tenant.js
const tenantFilter = (req, res, next) => {
  // Afegir tenantId a totes les consultes automaticament
  req.tenantId = req.user.tenantId;
  next();
};
```

---

## 📁 Sistema de Fitxers

### Configuració Multer
```javascript
// middleware/upload.js
const multer = require('multer');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    cb(null, allowedTypes.includes(file.mimetype));
  }
});
```

### Validació SHA-256
```javascript
const generateFileHash = (filePath) => {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
};
```

---

## 🎨 Components Vue.js

### Component Principal - StudentFormComplete.vue
```vue
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Formulari estudiant -->
      <StudentFormSimple v-model="studentData" />
      
      <!-- Gestió tutors -->
      <TutorManager v-model="tutors" :student-id="studentData.id" />
      
      <!-- Informació mèdica -->
      <MedicalDataForm v-model="medicalData" />
      
      <!-- Sistema documents -->
      <DocumentUpload :student-id="studentData.id" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import StudentFormSimple from './StudentFormSimple.vue'
import TutorManager from './TutorManager.vue'
import MedicalDataForm from './MedicalDataForm.vue'
import DocumentUpload from './DocumentUpload.vue'

const studentData = reactive({
  nom: '',
  cognoms: '',
  dataNaixement: '',
  // ... més camps
})

const tutors = ref([])
const medicalData = reactive({
  targeta_sanitaria: '',
  allergies: [],
  // ... més camps
})
</script>
```

### Store Pinia - Student Management
```javascript
// stores/students.js
import { defineStore } from 'pinia'

export const useStudentsStore = defineStore('students', {
  state: () => ({
    students: [],
    currentStudent: null,
    loading: false,
    filters: {
      curs: '',
      grup: '',
      search: ''
    }
  }),
  
  getters: {
    filteredStudents: (state) => {
      return state.students.filter(student => {
        // Lògica de filtres
        return true
      })
    }
  },
  
  actions: {
    async fetchStudents() {
      this.loading = true
      try {
        const response = await fetch('/api/students')
        this.students = await response.json()
      } finally {
        this.loading = false
      }
    },
    
    async createStudent(studentData) {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      })
      return response.json()
    }
  }
})
```

---

## 🧪 Testing

### Backend Testing (Jest)
```javascript
// tests/students.test.js
const request = require('supertest')
const app = require('../server')

describe('Students API', () => {
  test('GET /api/students returns list', async () => {
    const response = await request(app)
      .get('/api/students')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      
    expect(Array.isArray(response.body)).toBe(true)
  })
  
  test('POST /api/students creates student', async () => {
    const studentData = {
      nom: 'Test',
      cognoms: 'Student',
      dataNaixement: '2010-01-01'
    }
    
    const response = await request(app)
      .post('/api/students')
      .set('Authorization', `Bearer ${token}`)
      .send(studentData)
      .expect(201)
      
    expect(response.body.nom).toBe(studentData.nom)
  })
})
```

### Frontend Testing (Vitest)
```javascript
// tests/components/StudentForm.test.js
import { mount } from '@vue/test-utils'
import StudentFormSimple from '@/components/StudentFormSimple.vue'

describe('StudentFormSimple', () => {
  test('renders form fields', () => {
    const wrapper = mount(StudentFormSimple)
    
    expect(wrapper.find('input[name="nom"]').exists()).toBe(true)
    expect(wrapper.find('input[name="cognoms"]').exists()).toBe(true)
  })
  
  test('validates required fields', async () => {
    const wrapper = mount(StudentFormSimple)
    
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.find('.error-message').exists()).toBe(true)
  })
})
```

---

## 🚀 Deployment

### Variables d'Entorn
```env
# .env
NODE_ENV=production
PORT=3000
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
DB_PATH=./database.sqlite
UPLOAD_PATH=./public/uploads
MAX_FILE_SIZE=5242880
```

### Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Backend
COPY package*.json ./
RUN npm ci --only=production

# Frontend build
COPY client/package*.json ./client/
WORKDIR /app/client
RUN npm ci && npm run build

WORKDIR /app
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

### PM2 Configuration
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'escola-app',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log'
  }]
}
```

---

## 🔍 Debugging i Logging

### Logger Configuration
```javascript
// utils/logger.js
const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

module.exports = logger
```

### Error Handling Middleware
```javascript
// middleware/errorHandler.js
const logger = require('../utils/logger')

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, {
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  })
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Dades de validació incorrectes',
      details: err.details
    })
  }
  
  res.status(500).json({
    error: 'Error intern del servidor'
  })
}

module.exports = errorHandler
```

---

## 📈 Optimització i Performance

### Database Indexing
```sql
-- Índexs per optimitzar consultes
CREATE INDEX idx_students_tenant ON students(tenantId);
CREATE INDEX idx_students_curs ON students(curs);
CREATE INDEX idx_persones_autoritzades_student ON persones_autoritzades(studentId);
CREATE INDEX idx_student_documents_student ON student_documents(studentId);
```

### Caching Strategy
```javascript
// utils/cache.js
const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 600 }) // 10 minuts

const getCachedData = (key) => {
  return cache.get(key)
}

const setCachedData = (key, data, ttl = 600) => {
  return cache.set(key, data, ttl)
}

module.exports = { getCachedData, setCachedData }
```

### Frontend Optimization
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['@headlessui/vue', '@heroicons/vue']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

---

## 🔒 Seguretat

### Input Validation
```javascript
// utils/validation.js
const Joi = require('joi')

const studentSchema = Joi.object({
  nom: Joi.string().min(2).max(50).required(),
  cognoms: Joi.string().min(2).max(100).required(),
  dataNaixement: Joi.date().max('now').required(),
  dni: Joi.string().pattern(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i),
  // ... més validacions
})

const validateStudent = (data) => {
  return studentSchema.validate(data)
}

module.exports = { validateStudent }
```

### Security Headers
```javascript
// middleware/security.js
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuts
  max: 100 // límit de 100 peticions per IP
})

app.use(helmet())
app.use(limiter)
```

---

## 📚 Recursos Addicionals

### Scripts Útils
```json
{
  "scripts": {
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "server": "nodemon server.js",
    "client": "cd client && npm run dev",
    "build": "cd client && npm run build",
    "test": "jest",
    "test:watch": "jest --watch",
    "migrate": "node run-migrations.js",
    "seed": "node seed.js",
    "backup": "./scripts/backup.sh"
  }
}
```

### Git Hooks
```bash
#!/bin/sh
# .git/hooks/pre-commit
npm run test
npm run lint
```

Aquest document serveix com a guia completa per desenvolupadors que vulguin contribuir al projecte o entendre el seu funcionament intern.
