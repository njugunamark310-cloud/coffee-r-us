
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Admin from './Admin'
import useProducts from '../hooks/useProducts'

vi.mock('../hooks/useProducts', () => ({
  default: vi.fn(),
}))

describe('Admin page', () => {
  const addProduct = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    useProducts.mockReturnValue({
      products: [],
      loading: false,
      error: '',
      addProduct,
    })
  })

  it('displays the product administration form', () => {
    render(<Admin />)

    expect(screen.getByText('Product Administration')).toBeInTheDocument()
    expect(screen.getByLabelText('Coffee Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getByLabelText('Origin')).toBeInTheDocument()
    expect(screen.getByLabelText('Price (KSh)')).toBeInTheDocument()
    expect(screen.getByLabelText('Location')).toBeInTheDocument()
  })

  it('submits a new product to the backend', async () => {
    const user = userEvent.setup()
    addProduct.mockResolvedValue({})

    render(<Admin />)

    await user.type(screen.getByLabelText('Coffee Name'), 'Rwanda Bourbon')
    await user.type(screen.getByLabelText('Description'), 'Smooth coffee')
    await user.type(screen.getByLabelText('Origin'), 'Rwanda')
    await user.type(screen.getByLabelText('Price (KSh)'), '1800')
    await user.selectOptions(screen.getByLabelText('Location'), 'Brazil')

    await user.click(
      screen.getByRole('button', { name: 'Add Coffee Product' })
    )

    await waitFor(() => {
      expect(addProduct).toHaveBeenCalledWith({
        name: 'Rwanda Bourbon',
        description: 'Smooth coffee',
        origin: 'Rwanda',
        price: 1800,
        location: 'Brazil',
      })
    })
  })
})

