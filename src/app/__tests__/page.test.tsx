import { render, screen } from '@testing-library/react'

import Page from '../page'

describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', {
      name: /bienvenue dans la bibliothèque d'objets/i,
    })

    expect(heading).toBeInTheDocument()
  })
})