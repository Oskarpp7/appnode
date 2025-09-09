const { verifyToken, extractTokenFromHeader } = require('../config/jwt');
const User = require('../models/User');
const Tenant = require('../models/Tenant');

/**
 * Middleware per verificar l'autenticació JWT
 */
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token d\'accés requerit'
      });
    }

    const decoded = verifyToken(token);
    
    // Verificar que l'usuari existeix i està actiu
    const user = await User.findOne({
      where: {
        id: decoded.userId,
        active: true
      },
      include: [{
        model: Tenant,
        as: 'tenant',
        where: { status: 'active' }
      }]
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuari no trobat o inactiu'
      });
    }

    // Actualitzar last_login
    await user.update({ last_login: new Date() });

    // Afegir informació de l'usuari al request
    req.user = user.toSafeObject();
    req.tenant = user.tenant;
    req.tenantId = user.tenant_id;

    next();
  } catch (error) {
    console.error('❌ Authentication error:', error);
    
    if (error.message === 'Token invalid or expired') {
      return res.status(401).json({
        success: false,
        message: 'Token expirat o invàlid'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error de verificació d\'autenticació'
    });
  }
};

/**
 * Middleware opcional per autenticació (no falla si no hi ha token)
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (token) {
      const decoded = verifyToken(token);
      const user = await User.findOne({
        where: {
          id: decoded.userId,
          active: true
        },
        include: [{
          model: Tenant,
          as: 'tenant',
          where: { status: 'active' }
        }]
      });

      if (user) {
        req.user = user.toSafeObject();
        req.tenant = user.tenant;
        req.tenantId = user.tenant_id;
      }
    }

    next();
  } catch (error) {
    // En cas d'error, continuem sense autenticació
    next();
  }
};

module.exports = {
  authenticateToken,
  optionalAuth
};
