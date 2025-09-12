const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear taula service_attendance
    await queryInterface.createTable('service_attendance', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      session_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'attendance_sessions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      enrollment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'service_enrollments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      attendance_status: {
        type: DataTypes.ENUM(['present', 'absent', 'late', 'excused', 'sick', 'early_departure']),
        allowNull: false
      },
      check_in_time: {
        type: DataTypes.TIME,
        allowNull: true
      },
      check_out_time: {
        type: DataTypes.TIME,
        allowNull: true
      },
      checked_in_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      checked_out_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      pickup_person_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'persones_autoritzades',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      pickup_person_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      pickup_person_dni: {
        type: DataTypes.STRING,
        allowNull: true
      },
      meal_taken: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      meal_type: {
        type: DataTypes.STRING,
        allowNull: true
      },
      behavior_notes: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      incident_report: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      medical_incident: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      medical_notes: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      parent_notification_sent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      parent_notification_time: {
        type: DataTypes.DATE,
        allowNull: true
      },
      photos_taken: {
        type: DataTypes.JSON,
        allowNull: true
      },
      activity_participation: {
        type: DataTypes.JSON,
        allowNull: true
      },
      mood_rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1,
          max: 5
        }
      },
      special_notes: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      sync_status: {
        type: DataTypes.ENUM(['synced', 'pending', 'error']),
        defaultValue: 'pending'
      },
      last_sync_at: {
        type: DataTypes.DATE,
        allowNull: true
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
    await queryInterface.addIndex('service_attendance', ['session_id', 'student_id']);
    await queryInterface.addIndex('service_attendance', ['enrollment_id', 'session_id']);
    await queryInterface.addIndex('service_attendance', ['student_id', 'attendance_status']);
    await queryInterface.addIndex('service_attendance', ['tenant_id', 'session_id']);
    await queryInterface.addIndex('service_attendance', ['sync_status', 'last_sync_at']);
    
    // Índex únic per assegurar que un estudiant només tingui una assistència per sessió
    await queryInterface.addIndex('service_attendance', {
      fields: ['session_id', 'student_id'],
      unique: true,
      name: 'unique_session_student_attendance'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('service_attendance');
  }
};
