import { render, screen } from '@testing-library/react'

import ObjectDetail from '../page'

// Mock components
jest.mock('@/components/Calendar', () => {
  return function MockCalendar() {
    return <div>Mock Calendar</div>;
  };
});

jest.mock('@/components/BorrowForm', () => {
  return function MockBorrowForm({ objectId }: { objectId: string }) {
    return <div>Mock Borrow Form for {objectId}</div>;
  };
});

// Mock prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    object: {
      findUnique: jest.fn().mockResolvedValue({
        id: '1',
        number: 123,
        name: 'Test Object',
        description: 'A test object',
        category: 'Test Category',
        subCategory: 'Test Sub',
        shelf: 'A',
        isToGive: false,
        isRequestedMissing: false,
        status: 'available',
        owner: { id: 'owner1', email: 'owner@example.com', name: 'Ker Logettes' },
        borrowings: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    },
  },
}));

describe('ObjectDetail', () => {
  it('renders object details', async () => {
    render(await ObjectDetail({ params: Promise.resolve({ id: '1' }) }))

    expect(screen.getByText('Test Object (123)')).toBeInTheDocument()
    expect(screen.getByText('A test object')).toBeInTheDocument()
    expect(screen.getByText('Statut: available')).toBeInTheDocument()
  })
})