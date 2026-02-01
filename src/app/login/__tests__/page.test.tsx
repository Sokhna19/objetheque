import { render, screen } from '@testing-library/react'

import Login from '../page'

describe('Login', () => {
  it('renders a heading', () => {
    render(<Login />)

    const heading = screen.getByRole('heading', {
      name: /login/i,
    })

    expect(heading).toBeInTheDocument()
  })
})