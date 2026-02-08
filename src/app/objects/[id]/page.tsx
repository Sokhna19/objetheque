import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AvailabilityCalendar from '@/components/Calendar';
import BorrowForm from '@/components/BorrowForm';
import { createBorrowing } from '@/actions';

interface ObjectDetailPageProps {
  params: Promise<{ id: string }>;
}

interface ObjectWithDetails {
  id: string;
  number: number | null;
  name: string;
  description: string | null;
  category: string | null;
  subCategory: string | null;
  shelf: string | null;
  isToGive: boolean;
  isRequestedMissing: boolean;
  status: string;
  owner: {
    id: string;
    email: string;
    name: string | null;
  };
  borrowings: {
    id: string;
    startDate: Date;
    endDate: Date | null;
    status: string;
    user: {
      id: string;
      name: string | null;
      email: string;
    };
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export default async function ObjectDetail({ params }: ObjectDetailPageProps) {
  const { id } = await params;

  const object = await prisma.object.findUnique({
    where: { id },
    include: {
      owner: true,
      borrowings: {
        include: { user: true },
        orderBy: { startDate: 'desc' },
      },
    },
  }) as ObjectWithDetails | null;

  if (!object) {
    notFound();
  }

  // Compute booked dates for calendar
  const bookedDates: Date[] = [];
  for (const borrowing of object.borrowings) {
    if (borrowing.status === 'active') {
      const start = new Date(borrowing.startDate);
      const end = borrowing.endDate ? new Date(borrowing.endDate) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year from now if ongoing
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        bookedDates.push(new Date(d));
      }
    }
  }

  // TODO: Implement role-based access control
  // For now, show all info; later hide sensitive data for non-volunteers
  const isVolunteer = true; // Placeholder: set to true to show volunteer view

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <Link href="/objects" className="text-blue-500 hover:underline">
            ← Retour aux objets
          </Link>
        </nav>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded shadow">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
                {object.name}{object.number ? ` (${object.number})` : ''}
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                Catégorie: {object.category || 'Non spécifiée'} {object.subCategory && `> ${object.subCategory}`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-500">Statut: {object.status}</p>
              {object.isToGive && (
                <div className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold mt-2">
                  À donner
                </div>
              )}
              {object.isRequestedMissing && (
                <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold mt-2">
                  Objet recherché
                </div>
              )}
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded mb-6 flex items-center justify-center">
            <span className="text-gray-500">Photo à venir</span>
          </div>

          {/* Availability Calendar */}
          {!object.isRequestedMissing && <AvailabilityCalendar bookedDates={bookedDates} />}

          {/* Description */}
          {object.description && (
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2">Description</h2>
              <p className="text-zinc-700 dark:text-zinc-300">{object.description}</p>
            </div>
          )}

          {/* Owner Info */}
          {!object.isRequestedMissing && (
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2">Propriétaire</h2>
              <p className="text-zinc-700 dark:text-zinc-300">
                {object.owner.name || 'Nom non spécifié'}
                {isVolunteer && ` (Contact: ${object.owner.email})`}
              </p>
              {isVolunteer && object.owner.name === 'Ker Logettes' && object.shelf && (
                <p className="text-zinc-700 dark:text-zinc-300 mt-2">
                  Lieu de rangement: Étage {object.shelf}
                </p>
              )}
            </div>
          )}

          {/* Borrow Form */}
          {object.status === 'available' && (
            <BorrowForm objectId={object.id} />
          )}

          {/* Borrowing History */}
          {isVolunteer && object.borrowings.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2">Historique des emprunts</h2>
              <ul className="space-y-2">
                {object.borrowings.map((borrowing) => (
                  <li key={borrowing.id} className="bg-zinc-100 dark:bg-zinc-700 p-3 rounded">
                    <p>Utilisateur: {borrowing.user.name || borrowing.user.email}</p>
                    <p>Début: {borrowing.startDate.toLocaleDateString('fr-FR')}</p>
                    <p>Fin: {borrowing.endDate ? borrowing.endDate.toLocaleDateString('fr-FR') : 'En cours'}</p>
                    <p>Statut: {borrowing.status}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Metadata */}
          <div className="text-sm text-zinc-500">
            <p>Créé le: {object.createdAt.toLocaleDateString('fr-FR')}</p>
            <p>Dernière mise à jour: {object.updatedAt.toLocaleDateString('fr-FR')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}