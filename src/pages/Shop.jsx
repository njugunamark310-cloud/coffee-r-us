
import { useState } from 'react'
import useProducts from '../hooks/useProducts'

const locations = ['Kenya', 'Ethiopia', 'Colombia', 'Brazil']

const coffeeImages = {
  Kenya: 'photo-1442512595331-e89e73853f31',
  Ethiopia: 'photo-1559525839-b184a4d698c7',
  Colombia: 'photo-1445116572660-236099ec97a0',
  Brazil: 'photo-1495474472287-4d71bcdd2085',
}

function Shop() {
  const {
    products,
    loading,
    error,
    updateProduct,
    deleteProduct,
  } = useProducts()

  const [search, setSearch] = useState('')
  const [selectedLocations, setSelectedLocations] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [newPrice, setNewPrice] = useState('')
  const [message, setMessage] = useState('')

  function handleLocation(location) {
    setSelectedLocations((current) =>
      current.includes(location)
        ? current.filter((item) => item !== location)
        : [...current, location]
    )
  }

  async function handleSavePrice(id) {
    if (!newPrice || Number(newPrice) <= 0) {
      setMessage('Please enter a valid price.')
      return
    }

    try {
      await updateProduct(id, { price: Number(newPrice) })
      setEditingId(null)
      setNewPrice('')
      setMessage('Product price updated successfully.')
    } catch (err) {
      setMessage(err.message)
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this coffee product?'
    )

    if (!confirmed) return

    try {
      await deleteProduct(id)
      setMessage('Product deleted successfully.')
    } catch (err) {
      setMessage(err.message)
    }
  }

  const filteredProducts = products.filter((product) => {
    const searchTerm = search.toLowerCase()

    const matchesSearch = [
      product.name,
      product.description,
      product.origin,
    ].some((value) => value.toLowerCase().includes(searchTerm))

    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.some((location) =>
        product.origin.toLowerCase().includes(location.toLowerCase()) ||
        product.location.toLowerCase() === location.toLowerCase()
      )

    return matchesSearch && matchesLocation
  })

  return (
    <main className="max-w-7xl mx-auto px-6 py-14">
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-[0.3em] text-[#9b7657]">
          From our roastery to you
        </p>

        <h1 className="font-['Playfair_Display'] text-5xl text-[#4a3025] mt-4">
          Explore Our Coffee
        </h1>

        <p className="text-[#76675d] mt-4">
          Discover flavours from around the world.
        </p>
      </div>

      <div className="mb-10 max-w-2xl mx-auto">
        <input
          type="search"
          placeholder="Search coffee by name, description or origin..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full bg-white border border-[#e8dccb] rounded-full px-6 py-4 outline-none focus:ring-2 focus:ring-[#a17b59]"
        />
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-10">
        <aside className="bg-white rounded-2xl p-6 h-fit shadow-sm">
          <h2 className="font-bold text-lg mb-5">Filter by origin</h2>

          {locations.map((location) => (
            <label
              key={location}
              className="flex items-center gap-3 mb-4 text-[#76675d]"
            >
              <input
                type="checkbox"
                checked={selectedLocations.includes(location)}
                onChange={() => handleLocation(location)}
                className="accent-[#80583d] w-4 h-4"
              />
              {location}
            </label>
          ))}

          <button
            onClick={() => {
              setSearch('')
              setSelectedLocations([])
            }}
            className="text-sm text-[#80583d] font-bold mt-3 hover:underline"
          >
            Clear filters
          </button>
        </aside>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#4a3025]">
              Our Collection
            </h2>

            <p className="text-sm text-[#76675d]">
              {filteredProducts.length} products
            </p>
          </div>

          {message && (
            <p role="status" className="mb-5 text-sm text-green-700">
              {message}
            </p>
          )}

          {loading ? (
            <p className="bg-white p-10 rounded-2xl text-center">
              Loading coffee collection...
            </p>
          ) : error ? (
            <p role="alert" className="bg-white p-10 rounded-2xl text-center text-red-600">
              {error}
            </p>
          ) : filteredProducts.length === 0 ? (
            <p className="bg-white p-10 rounded-2xl text-center text-[#76675d]">
              No coffee products found. Try another search.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const imageLocation = locations.find((location) =>
                  product.origin.toLowerCase().includes(location.toLowerCase())
                ) || 'Kenya'

                return (
                  <article
                    key={product.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg"
                  >
                    <img
                      src={`https://images.unsplash.com/${coffeeImages[imageLocation]}?w=700`}
                      alt={product.name}
                      className="w-full h-52 object-cover"
                    />

                    <div className="p-5">
                      <p className="text-sm text-[#9b7657]">
                        {product.origin}
                      </p>

                      <h3 className="text-lg font-bold mt-2">
                        {product.name}
                      </h3>

                      <p className="text-sm text-[#76675d] mt-3 leading-6">
                        {product.description}
                      </p>

                      <div className="border-t border-[#eee5db] mt-5 pt-4">
                        {editingId === product.id ? (
                          <div className="space-y-3">
                            <input
                              type="number"
                              min="1"
                              value={newPrice}
                              onChange={(event) => setNewPrice(event.target.value)}
                              placeholder="Enter new price"
                              className="w-full border rounded-lg p-2"
                            />

                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSavePrice(product.id)}
                                className="flex-1 bg-[#4a3025] text-white rounded-lg py-2"
                              >
                                Save
                              </button>

                              <button
                                onClick={() => setEditingId(null)}
                                className="flex-1 border rounded-lg py-2"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="font-bold text-lg text-[#80583d]">
                              KSh {Number(product.price).toLocaleString()}
                            </p>

                            <div className="flex gap-3 mt-4">
                              <button
                                onClick={() => {
                                  setEditingId(product.id)
                                  setNewPrice(String(product.price))
                                  setMessage('')
                                }}
                                className="flex-1 border border-[#80583d] text-[#80583d] rounded-lg py-2 text-sm font-semibold hover:bg-[#f7f0e8]"
                              >
                                Edit Price
                              </button>

                              <button
                                onClick={() => handleDelete(product.id)}
                                className="flex-1 bg-red-50 text-red-700 rounded-lg py-2 text-sm font-semibold hover:bg-red-100"
                              >
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default Shop

