const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear the database
  await prisma.borrowing.deleteMany({});
  await prisma.object.deleteMany({});
  await prisma.userRole.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.role.deleteMany({});

  // Create a sample user if not exists
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password', // In real app, hash it
    },
  });

  // Sample objects with categories and subcategories
  const objects = [
    {
      name: 'Échelle en aluminium',
      description: 'Une échelle pour atteindre les hauteurs',
      category: 'Travaux / Bricolage',
      subCategory: 'Echelles / Escabeaux',
      status: 'available',
      ownerId: user.id,
    },
    {
      name: 'Boîte à outils',
      description: 'Outils variés pour le bricolage',
      category: 'Travaux / Bricolage',
      subCategory: 'Outils manuels',
      status: 'available',
      ownerId: user.id,
    },
    {
      name: 'Projecteur',
      description: 'Pour projections',
      category: 'Équipements électriques',
      subCategory: 'Projecteurs',
      status: 'available',
      ownerId: user.id,
    },
    {
      name: 'Ponceuse',
      description: 'Pour poncer les surfaces',
      category: 'Travaux / Bricolage',
      subCategory: 'Ponceuses / Rabots / Défonceuses / Accessoires',
      status: 'available',
      ownerId: user.id,
    },
  ];

  for (const obj of objects) {
    await prisma.object.create({ data: obj });
  }

  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });