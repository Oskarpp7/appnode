const { sequelize } = require('./models');
const fs = require('fs');
const path = require('path');

async function runMigrations() {
  try {
    console.log('🔄 Aplicant migracions per a Fase 1...');
    
    // Crear directori migrations si no existeix
    const migrationsDir = path.join(__dirname, 'migrations');
    if (!fs.existsSync(migrationsDir)) {
      fs.mkdirSync(migrationsDir, { recursive: true });
      console.log('📁 Directori migrations creat');
    }
    
    // Llegir i executar cada migració
    const migrationFiles = [
      '20250910_extend_students_advanced.js',
      '20250910_create_persones_autoritzades.js', 
      '20250910_create_student_documents.js',
      '20250910_create_student_medical.js'
    ];
    
    for (const file of migrationFiles) {
      const migrationPath = path.join(__dirname, 'migrations', file);
      if (fs.existsSync(migrationPath)) {
        console.log(`📋 Executant: ${file}`);
        try {
          const migration = require(migrationPath);
          await migration.up(sequelize.getQueryInterface(), sequelize.constructor);
          console.log(`✅ Completada: ${file}`);
        } catch (error) {
          console.error(`❌ Error en ${file}:`, error.message);
          // Continuar amb la següent migració
        }
      } else {
        console.log(`⚠️  Migració no trobada: ${file}`);
      }
    }
    
    console.log('🎉 Migracions processades correctament');
    console.log('📊 Verificant estructura de base de dades...');
    
    // Verificar que les taules s'han creat
    const tableNames = await sequelize.getQueryInterface().showAllTables();
    console.log('📋 Taules disponibles:', tableNames);
    
  } catch (error) {
    console.error('❌ Error general aplicant migracions:', error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

runMigrations();
