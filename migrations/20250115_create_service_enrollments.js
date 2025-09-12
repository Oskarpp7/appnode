const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear taula service_enrollments
    await queryInterface.createTable('service_enrollments', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      enrollment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      days_of_week: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: '[]'
      },
      meal_requirements: {
        type: DataTypes.JSON,
        allowNull: true
      },
      pickup_authorization: {
        type: DataTypes.JSON,
        allowNull: true
      },
      emergency_contacts: {
        type: DataTypes.JSON,
        allowNull: true
      },
      special_instructions: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM(['active', 'inactive', 'suspended', 'completed']),
        defaultValue: 'active'
      },
      cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      },
      payment_status: {
        type: DataTypes.ENUM(['pending', 'paid', 'partial', 'overdue']),
        defaultValue: 'pending'
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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
    await queryInterface.addIndex('service_enrollments', ['student_id', 'service_type', 'start_date']);
    await queryInterface.addIndex('service_enrollments', ['tenant_id', 'service_type', 'status']);
    await queryInterface.addIndex('service_enrollments', ['start_date', 'end_date']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('service_enrollments');
  }
};
