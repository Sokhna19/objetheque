import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, category, subCategory, shelf, status, isToGive, isRequestedMissing, ownerType, proposerName, contactEmail } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json({ error: 'Nom est obligatoire.' }, { status: 400 });
    }

    let ownerId = '';
    if (ownerType === 'kerLogettes') {
      // Assume Ker Logettes has a fixed ID or find by name
      const kerUser = await prisma.user.findFirst({ where: { name: 'Ker Logettes' } });
      if (kerUser) {
        ownerId = kerUser.id;
      } else {
        // Create Ker Logettes user if not exists
        const newUser = await prisma.user.create({
          data: { name: 'Ker Logettes', email: 'kerlogettes@example.com' },
        });
        ownerId = newUser.id;
      }
    } else if (ownerType === 'proposer') {
      if (!proposerName) {
        return NextResponse.json({ error: 'Nom est obligatoire pour la personne qui propose.' }, { status: 400 });
      }
      // Find or create user
      let proposer = await prisma.user.findFirst({ where: { name: proposerName } });
      if (!proposer) {
        proposer = await prisma.user.create({
          data: { name: proposerName, email: contactEmail || null },
        });
      }
      ownerId = proposer.id;
    } else {
      return NextResponse.json({ error: 'Type de propriétaire invalide.' }, { status: 400 });
    }

    let number: number | null = null;
    if (!isRequestedMissing) {
      // Find max number for non-missing objects
      const maxNumberResult = await prisma.object.aggregate({
        _max: { number: true },
        where: { isRequestedMissing: false },
      });
      number = (maxNumberResult._max.number || 0) + 1;
    }

    // Create the object
    const newObject = await prisma.object.create({
      data: {
        name,
        description: description || null,
        category: category || null,
        subCategory: subCategory || null,
        shelf: shelf || null,
        status: status || 'available',
        isToGive: isToGive || false,
        isRequestedMissing: isRequestedMissing || false,
        number,
        ownerId,
      },
    });

    return NextResponse.json(newObject, { status: 201 });
  } catch (error) {
    console.error('Error creating object:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}