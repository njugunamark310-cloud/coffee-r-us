
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Shop from './Shop'
import useProducts from '../hooks/useProducts'

vi.mock('../hooks/useProducts', () => ({
  default: vi.fn(),
}))

const products = [
  {
    id: '1',
    name: 'Kenyan AA Coffee',
    description: 'Rich aroma',
    origin: 'Nyeri, Kenya',
    price: 1200,
    location: 'Kenya',
  },
  {
    id: '2',
    name: 'Ethiopian Yirgacheffe',
    description: 'Floral fragrance',
    origin: 'Yirgacheffe, Ethiopia',
    price: 1500,
    location: 'Ethiopia',
  },
]

describe('Shop page', () => {
  const updateProduct = vi.fn()
  const deleteProduct = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    useProducts.mockReturnValue({
      products,
      loading: false,
      error: '',
      updateProduct,
      deleteProduct,
    })
  })

  it('displays products from the backend', () => {
    render(<Shop />)

    expect(screen.getByText('Kenyan AA Coffee')).toBeInTheDocument()
    expect(screen.getByText('Ethiopian Yirgacheffe')).toBeInTheDocument()
  })

  it('searches products by name', async () => {
    const user = userEvent.setup()
    render(<Shop />)

    await user.type(
      screen.getByPlaceholderText(/search coffee/i),
      'Kenyan'
    )

    expect(screen.getByText('Kenyan AA Coffee')).toBeInTheDocument()
    expect(screen.queryByText('Ethiopian Yirgacheffe')).not.toBeInTheDocument()
  })

  it('filters products by location', async () => {
    const user = userEvent.setup()
    render(<Shop />)

    await user.click(screen.getByLabelText('Ethiopia'))

    expect(screen.getByText('Ethiopian Yirgacheffe')).toBeInTheDocument()
    expect(screen.queryByText('Kenyan AA Coffee')).not.toBeInTheDocument()
  })

  it('updates a product price', async () => {
    const user = userEvent.setup()
    updateProduct.mockResolvedValue({})

    render(<Shop />)

    await user.click(screen.getAllByText('Edit Price')[0])

    const priceInput = screen.getByPlaceholderText('Enter new price')
    await user.clear(priceInput)
    await user.type(priceInput, '1800')

    await user.click(screen.getByText('Save'))

    await waitFor(() => {
      expect(updateProduct).toHaveBeenCalledWith('1', { price: 1800 })
    })
  })

  it('deletes a product after confirmation', async () => {
    const user = userEvent.setup()
    deleteProduct.mockResolvedValue({})
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    render(<Shop />)

    await user.click(screen.getAllByText('Delete')[0])

    await waitFor(() => {
      expect(deleteProduct).toHaveBeenCalledWith('1')
    })
  })
})
