/**
 * Middleware per verificar rols d'usuari
 */

const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Autenticació requerida'
      });
    }

    // Super admins tenen accés a tot
    if (req.user.role === 'SUPER_ADMIN') {
      return next();
    }

    // Verificar si l'usuari té un dels rols permesos
    const userRole = req.user.role;
    const hasPermission = Array.isArray(allowedRoles) 
      ? allowedRoles.includes(userRole)
      : allowedRoles === userRole;

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: 'No teniu permisos per accedir a aquest recurs',
        required_roles: allowedRoles,
        user_role: userRole
      });
    }

    next();
  };
};

/**
 * Middleware per verificar que l'usuari pot accedir a recursos d'una família específica
 * Les famílies només poden accedir a les seves dades
 */
const requireFamilyAccess = (req, res, next) => {
  const userRole = req.user?.role;
  const userId = req.user?.id;
  const targetUserId = req.params.userId || req.params.familyId;

  // Super admins i admins del centre tenen accés complet
  if (userRole === 'SUPER_ADMIN' || userRole === 'ADMIN_CENTRE') {
    return next();
  }

  // Les famílies només poden accedir a les seves dades
  if (userRole === 'FAMILIA') {
    if (targetUserId && targetUserId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Només podeu accedir a les vostres dades familiars'
      });
    }
  }

  // Els monitors poden accedir segons els seus permisos assignats
  if (userRole === 'MONITOR') {
    // TODO: Implementar lògica de permisos específics per monitors
    // Per ara, permetre accés (es refinaran els permisos més endavant)
  }

  next();
};

/**
 * Middleware per verificar accés a dades d'un estudiant específic
 */
const requireStudentAccess = async (req, res, next) => {
  try {
    const userRole = req.user?.role;
    const userId = req.user?.id;
    const studentId = req.params.studentId;

    // Super admins i admins del centre tenen accés complet
    if (userRole === 'SUPER_ADMIN' || userRole === 'ADMIN_CENTRE') {
      return next();
    }

    // Les famílies només poden accedir als seus fills
    if (userRole === 'FAMILIA') {
      const StudentFamily = require('../models/StudentFamily');
      
      const relationship = await StudentFamily.findOne({
        where: {
          student_id: studentId,
          user_id: userId
        }
      });

      if (!relationship) {
        return res.status(403).json({
          success: false,
          message: 'No teniu permisos per accedir a les dades d\'aquest estudiant'
        });
      }
    }

    // Els monitors poden accedir segons els seus permisos
    if (userRole === 'MONITOR') {
      // TODO: Verificar que el monitor té permisos sobre aquest estudiant
      // Per ara, permetre accés
    }

    next();
  } catch (error) {
    console.error('❌ Student access verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error verificant permisos d\'accés a l\'estudiant'
    });
  }
};

module.exports = {
  requireRole,
  requireFamilyAccess,
  requireStudentAccess
};
