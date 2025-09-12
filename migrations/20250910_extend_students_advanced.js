'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Afegir camps avançats a la taula students
    await queryInterface.addColumn('students', 'dni_nie', {
      type: DataTypes.STRING(15),
      allowNull: true
    });
    
    await queryInterface.addColumn('students', 'nacionalitat', {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: 'Espanyola'
    });
    
    await queryInterface.addColumn('students', 'lloc_naixement', {
      type: DataTypes.STRING(200),
      allowNull: true
    });
    
    await queryInterface.addColumn('students', 'adreca_completa', {
      type: DataTypes.TEXT,
      allowNull: true
    });
    
    await queryInterface.addColumn('students', 'codi_postal', {
      type: DataTypes.STRING(10),
      allowNull: true
    });
    
    await queryInterface.addColumn('students', 'poblacio', {
      type: DataTypes.STRING(100),
      allowNull: true
    });
    
    await queryInterface.addColumn('students', 'provincia', {
      type: DataTypes.STRING(100),
      allowNull: true
    });
    
    // Informació acadèmica ampliada
    await queryInterface.addColumn('students', 'curs_actual', {
      type: DataTypes.STRING(50),
      allowNull: true
    });
    
    await queryInterface.addColumn('students', 'grup_classe', {
      type: DataTypes.STRING(20),
      allowNull: true
    });
    
    await queryInterface.addColumn('students', 'necessitats_educatives_especials', {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    });
    
    await queryInterface.addColumn('students', 'observacions_academiques', {
      type: DataTypes.TEXT,
      allowNull: true
    });
    
    // Beques i ajudes
    await queryInterface.addColumn('students', 'te_beca', {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    });
    
    await queryInterface.addColumn('students', 'tipus_beca', {
      type: DataTypes.ENUM('BC70', 'BC100', 'altres'),
      allowNull: true
    });
    
    await queryInterface.addColumn('students', 'percentatge_beca', {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true,
      defaultValue: 0.00
    });

    // Afegir índexos pels nous camps
    await queryInterface.addIndex('students', ['dni_nie']);
    await queryInterface.addIndex('students', ['poblacio']);
    await queryInterface.addIndex('students', ['curs_actual']);
    await queryInterface.addIndex('students', ['necessitats_educatives_especials']);
    await queryInterface.addIndex('students', ['te_beca']);
    await queryInterface.addIndex('students', ['tipus_beca']);
  },

  async down(queryInterface, Sequelize) {
    // Eliminar índexos
    await queryInterface.removeIndex('students', ['dni_nie']);
    await queryInterface.removeIndex('students', ['poblacio']);
    await queryInterface.removeIndex('students', ['curs_actual']);
    await queryInterface.removeIndex('students', ['necessitats_educatives_especials']);
    await queryInterface.removeIndex('students', ['te_beca']);
    await queryInterface.removeIndex('students', ['tipus_beca']);

    // Eliminar columnes
    await queryInterface.removeColumn('students', 'dni_nie');
    await queryInterface.removeColumn('students', 'nacionalitat');
    await queryInterface.removeColumn('students', 'lloc_naixement');
    await queryInterface.removeColumn('students', 'adreca_completa');
    await queryInterface.removeColumn('students', 'codi_postal');
    await queryInterface.removeColumn('students', 'poblacio');
    await queryInterface.removeColumn('students', 'provincia');
    await queryInterface.removeColumn('students', 'curs_actual');
    await queryInterface.removeColumn('students', 'grup_classe');
    await queryInterface.removeColumn('students', 'necessitats_educatives_especials');
    await queryInterface.removeColumn('students', 'observacions_academiques');
    await queryInterface.removeColumn('students', 'te_beca');
    await queryInterface.removeColumn('students', 'tipus_beca');
    await queryInterface.removeColumn('students', 'percentatge_beca');
  }
};
