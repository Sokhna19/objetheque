import { render, screen } from '@testing-library/react'

import Page from '../page'

describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', {
      name: /to get started, edit the page\.tsx file/i,
    })

    expect(heading).toBeInTheDocument()
  })
})