const Tenant = require('./Tenant');
const User = require('./User');
const Student = require('./Student');
const StudentFamily = require('./StudentFamily');

// Definir les associacions entre models

// Tenant - Users (un tenant té molts usuaris)
Tenant.hasMany(User, {
  foreignKey: 'tenant_id',
  as: 'users',
  onDelete: 'CASCADE'
});

User.belongsTo(Tenant, {
  foreignKey: 'tenant_id',
  as: 'tenant'
});

// Tenant - Students (un tenant té molts estudiants)
Tenant.hasMany(Student, {
  foreignKey: 'tenant_id',
  as: 'students',
  onDelete: 'CASCADE'
});

Student.belongsTo(Tenant, {
  foreignKey: 'tenant_id',
  as: 'tenant'
});

// User - Students (relació many-to-many a través de StudentFamily)
User.belongsToMany(Student, {
  through: StudentFamily,
  foreignKey: 'user_id',
  otherKey: 'student_id',
  as: 'children'
});

Student.belongsToMany(User, {
  through: StudentFamily,
  foreignKey: 'student_id',
  otherKey: 'user_id',
  as: 'families'
});

// Associacions directes amb StudentFamily per accés detallat
User.hasMany(StudentFamily, {
  foreignKey: 'user_id',
  as: 'studentRelationships'
});

Student.hasMany(StudentFamily, {
  foreignKey: 'student_id',
  as: 'familyRelationships'
});

StudentFamily.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'family'
});

StudentFamily.belongsTo(Student, {
  foreignKey: 'student_id',
  as: 'student'
});

module.exports = {
  Tenant,
  User,
  Student,
  StudentFamily
};
