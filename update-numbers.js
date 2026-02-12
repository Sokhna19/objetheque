const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function updateExistingObjects() {
  // Get all objects that are not requested missing and have no number
  const objectsToUpdate = await prisma.object.findMany({
    where: {
      isRequestedMissing: false,
      number: null,
    },
    orderBy: { createdAt: 'asc' }, // Order by creation date
  });

  let currentMax = await prisma.object.aggregate({
    _max: { number: true },
    where: { isRequestedMissing: false },
  });
  let nextNumber = (currentMax._max.number || 0) + 1;

  for (const obj of objectsToUpdate) {
    await prisma.object.update({
      where: { id: obj.id },
      data: { number: nextNumber++ },
    });
  }

  console.log(`Updated ${objectsToUpdate.length} objects with numbers.`);
}

updateExistingObjects()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });