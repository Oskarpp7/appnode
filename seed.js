const { Tenant, User, Student, StudentFamily } = require('./models');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  try {
    console.log('🌱 Iniciant seed de la base de dades...');

    // Crear tenant de prova
    const demoTenant = await Tenant.create({
      name: 'Escola Europa Demo',
      slug: 'escola-demo',
      domain: 'demo.gestio-escolar.com',
      settings: {
        pricing_config: {
          menjador: { price_per_day: 5.50, monthly_discount: 10 },
          acollida: { price_per_day: 3.00, monthly_discount: 15 },
          extraescolar: { price_per_day: 8.00, monthly_discount: 5 }
        },
        services: ['menjador', 'acollida', 'extraescolars'],
        branding: {
          logo: null,
          primary_color: '#3B82F6',
          secondary_color: '#EF4444'
        },
        contact: {
          email: 'info@escola-demo.com',
          phone: '934567890',
          address: 'Carrer de la Escola, 123, 08001 Barcelona'
        }
      },
      status: 'active',
      subscription_plan: 'premium'
    });

    console.log('✅ Tenant creat:', demoTenant.name);

    // Crear usuaris de prova
    const users = await Promise.all([
      // Super Admin
      User.create({
        name: 'Super Admin',
        email: 'admin@gestio-escolar.com',
        password: 'admin123',
        role: 'SUPER_ADMIN',
        tenant_id: demoTenant.id,
        phone: '600123456'
      }),

      // Admin del Centre
      User.create({
        name: 'Maria Administradora',
        email: 'admin@escola-demo.com',
        password: 'admin123',
        role: 'ADMIN_CENTRE',
        tenant_id: demoTenant.id,
        phone: '934567891'
      }),

      // Monitor
      User.create({
        name: 'Joan Monitor',
        email: 'monitor@escola-demo.com',
        password: 'monitor123',
        role: 'MONITOR',
        tenant_id: demoTenant.id,
        phone: '600987654'
      }),

      // Famílies
      User.create({
        name: 'Anna García',
        email: 'anna.garcia@email.com',
        password: 'familia123',
        role: 'FAMILIA',
        tenant_id: demoTenant.id,
        phone: '666111222'
      }),

      User.create({
        name: 'Pere López',
        email: 'pere.lopez@email.com',
        password: 'familia123',
        role: 'FAMILIA',
        tenant_id: demoTenant.id,
        phone: '666333444'
      }),

      User.create({
        name: 'Carla Martín',
        email: 'carla.martin@email.com',
        password: 'familia123',
        role: 'FAMILIA',
        tenant_id: demoTenant.id,
        phone: '666555666'
      })
    ]);

    console.log('✅ Usuaris creats:', users.length);
    
    // DEBUG: Verificar que els usuaris s'han creat correctament
    console.log('🔍 DEBUG: Verificant usuaris creats...');
    for (const user of users) {
      console.log(`   - ${user.name} (${user.email}) - Tenant: ${user.tenant_id}`);
    }

    // Crear estudiants de prova
    const students = await Promise.all([
      Student.create({
        first_name: 'Marc',
        last_name: 'García',
        birth_date: '2015-03-15',
        class_group: '3r Primària',
        tenant_id: demoTenant.id,
        medical_info: {
          allergies: ['fruits secs'],
          dietary_restrictions: [],
          special_needs: null
        }
      }),

      Student.create({
        first_name: 'Laura',
        last_name: 'García',
        birth_date: '2017-09-22',
        class_group: '1r Primària',
        tenant_id: demoTenant.id,
        medical_info: {
          allergies: [],
          dietary_restrictions: ['vegetariana'],
          special_needs: null
        }
      }),

      Student.create({
        first_name: 'David',
        last_name: 'López',
        birth_date: '2014-11-08',
        class_group: '4t Primària',
        tenant_id: demoTenant.id,
        medical_info: {
          allergies: [],
          dietary_restrictions: [],
          special_needs: 'Dislèxia'
        }
      }),

      Student.create({
        first_name: 'Sofia',
        last_name: 'Martín',
        birth_date: '2016-06-30',
        class_group: '2n Primària',
        tenant_id: demoTenant.id,
        medical_info: {
          allergies: ['lactosa'],
          dietary_restrictions: [],
          special_needs: null
        }
      }),

      Student.create({
        first_name: 'Alex',
        last_name: 'Martín',
        birth_date: '2018-12-12',
        class_group: 'P5',
        tenant_id: demoTenant.id,
        medical_info: {
          allergies: [],
          dietary_restrictions: [],
          special_needs: null
        }
      })
    ]);

    console.log('✅ Estudiants creats:', students.length);

    // Crear relacions família-estudiant
    const familyRelations = await Promise.all([
      // Anna García (mare) - Marc i Laura García
      StudentFamily.create({
        student_id: students[0].id, // Marc
        user_id: users[3].id, // Anna García
        relationship: 'mare',
        is_primary_contact: true,
        can_pickup: true,
        emergency_contact: true
      }),

      StudentFamily.create({
        student_id: students[1].id, // Laura
        user_id: users[3].id, // Anna García
        relationship: 'mare',
        is_primary_contact: true,
        can_pickup: true,
        emergency_contact: true
      }),

      // Pere López (pare) - David López
      StudentFamily.create({
        student_id: students[2].id, // David
        user_id: users[4].id, // Pere López
        relationship: 'pare',
        is_primary_contact: true,
        can_pickup: true,
        emergency_contact: true
      }),

      // Carla Martín (mare) - Sofia i Alex Martín
      StudentFamily.create({
        student_id: students[3].id, // Sofia
        user_id: users[5].id, // Carla Martín
        relationship: 'mare',
        is_primary_contact: true,
        can_pickup: true,
        emergency_contact: true
      }),

      StudentFamily.create({
        student_id: students[4].id, // Alex
        user_id: users[5].id, // Carla Martín
        relationship: 'mare',
        is_primary_contact: true,
        can_pickup: true,
        emergency_contact: true
      })
    ]);

    console.log('✅ Relacions família-estudiant creades:', familyRelations.length);

    console.log('🎉 Seed completat amb èxit!');
    console.log('');
    console.log('👥 USUARIS DE PROVA:');
    console.log('');
    console.log('🔑 Super Admin:');
    console.log('   Email: admin@gestio-escolar.com');
    console.log('   Password: admin123');
    console.log('');
    console.log('🏫 Admin del Centre:');
    console.log('   Email: admin@escola-demo.com');
    console.log('   Password: admin123');
    console.log('');
    console.log('👨‍🏫 Monitor:');
    console.log('   Email: monitor@escola-demo.com');
    console.log('   Password: monitor123');
    console.log('');
    console.log('👪 Famílies:');
    console.log('   Email: anna.garcia@email.com (2 fills: Marc i Laura)');
    console.log('   Email: pere.lopez@email.com (1 fill: David)');
    console.log('   Email: carla.martin@email.com (2 fills: Sofia i Alex)');
    console.log('   Password per totes: familia123');
    console.log('');
    console.log('🏫 Centre: escola-demo');

  } catch (error) {
    console.error('❌ Error fent seed:', error);
    throw error;
  }
};

module.exports = seedDatabase;

// Executar seed si el fitxer s'executa directament
if (require.main === module) {
  const { syncDatabase } = require('./models');
  
  const runSeed = async () => {
    try {
      await syncDatabase({ force: true }); // Reset database
      await seedDatabase();
      process.exit(0);
    } catch (error) {
      console.error('❌ Error executant seed:', error);
      process.exit(1);
    }
  };

  runSeed();
}
