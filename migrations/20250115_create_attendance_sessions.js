const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear taula attendance_sessions
    await queryInterface.createTable('attendance_sessions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      session_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      service_type: {
        type: DataTypes.ENUM([
          'menjador', 
          'extraescolars', 
          'acollida_matinal', 
          'acollida_tarda',
          'sortides_pedagogiques',
          'colònies',
          'casals_estiu'
        ]),
        allowNull: false
      },
      session_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: false
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: true
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true
      },
      monitor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      max_capacity: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      session_type: {
        type: DataTypes.ENUM(['regular', 'special', 'makeup', 'canceled']),
        defaultValue: 'regular'
      },
      session_notes: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      weather_conditions: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM(['scheduled', 'in_progress', 'completed', 'canceled']),
        defaultValue: 'scheduled'
      },
      attendance_taken_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      attendance_taken_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      total_enrolled: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      total_present: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      total_absent: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tenants',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    });

    // Crear índexs
    await queryInterface.addIndex('attendance_sessions', ['session_date', 'service_type']);
    await queryInterface.addIndex('attendance_sessions', ['monitor_id', 'session_date']);
    await queryInterface.addIndex('attendance_sessions', ['tenant_id', 'service_type', 'session_date']);
    await queryInterface.addIndex('attendance_sessions', ['status', 'session_date']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('attendance_sessions');
  }
};
