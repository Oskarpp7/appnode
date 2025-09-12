const { sequelize } = require('./config/database');
const bcrypt = require('bcrypt');

async function createUsers() {
  try {
    await sequelize.authenticate();
    console.log('🔗 Connexió establerta amb la base de dades');
    
    // Primer, verificar si ja hi ha usuaris
    const existingUsers = await sequelize.query('SELECT COUNT(*) as count FROM users', { 
      type: sequelize.QueryTypes.SELECT 
    });
    
    if (existingUsers[0].count > 0) {
      console.log('⚠️  Ja hi ha usuaris a la base de dades. Eliminant...');
      await sequelize.query('DELETE FROM users', { type: sequelize.QueryTypes.DELETE });
    }
    
    // Hash per al password "password123"
    const passwordHash = await bcrypt.hash('password123', 10);
    
    // Obtenir el tenant ID
    const tenants = await sequelize.query('SELECT id FROM tenants WHERE slug = "escola-demo" LIMIT 1', { 
      type: sequelize.QueryTypes.SELECT 
    });
    
    if (tenants.length === 0) {
      console.log('❌ No s\'ha trobat el tenant "escola-demo"');
      return;
    }
    
    const tenantId = tenants[0].id;
    console.log('🏢 Tenant ID trobat:', tenantId);
    
    // Crear usuaris directament amb SQL
    const users = [
      {
        name: 'Super Admin',
        email: 'admin@gestioescolar.com',
        password: passwordHash,
        role: 'SUPER_ADMIN',
        tenant_id: tenantId,
        active: 1
      },
      {
        name: 'Admin Centre',
        email: 'admin@edutech.com',
        password: passwordHash,
        role: 'ADMIN_CENTRE',
        tenant_id: tenantId,
        active: 1
      },
      {
        name: 'Coordinador',
        email: 'coordinador@edutech.com',
        password: passwordHash,
        role: 'COORDINADOR',
        tenant_id: tenantId,
        active: 1
      },
      {
        name: 'Monitor',
        email: 'monitor@edutech.com',
        password: passwordHash,
        role: 'MONITOR',
        tenant_id: tenantId,
        active: 1
      },
      {
        name: 'Família Test',
        email: 'familia@edutech.com',
        password: passwordHash,
        role: 'FAMILIA',
        tenant_id: tenantId,
        active: 1
      }
    ];
    
    for (const user of users) {
      await sequelize.query(`
        INSERT INTO users (name, email, password, role, tenant_id, active, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      `, {
        replacements: [user.name, user.email, user.password, user.role, user.tenant_id, user.active],
        type: sequelize.QueryTypes.INSERT
      });
      
      console.log('✅ Usuari creat:', user.email, '-', user.role);
    }
    
    console.log('\n🎉 USUARIS CREATS CORRECTAMENT!');
    console.log('=====================================');
    console.log('Tots els usuaris tenen el password: password123');
    console.log('');
    console.log('📧 EMAILS PER FER LOGIN:');
    users.forEach(user => {
      console.log(`   - ${user.email} (${user.role})`);
    });
    console.log('');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sequelize.close();
  }
}

createUsers();
