const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

// Importar configuració i routes
const { sequelize, syncDatabase } = require('./models');
const apiRoutes = require('./routes/api');

// Crear aplicació Express
const app = express();
const server = createServer(app);

// CORS Configuration - CRÍTICA PER FUNCIONAMENT
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    process.env.FRONTEND_URL || 'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Tenant-Slug',  // ← AQUEST ÉS EL CRÍTICO!
    'Accept',
    'Origin',
    'X-Requested-With'
  ],
  exposedHeaders: ['Authorization'],
  optionsSuccessStatus: 200,
  preflightContinue: false
};

// Configurar Socket.IO
const io = new Server(server, {
  cors: corsOptions
});

// Middleware de seguretat i configuració
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(cors(corsOptions));

// Middleware CORS addicional per assegurar headers correctes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Tenant-Slug');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Parser JSON i URL encoded
app.use(express.json({ 
  limit: process.env.UPLOAD_MAX_SIZE || '10mb',
  type: 'application/json'
}));
app.use(express.urlencoded({ 
  extended: true,
  limit: process.env.UPLOAD_MAX_SIZE || '10mb'
}));

// Servir fitxers estàtics
app.use('/uploads', express.static('public/uploads'));
app.use(express.static('public'));

// Afegir Socket.IO a les requests (per ús futur)
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes de l'API
app.use('/api', apiRoutes);

// Health check públic
app.get('/health', (req, res) => {
  res.json({ 
    success: true,
    message: 'Gestió Escolar API - Sistema Multi-tenant',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    database: 'Connected'
  });
});

// Endpoint informatiu
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🏫 Sistema de Gestió Escolar',
    description: 'API REST per gestionar serveis escolars multi-tenant',
    endpoints: {
      health: '/health',
      api: '/api',
      auth: '/api/auth',
      documentation: '/docs (Coming soon)'
    },
    tech_stack: {
      runtime: 'Node.js',
      framework: 'Express.js',
      database: process.env.DB_DIALECT === 'sqlite' ? 'SQLite' : 'MySQL',
      realtime: 'Socket.IO'
    }
  });
});

// Socket.IO basic setup (expandirem més endavant)
io.on('connection', (socket) => {
  console.log(`✅ Client connectat: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`❌ Client desconnectat: ${socket.id}`);
  });
  
  // Test event
  socket.emit('welcome', {
    message: 'Benvingut al sistema de gestió escolar',
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('❌ Global Error:', error);
  
  // Error de validació de Sequelize
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Error de validació de dades',
      errors: error.errors.map(err => ({
        field: err.path,
        message: err.message
      }))
    });
  }
  
  // Error de constrains de base de dades
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      success: false,
      message: 'Conflicte: aquesta dada ja existeix',
      field: error.errors[0]?.path
    });
  }
  
  // Error genèric
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Error intern del servidor',
    ...(process.env.NODE_ENV === 'development' && { 
      stack: error.stack,
      details: error 
    })
  });
});

// 404 handler per routes no trobades
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Ruta no trobada',
    requested_url: req.originalUrl,
    method: req.method,
    available_endpoints: {
      health: '/health',
      api: '/api',
      auth: '/api/auth'
    }
  });
});

// Funció per iniciar el servidor
const startServer = async () => {
  try {
    // Connectar a la base de dades
    await sequelize.authenticate();
    console.log('✅ Connexió a la base de dades establerta');
    
    // Sincronitzar models (només en desenvolupament)
    if (process.env.NODE_ENV === 'development') {
      await syncDatabase({ alter: true });
      console.log('✅ Models de base de dades sincronitzats');
    }
    
    // Iniciar servidor
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log('🚀 ========================================');
      console.log('🏫 SISTEMA GESTIÓ ESCOLAR - NODE.JS');
      console.log('🚀 ========================================');
      console.log(`✅ Servidor funcionant al port ${PORT}`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`🏥 Health: http://localhost:${PORT}/health`);
      console.log(`📡 API: http://localhost:${PORT}/api`);
      console.log(`🔌 Socket.IO: Actiu i funcionant`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`💾 Database: ${process.env.DB_DIALECT === 'sqlite' ? 'SQLite' : 'MySQL'}`);
      console.log('🚀 ========================================');
      
      if (process.env.NODE_ENV === 'development') {
        console.log('💡 Mode desenvolupament activat');
        console.log('💡 Frontend esperant a: http://localhost:5173');
      }
    });
    
  } catch (error) {
    console.error('❌ Error iniciant servidor:', error);
    process.exit(1);
  }
};

// Gestió de signals per shutdown correcte
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM rebut, tancant servidor...');
  await sequelize.close();
  server.close(() => {
    console.log('✅ Servidor tancat correctament');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT rebut, tancant servidor...');
  await sequelize.close();
  server.close(() => {
    console.log('✅ Servidor tancat correctament');
    process.exit(0);
  });
});

// Gestió d'errors no capturats
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Iniciar servidor
startServer();

module.exports = { app, server, io };
