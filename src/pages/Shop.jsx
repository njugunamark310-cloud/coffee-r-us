
import { useState } from 'react'

const products = [
  {
    id: '1',
    name: 'Kenyan AA Coffee',
    description: 'Rich aroma with fruity notes and a smooth finish.',
    origin: 'Nyeri, Kenya',
    price: 1200,
    location: 'Kenya',
    image: 'photo-1442512595331-e89e73853f31',
  },
  {
    id: '2',
    name: 'Ethiopian Yirgacheffe',
    description: 'Floral fragrance with bright citrus flavours.',
    origin: 'Yirgacheffe, Ethiopia',
    price: 1500,
    location: 'Ethiopia',
    image: 'photo-1559525839-b184a4d698c7',
  },
  {
    id: '3',
    name: 'Colombian Supremo',
    description: 'Balanced coffee with caramel and chocolate notes.',
    origin: 'Huila, Colombia',
    price: 1350,
    location: 'Colombia',
    image: 'photo-1445116572660-236099ec97a0',
  },
  {
    id: '4',
    name: 'Brazilian Santos',
    description: 'Smooth body with sweet nutty undertones.',
    origin: 'Santos, Brazil',
    price: 1100,
    location: 'Brazil',
    image: 'photo-1495474472287-4d71bcdd2085',
  },
]

function Shop() {
  const [search, setSearch] = useState('')
  const [selectedLocations, setSelectedLocations] = useState([])

  const locations = ['Kenya', 'Ethiopia', 'Colombia', 'Brazil']

  function handleLocation(location) {
    setSelectedLocations((current) =>
      current.includes(location)
        ? current.filter((item) => item !== location)
        : [...current, location]
    )
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.origin.toLowerCase().includes(search.toLowerCase())

    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(product.location)

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
          placeholder="Search coffee by name or origin..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full bg-white border border-[#e8dccb] rounded-full px-6 py-4 outline-none focus:ring-2 focus:ring-[#a17b59]"
        />
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-10">
        <aside className="bg-white rounded-2xl p-6 h-fit shadow-sm">
          <h2 className="font-bold text-lg mb-5">Filter by origin</h2>

          {locations.map((location) => (
            <label key={location} className="flex items-center gap-3 mb-4 text-[#76675d]">
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

          {filteredProducts.length === 0 ? (
            <p className="bg-white p-10 rounded-2xl text-center text-[#76675d]">
              No coffee products found. Try another search.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <article key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg">
                  <img
                    src={`https://images.unsplash.com/${product.image}?w=700`}
                    alt={product.name}
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-5">
                    <p className="text-sm text-[#9b7657]">{product.origin}</p>
                    <h3 className="text-lg font-bold mt-2">{product.name}</h3>
                    <p className="text-sm text-[#76675d] mt-3 leading-6">
                      {product.description}
                    </p>

                    <div className="border-t border-[#eee5db] mt-5 pt-4">
                      <span className="font-bold text-lg text-[#80583d]">
                        KSh {product.price.toLocaleString()}
                </span>
            </div>
        </div>
    </article>
    ))}
     </div>
    )}
    </section>
    </div>
</main>
  )
}

export default Shop
