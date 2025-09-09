/**
 * Middleware per garantir l'aïllament multi-tenant
 * Injecta automàticament el tenant_id a totes les queries
 */

const tenantIsolation = (req, res, next) => {
  // Verificar que tenim informació del tenant
  if (!req.tenantId && req.user) {
    return res.status(403).json({
      success: false,
      message: 'Informació del centre educatiu no disponible'
    });
  }

  // Funció helper per afegir tenant_id a les queries de Sequelize
  req.addTenantFilter = (whereClause = {}) => {
    return {
      ...whereClause,
      tenant_id: req.tenantId
    };
  };

  // Funció helper per verificar que un recurs pertany al tenant actual
  req.verifyTenantResource = (resource) => {
    if (!resource) {
      throw new Error('Recurs no trobat');
    }
    
    if (resource.tenant_id !== req.tenantId) {
      throw new Error('Accés denegat: recurs no pertany al vostre centre');
    }
    
    return resource;
  };

  next();
};

/**
 * Middleware per verificar accés a un tenant específic
 * Útil per super admins que volen accedir a un tenant concret
 */
const allowTenantAccess = async (req, res, next) => {
  try {
    const requestedTenantId = req.params.tenantId || req.body.tenant_id || req.query.tenant_id;
    
    // Si no s'especifica tenant, utilitzar el de l'usuari actual
    if (!requestedTenantId) {
      return next();
    }

    // Super admins poden accedir a qualsevol tenant
    if (req.user.role === 'SUPER_ADMIN') {
      const Tenant = require('../models/Tenant');
      const tenant = await Tenant.findByPk(requestedTenantId);
      
      if (!tenant) {
        return res.status(404).json({
          success: false,
          message: 'Centre educatiu no trobat'
        });
      }

      // Sobreescriure la informació del tenant
      req.tenant = tenant;
      req.tenantId = requestedTenantId;
      
      return next();
    }

    // Per altres rols, verificar que el tenant sol·licitat coincideix amb el de l'usuari
    if (requestedTenantId !== req.tenantId) {
      return res.status(403).json({
        success: false,
        message: 'No teniu permisos per accedir a aquest centre educatiu'
      });
    }

    next();
  } catch (error) {
    console.error('❌ Tenant access error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error verificant accés al centre educatiu'
    });
  }
};

module.exports = {
  tenantIsolation,
  allowTenantAccess
};
