'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear taula persones_autoritzades
    await queryInterface.createTable('persones_autoritzades', {
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
      nom: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      cognoms: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      dni_nie: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      telefon_principal: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      telefon_secundari: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: true
      },
      relacio_familiar: {
        type: DataTypes.ENUM('pare', 'mare', 'tutor_legal', 'avi_avia', 'oncle_tia', 'germa_germana', 'altres'),
        allowNull: false
      },
      prioritat_contacte: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      autoritzat_recollir: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      autoritzat_decisio_medica: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      foto_autoritzacio_url: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      observacions: {
        type: DataTypes.TEXT,
        allowNull: true
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
    await queryInterface.addIndex('persones_autoritzades', ['student_id']);
    await queryInterface.addIndex('persones_autoritzades', ['tenant_id']);
    await queryInterface.addIndex('persones_autoritzades', ['dni_nie', 'tenant_id'], {
      unique: true,
      name: 'unique_dni_per_tenant'
    });
    await queryInterface.addIndex('persones_autoritzades', ['telefon_principal']);
    await queryInterface.addIndex('persones_autoritzades', ['prioritat_contacte']);
    await queryInterface.addIndex('persones_autoritzades', ['autoritzat_recollir']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('persones_autoritzades');
  }
};
