const Tenant = require('./Tenant');
const User = require('./User');
const Student = require('./Student');
const StudentFamily = require('./StudentFamily');
const PersonaAutoritzada = require('./PersonaAutoritzada');
const StudentDocument = require('./StudentDocument');
const StudentMedical = require('./StudentMedical');
const ServiceEnrollment = require('./ServiceEnrollment');
const AttendanceSession = require('./AttendanceSession');
const ServiceAttendance = require('./ServiceAttendance');

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

// Associacions PersonaAutoritzada
Student.hasMany(PersonaAutoritzada, {
  foreignKey: 'student_id',
  as: 'personesAutoritzades',
  onDelete: 'CASCADE'
});

PersonaAutoritzada.belongsTo(Student, {
  foreignKey: 'student_id',
  as: 'student'
});

PersonaAutoritzada.belongsTo(Tenant, {
  foreignKey: 'tenant_id',
  as: 'tenant'
});

// Associacions StudentDocument
Student.hasMany(StudentDocument, {
  foreignKey: 'student_id',
  as: 'documents',
  onDelete: 'CASCADE'
});

StudentDocument.belongsTo(Student, {
  foreignKey: 'student_id',
  as: 'student'
});

StudentDocument.belongsTo(Tenant, {
  foreignKey: 'tenant_id',
  as: 'tenant'
});

StudentDocument.belongsTo(User, {
  foreignKey: 'uploaded_by',
  as: 'uploader'
});

StudentDocument.belongsTo(User, {
  foreignKey: 'verificat_per',
  as: 'verifier'
});

// Associacions StudentMedical (1:1)
Student.hasOne(StudentMedical, {
  foreignKey: 'student_id',
  as: 'medicalInfo',
  onDelete: 'CASCADE'
});

StudentMedical.belongsTo(Student, {
  foreignKey: 'student_id',
  as: 'student'
});

StudentMedical.belongsTo(Tenant, {
  foreignKey: 'tenant_id',
  as: 'tenant'
});

StudentMedical.belongsTo(User, {
  foreignKey: 'revisio_per',
  as: 'reviewer'
});

// Associacions per al sistema d'assistència

// Student - ServiceEnrollment (un estudiant pot tenir múltiples inscripcions)
Student.hasMany(ServiceEnrollment, {
  foreignKey: 'student_id',
  as: 'serviceEnrollments',
  onDelete: 'CASCADE'
});

ServiceEnrollment.belongsTo(Student, {
  foreignKey: 'student_id',
  as: 'student'
});

// Tenant - ServiceEnrollment
Tenant.hasMany(ServiceEnrollment, {
  foreignKey: 'tenant_id',
  as: 'serviceEnrollments',
  onDelete: 'CASCADE'
});

ServiceEnrollment.belongsTo(Tenant, {
  foreignKey: 'tenant_id',
  as: 'tenant'
});

// User - ServiceEnrollment (qui va crear la inscripció)
User.hasMany(ServiceEnrollment, {
  foreignKey: 'created_by',
  as: 'createdEnrollments'
});

ServiceEnrollment.belongsTo(User, {
  foreignKey: 'created_by',
  as: 'creator'
});

// AttendanceSession - ServiceAttendance (una sessió té múltiples assistències)
AttendanceSession.hasMany(ServiceAttendance, {
  foreignKey: 'session_id',
  as: 'attendances',
  onDelete: 'CASCADE'
});

ServiceAttendance.belongsTo(AttendanceSession, {
  foreignKey: 'session_id',
  as: 'session'
});

// ServiceEnrollment - ServiceAttendance (una inscripció pot tenir múltiples assistències)
ServiceEnrollment.hasMany(ServiceAttendance, {
  foreignKey: 'enrollment_id',
  as: 'attendances',
  onDelete: 'CASCADE'
});

ServiceAttendance.belongsTo(ServiceEnrollment, {
  foreignKey: 'enrollment_id',
  as: 'enrollment'
});

// Student - ServiceAttendance (un estudiant pot tenir múltiples assistències)
Student.hasMany(ServiceAttendance, {
  foreignKey: 'student_id',
  as: 'attendances',
  onDelete: 'CASCADE'
});

ServiceAttendance.belongsTo(Student, {
  foreignKey: 'student_id',
  as: 'student'
});

// User - AttendanceSession (monitor de la sessió)
User.hasMany(AttendanceSession, {
  foreignKey: 'monitor_id',
  as: 'monitoredSessions'
});

AttendanceSession.belongsTo(User, {
  foreignKey: 'monitor_id',
  as: 'monitor'
});

// User - AttendanceSession (qui va prendre assistència)
User.hasMany(AttendanceSession, {
  foreignKey: 'attendance_taken_by',
  as: 'attendanceTakenSessions'
});

AttendanceSession.belongsTo(User, {
  foreignKey: 'attendance_taken_by',
  as: 'attendanceTaker'
});

// Tenant - AttendanceSession
Tenant.hasMany(AttendanceSession, {
  foreignKey: 'tenant_id',
  as: 'attendanceSessions',
  onDelete: 'CASCADE'
});

AttendanceSession.belongsTo(Tenant, {
  foreignKey: 'tenant_id',
  as: 'tenant'
});

// User - ServiceAttendance (check-in/check-out)
User.hasMany(ServiceAttendance, {
  foreignKey: 'checked_in_by',
  as: 'checkedInAttendances'
});

ServiceAttendance.belongsTo(User, {
  foreignKey: 'checked_in_by',
  as: 'checkedInBy'
});

User.hasMany(ServiceAttendance, {
  foreignKey: 'checked_out_by',
  as: 'checkedOutAttendances'
});

ServiceAttendance.belongsTo(User, {
  foreignKey: 'checked_out_by',
  as: 'checkedOutBy'
});

// PersonaAutoritzada - ServiceAttendance (persona que recull l'estudiant)
PersonaAutoritzada.hasMany(ServiceAttendance, {
  foreignKey: 'pickup_person_id',
  as: 'pickupAttendances'
});

ServiceAttendance.belongsTo(PersonaAutoritzada, {
  foreignKey: 'pickup_person_id',
  as: 'pickupPerson'
});

// Tenant - ServiceAttendance
Tenant.hasMany(ServiceAttendance, {
  foreignKey: 'tenant_id',
  as: 'serviceAttendances',
  onDelete: 'CASCADE'
});

ServiceAttendance.belongsTo(Tenant, {
  foreignKey: 'tenant_id',
  as: 'tenant'
});

module.exports = {
  Tenant,
  User,
  Student,
  StudentFamily,
  PersonaAutoritzada,
  StudentDocument,
  StudentMedical,
  ServiceEnrollment,
  AttendanceSession,
  ServiceAttendance
};
