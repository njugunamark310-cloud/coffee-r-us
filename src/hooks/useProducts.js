
import { useState, useEffect, useCallback } from 'react'

const API_URL = 'http://localhost:3002/products'

function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // GET: Load products from the backend
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // POST: Add a new product
  const addProduct = async (product) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })

    if (!response.ok) {
      throw new Error('Failed to add product')
    }

    const newProduct = await response.json()
    setProducts((current) => [...current, newProduct])

    return newProduct
  }

  // PATCH: Update an existing product
  const updateProduct = async (id, updates) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      throw new Error('Failed to update product')
    }

    const updatedProduct = await response.json()

    setProducts((current) =>
      current.map((product) =>
        product.id === id ? updatedProduct : product
      )
    )

    return updatedProduct
  }

  // DELETE: Remove a product
  const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete product')
    }

    setProducts((current) =>
      current.filter((product) => product.id !== id)
    )
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  }
}

export default useProducts
