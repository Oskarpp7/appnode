const { User, Student, StudentFamily } = require('../models');

const familyController = {
  // Obtenir els estudiants de la família autenticada
  async getMyStudents(req, res) {
    try {
      const userId = req.user.id;
      
      // Buscar estudiants relacionats amb aquest usuari família
      const studentRelations = await StudentFamily.findAll({
        where: { user_id: userId },
        include: [
          {
            model: Student,
            as: 'student',
            where: { 
              tenant_id: req.user.tenant_id,
              status: 'active' 
            }
          }
        ]
      });

      const students = studentRelations.map(relation => relation.student);

      res.json({
        success: true,
        data: students,
        message: `S'han trobat ${students.length} estudiants`
      });
    } catch (error) {
      console.error('Error obtenint estudiants de la família:', error);
      res.status(500).json({
        success: false,
        message: 'Error intern del servidor'
      });
    }
  },

  // Obtenir detalls d'un estudiant específic
  async getStudentDetails(req, res) {
    try {
      const userId = req.user.id;
      const studentId = req.params.studentId;

      // Verificar que aquest usuari té accés a aquest estudiant
      const studentRelation = await StudentFamily.findOne({
        where: { 
          user_id: userId,
          student_id: studentId 
        },
        include: [
          {
            model: Student,
            as: 'student',
            where: { 
              tenant_id: req.user.tenant_id 
            }
          }
        ]
      });

      if (!studentRelation) {
        return res.status(404).json({
          success: false,
          message: 'Estudiant no trobat o no teniu accés'
        });
      }

      const student = studentRelation.student;

      // Aquí podríem afegir més informació com assistència, menjador, etc.
      const studentDetails = {
        ...student.toJSON(),
        relationship: studentRelation.relationship,
        is_primary_contact: studentRelation.is_primary_contact,
        can_pickup: studentRelation.can_pickup,
        emergency_contact: studentRelation.emergency_contact
      };

      res.json({
        success: true,
        data: studentDetails,
        message: 'Detalls de l\'estudiant obtinguts correctament'
      });
    } catch (error) {
      console.error('Error obtenint detalls de l\'estudiant:', error);
      res.status(500).json({
        success: false,
        message: 'Error intern del servidor'
      });
    }
  },

  // Obtenir el perfil de la família
  async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        where: { tenant_id: req.user.tenant_id },
        attributes: ['id', 'name', 'email', 'phone', 'profile_data', 'created_at']
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuari no trobat'
        });
      }

      res.json({
        success: true,
        data: user,
        message: 'Perfil obtingut correctament'
      });
    } catch (error) {
      console.error('Error obtenint perfil de família:', error);
      res.status(500).json({
        success: false,
        message: 'Error intern del servidor'
      });
    }
  }
};

module.exports = familyController;
