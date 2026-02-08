import { render, screen } from '@testing-library/react'

import Objects from '../page'

// Mock prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    object: {
      findMany: jest.fn().mockResolvedValue([]),
      groupBy: jest.fn().mockResolvedValue([]),
      count: jest.fn().mockResolvedValue(0),
    },
  },
}));

describe('Objects', () => {
  it('renders a heading', async () => {
    render(await Objects({ searchParams: Promise.resolve({}) }))

    const heading = screen.getByRole('heading', {
      name: /objects/i,
    })

    expect(heading).toBeInTheDocument()
  })
})