import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.object.findMany({
      select: { category: true },
      where: { category: { not: null } },
      distinct: ['category'],
    });
    const subCategories = await prisma.object.findMany({
      select: { subCategory: true },
      where: { subCategory: { not: null } },
      distinct: ['subCategory'],
    });
    const shelves = await prisma.object.findMany({
      select: { shelf: true },
      where: { shelf: { not: null } },
      distinct: ['shelf'],
    });
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json({
      categories: categories.map(c => c.category).filter(Boolean),
      subCategories: subCategories.map(c => c.subCategory).filter(Boolean),
      shelves: shelves.map(c => c.shelf).filter(Boolean),
      users,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne.' }, { status: 500 });
  }
}