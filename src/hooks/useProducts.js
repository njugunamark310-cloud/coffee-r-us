
import { useState, useEffect, useCallback } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/products'

function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // GET: Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()
      setProducts(data)
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts()
    }, 0)

    return () => clearTimeout(timer)
  }, [fetchProducts])

  // POST: Add product
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

  // PATCH: Update product
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

  // DELETE: Remove product
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
