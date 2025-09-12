const { sequelize } = require('./config/database');
const bcrypt = require('bcrypt');

async function resetPasswords() {
  try {
    await sequelize.authenticate();
    console.log('🔗 Connexió establerta amb la base de dades\n');

    // Definir les credencials correctes que has mencionat
    const credentials = [
      { email: 'anna.garcia@email.com', password: 'familia123' },
      { email: 'admin@escola-demo.com', password: 'admin123' },
      { email: 'monitor@escola-demo.com', password: 'monitor123' },
      { email: 'admin@gestio-escolar.com', password: 'admin123' }, // Super admin
      { email: 'pere.lopez@email.com', password: 'familia123' },
      { email: 'carla.martin@email.com', password: 'familia123' }
    ];

    console.log('🔄 ACTUALITZANT PASSWORDS...\n');

    for (const cred of credentials) {
      try {
        // Encriptar la password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(cred.password, saltRounds);

        // Actualitzar a la base de dades
        const result = await sequelize.query(
          'UPDATE Users SET password = ? WHERE email = ?',
          {
            replacements: [hashedPassword, cred.email],
            type: sequelize.QueryTypes.UPDATE
          }
        );

        // Verificar si s'ha actualitzat
        const [user] = await sequelize.query(
          'SELECT email FROM Users WHERE email = ?',
          {
            replacements: [cred.email],
            type: sequelize.QueryTypes.SELECT
          }
        );

        if (user) {
          console.log('✅', cred.email, '- Password actualitzada a:', cred.password);
        } else {
          console.log('❌', cred.email, '- Usuari no trobat');
        }
      } catch (error) {
        console.log('❌ Error actualitzant', cred.email + ':', error.message);
      }
    }

    console.log('\n🎯 CREDENCIALS FINALS:');
    console.log('======================');
    console.log('👥 Família Anna: anna.garcia@email.com / familia123');
    console.log('🏢 Admin Centre: admin@escola-demo.com / admin123');
    console.log('👀 Monitor: monitor@escola-demo.com / monitor123');
    console.log('⚡ Super Admin: admin@gestio-escolar.com / admin123');
    console.log('👥 Altres famílies: pere.lopez@email.com, carla.martin@email.com / familia123');
    console.log('\n✅ Ara ja pots fer login amb aquestes credencials!');

  } catch (error) {
    console.error('❌ Error general:', error.message);
  } finally {
    await sequelize.close();
  }
}

resetPasswords();
