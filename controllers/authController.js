const { generateToken } = require('../config/jwt');
const { User, Tenant } = require('../models');
const Joi = require('joi');

// Esquemes de validació
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Format d\'email invàlid',
    'any.required': 'Email és obligatori'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'La contrasenya ha de tenir mínim 6 caràcters',
    'any.required': 'Contrasenya és obligatòria'
  }),
  tenant_slug: Joi.string().optional().messages({
    'string.base': 'Codi del centre ha de ser text'
  })
});

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'El nom ha de tenir mínim 2 caràcters',
    'string.max': 'El nom no pot superar els 100 caràcters',
    'any.required': 'Nom és obligatori'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Format d\'email invàlid',
    'any.required': 'Email és obligatori'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'La contrasenya ha de tenir mínim 6 caràcters',
    'any.required': 'Contrasenya és obligatòria'
  }),
  tenant_slug: Joi.string().required().messages({
    'any.required': 'Codi del centre és obligatori'
  }),
  phone: Joi.string().optional().allow('').messages({
    'string.base': 'El telèfon ha de ser text'
  })
});

/**
 * Login d'usuari
 */
const login = async (req, res) => {
  try {
    // Validar input
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Dades invàlides',
        errors: error.details.map(detail => detail.message)
      });
    }

    const { email, password, tenant_slug } = value;

    // Buscar usuari amb el tenant
    let whereClause = { email, active: true };
    let tenantWhere = { status: 'active' };

    if (tenant_slug) {
      tenantWhere.slug = tenant_slug;
    }

    const user = await User.findOne({
      where: whereClause,
      include: [{
        model: Tenant,
        as: 'tenant',
        where: tenantWhere
      }]
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credencials invàlides o centre educatiu no trobat'
      });
    }

    // Verificar contrasenya
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credencials invàlides'
      });
    }

    // Generar token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      tenant_id: user.tenant_id
    });

    // Actualitzar last_login
    await user.update({ last_login: new Date() });

    // Resposta d'èxit
    res.json({
      success: true,
      message: 'Login exitós',
      data: {
        token,
        user: user.toSafeObject(),
        tenant: {
          id: user.tenant.id,
          name: user.tenant.name,
          slug: user.tenant.slug,
          settings: user.tenant.settings
        }
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error intern del servidor'
    });
  }
};

/**
 * Registre d'usuari (només famílies per defecte)
 */
const register = async (req, res) => {
  try {
    // Validar input
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Dades invàlides',
        errors: error.details.map(detail => detail.message)
      });
    }

    const { name, email, password, tenant_slug, phone } = value;

    // Verificar que el tenant existeix
    const tenant = await Tenant.findOne({
      where: { slug: tenant_slug, status: 'active' }
    });

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: 'Centre educatiu no trobat'
      });
    }

    // Verificar que l'email no existeix per aquest tenant
    const existingUser = await User.findOne({
      where: { email, tenant_id: tenant.id }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Aquest email ja està registrat en aquest centre'
      });
    }

    // Crear nou usuari
    const newUser = await User.create({
      name,
      email,
      password,
      tenant_id: tenant.id,
      role: 'FAMILIA', // Per defecte, nous usuaris són famílies
      phone: phone || null
    });

    // Generar token
    const token = generateToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      tenant_id: newUser.tenant_id
    });

    // Resposta d'èxit
    res.status(201).json({
      success: true,
      message: 'Usuari registrat correctament',
      data: {
        token,
        user: newUser.toSafeObject(),
        tenant: {
          id: tenant.id,
          name: tenant.name,
          slug: tenant.slug,
          settings: tenant.settings
        }
      }
    });

  } catch (error) {
    console.error('❌ Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Error intern del servidor'
    });
  }
};

/**
 * Obtenir informació de l'usuari actual
 */
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{
        model: Tenant,
        as: 'tenant',
        attributes: ['id', 'name', 'slug', 'settings']
      }]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuari no trobat'
      });
    }

    res.json({
      success: true,
      data: {
        user: user.toSafeObject(),
        tenant: user.tenant
      }
    });

  } catch (error) {
    console.error('❌ Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error obtenint informació de l\'usuari'
    });
  }
};

/**
 * Logout (invalidar token - client side)
 */
const logout = async (req, res) => {
  // El logout es fa principalment al client eliminant el token
  // Aquí podem implementar lògica addicional si cal (blacklist, etc.)
  
  res.json({
    success: true,
    message: 'Logout exitós'
  });
};

/**
 * Refresh token
 */
const refreshToken = async (req, res) => {
  try {
    // El token actual ja és vàlid (passat pel middleware d'autenticació)
    const user = req.user;

    // Generar nou token
    const newToken = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      tenant_id: user.tenant_id
    });

    res.json({
      success: true,
      message: 'Token renovat correctament',
      data: {
        token: newToken
      }
    });

  } catch (error) {
    console.error('❌ Refresh token error:', error);
    res.status(500).json({
      success: false,
      message: 'Error renovant token'
    });
  }
};

// Endpoint per verificar l'usuari actual (middleware de verificació de token)
const me = async (req, res) => {
  try {
    // L'usuari ja està disponible gràcies al middleware d'autenticació
    const user = await User.findByPk(req.user.id, {
      where: { tenant_id: req.user.tenant_id },
      attributes: ['id', 'name', 'email', 'role', 'phone', 'profile_data', 'last_login']
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuari no trobat'
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          profile_data: user.profile_data,
          last_login: user.last_login
        }
      },
      message: 'Usuari verificat correctament'
    });
  } catch (error) {
    console.error('Error verificant usuari:', error);
    res.status(500).json({
      success: false,
      message: 'Error intern del servidor'
    });
  }
};

module.exports = {
  login,
  register,
  getCurrentUser,
  logout,
  refreshToken,
  me
};
