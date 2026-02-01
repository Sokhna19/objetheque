import { render, screen } from '@testing-library/react'

import Objects from '../page'

describe('Objects', () => {
  it('renders a heading', () => {
    render(<Objects />)

    const heading = screen.getByRole('heading', {
      name: /objects/i,
    })

    expect(heading).toBeInTheDocument()
  })
})