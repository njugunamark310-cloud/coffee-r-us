
import { renderHook, waitFor, act } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import useProducts from './useProducts'

const sampleProducts = [
  {
    id: '1',
    name: 'Kenyan AA Coffee',
    description: 'Rich aroma',
    origin: 'Nyeri, Kenya',
    price: 1200,
    location: 'Kenya',
  },
]

function mockResponse(data) {
  return {
    ok: true,
    json: async () => data,
  }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useProducts', () => {
  it('fetches products from the backend', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(mockResponse(sampleProducts))
    )

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.products).toEqual(sampleProducts)
    })

    expect(result.current.loading).toBe(false)
  })

  it('adds a new product', async () => {
    const newProduct = {
      id: '2',
      name: 'Ethiopian Coffee',
      description: 'Floral notes',
      origin: 'Ethiopia',
      price: 1500,
      location: 'Ethiopia',
    }

    vi.stubGlobal(
      'fetch',
      vi.fn()
        .mockResolvedValueOnce(mockResponse(sampleProducts))
        .mockResolvedValueOnce(mockResponse(newProduct))
    )

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.products).toHaveLength(1)
    })

    await act(async () => {
      await result.current.addProduct(newProduct)
    })

    expect(result.current.products).toHaveLength(2)
    expect(result.current.products[1].name).toBe('Ethiopian Coffee')
  })

  it('updates a product price', async () => {
    const updatedProduct = {
      ...sampleProducts[0],
      price: 1800,
    }

    vi.stubGlobal(
      'fetch',
      vi.fn()
        .mockResolvedValueOnce(mockResponse(sampleProducts))
        .mockResolvedValueOnce(mockResponse(updatedProduct))
    )

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.products).toHaveLength(1)
    })

    await act(async () => {
      await result.current.updateProduct('1', { price: 1800 })
    })

    expect(result.current.products[0].price).toBe(1800)
  })

  it('deletes a product', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn()
        .mockResolvedValueOnce(mockResponse(sampleProducts))
        .mockResolvedValueOnce({ ok: true })
    )

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.products).toHaveLength(1)
    })

    await act(async () => {
      await result.current.deleteProduct('1')
    })

    expect(result.current.products).toHaveLength(0)
  })
})
