'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear taula student_documents
    await queryInterface.createTable('student_documents', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      student_id: {
        type: DataTypes.UUID,
        allowNull: false,
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
      uploaded_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      tipus_document: {
        type: DataTypes.ENUM(
          'dni_nie_estudiant',
          'llibre_familia', 
          'targeta_sanitaria',
          'autoritzacio_imatge',
          'autoritzacio_sortides',
          'informe_medic',
          'certificat_medicament',
          'altres_documents'
        ),
        allowNull: false
      },
      nom_fitxer: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      nom_original: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      ruta_fitxer: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      mida_bytes: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      tipus_mime: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      hash_fitxer: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      descripcio: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      data_caducitat: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      estat_verificacio: {
        type: DataTypes.ENUM('pendent', 'verificat', 'rebutjat'),
        defaultValue: 'pendent'
      },
      verificat_per: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      data_verificacio: {
        type: DataTypes.DATE,
        allowNull: true
      },
      notes_verificacio: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      visible_familia: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      actiu: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
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
    await queryInterface.addIndex('student_documents', ['student_id']);
    await queryInterface.addIndex('student_documents', ['tenant_id']);
    await queryInterface.addIndex('student_documents', ['tipus_document']);
    await queryInterface.addIndex('student_documents', ['estat_verificacio']);
    await queryInterface.addIndex('student_documents', ['data_caducitat']);
    await queryInterface.addIndex('student_documents', ['hash_fitxer'], {
      unique: true,
      name: 'unique_hash_fitxer'
    });
    await queryInterface.addIndex('student_documents', ['uploaded_by']);
    await queryInterface.addIndex('student_documents', ['visible_familia']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('student_documents');
  }
};
