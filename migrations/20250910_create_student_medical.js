'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear taula student_medical
    await queryInterface.createTable('student_medical', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      student_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'students',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tenant_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tenants',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      // Informació mèdica bàsica
      grup_sanguini: {
        type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'desconegut'),
        defaultValue: 'desconegut'
      },
      numero_targeta_sanitaria: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      centre_sanitari_assignat: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      metge_pediatra: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      telefon_urgencies_mediques: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      // Al·lèrgies i intoleràncies
      te_allergies: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      allergies_alimentaries: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      allergies_medicaments: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      allergies_ambientals: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      intolerancies_alimentaries: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      // Medicació habitual
      pren_medicacio_habitual: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      medicacio_detalls: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      // Condicions mèdiques especials
      condicions_mediques: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      necessitats_especials: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      // Autoritzacions mèdiques
      autoritzacio_medicacio_escola: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      autoritzacio_tractament_urgencia: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      autoritzacio_activitat_fisica: {
        type: DataTypes.ENUM('sense_limitacions', 'limitacions_lleugeres', 'limitacions_severes', 'prohibida'),
        defaultValue: 'sense_limitacions'
      },
      // Dieta i alimentació
      dieta_especial: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      tipus_dieta: {
        type: DataTypes.ENUM('normal', 'vegetariana', 'vegana', 'sense_gluten', 'diabetica', 'hipocalorica', 'altres'),
        defaultValue: 'normal'
      },
      detalls_dieta: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      // Contactes d'emergència mèdica
      contacte_emergencia_1_nom: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      contacte_emergencia_1_telefon: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      contacte_emergencia_1_relacio: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      contacte_emergencia_2_nom: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      contacte_emergencia_2_telefon: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      contacte_emergencia_2_relacio: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      // Observacions generals
      observacions_generals: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      // Control d'actualització
      darrera_revisio_medica: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      revisio_per: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });

    // Afegir índexos
    await queryInterface.addIndex('student_medical', ['student_id'], { unique: true });
    await queryInterface.addIndex('student_medical', ['tenant_id']);
    await queryInterface.addIndex('student_medical', ['te_allergies']);
    await queryInterface.addIndex('student_medical', ['pren_medicacio_habitual']);
    await queryInterface.addIndex('student_medical', ['dieta_especial']);
    await queryInterface.addIndex('student_medical', ['darrera_revisio_medica']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('student_medical');
  }
};
