const { sequelize } = require('../config/database');

// Importar tots els models
const Tenant = require('./Tenant');
const User = require('./User');
const Student = require('./Student');
const StudentFamily = require('./StudentFamily');

// Importar associacions
require('./associations');

// Funcions d'utilitat per la base de dades
const syncDatabase = async (options = {}) => {
  try {
    console.log('🔄 Sincronitzant base de dades...');
    
    await sequelize.sync(options);
    
    console.log('✅ Base de dades sincronitzada correctament');
  } catch (error) {
    console.error('❌ Error sincronitzant base de dades:', error);
    throw error;
  }
};

const resetDatabase = async () => {
  try {
    console.log('🗑️  Resetejant base de dades...');
    
    await sequelize.drop();
    await sequelize.sync({ force: true });
    
    console.log('✅ Base de dades resetejada i recreada');
  } catch (error) {
    console.error('❌ Error resetejant base de dades:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  Tenant,
  User,
  Student,
  StudentFamily,
  syncDatabase,
  resetDatabase
};
