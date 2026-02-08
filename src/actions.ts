'use server';

import { prisma } from '@/lib/prisma';

export async function createBorrowing(formData: FormData) {
  const objectId = formData.get('objectId') as string;
  const startDateStr = formData.get('startDate') as string;
  const days = parseInt(formData.get('days') as string);

  // TODO: Get userId from session
  const userId = 'placeholder-user-id'; // Replace with actual user ID from auth

  const startDate = new Date(startDateStr);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + days);

  // Check for conflicts
  const existingBorrowings = await prisma.borrowing.findMany({
    where: {
      objectId,
      status: 'active',
      OR: [
        {
          AND: [
            { startDate: { lte: endDate } },
            { endDate: { gte: startDate } }
          ]
        },
        {
          AND: [
            { startDate: { lte: endDate } },
            { endDate: null }
          ]
        }
      ]
    }
  });

  if (existingBorrowings.length > 0) {
    throw new Error('Conflit de dates : l\'objet est déjà emprunté pendant cette période');
  }

  // Create borrowing
  await prisma.borrowing.create({
    data: {
      userId,
      objectId,
      startDate,
      endDate,
      status: 'active',
    }
  });

  // Update object status
  await prisma.object.update({
    where: { id: objectId },
    data: { status: 'borrowed' }
  });
}