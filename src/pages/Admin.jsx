
import { useState } from 'react'
import useProducts from '../hooks/useProducts'

function Admin() {
  const { products, loading, error, addProduct } = useProducts()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    origin: '',
    price: '',
    location: '',
  })

  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setMessage('')

    try {
      await addProduct({
        ...formData,
        price: Number(formData.price),
      })

      setMessage('Coffee product added successfully!')

      setFormData({
        name: '',
        description: '',
        origin: '',
        price: '',
        location: '',
      })
    } catch (err) {
      setMessage(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-14">
      <div className="text-center mb-12">
        <p className="uppercase tracking-[0.3em] text-sm text-[#9b7657]">
          Store management
        </p>

        <h1 className="font-['Playfair_Display'] text-5xl text-[#4a3025] mt-4">
          Product Administration
        </h1>

        <p className="text-[#76675d] mt-4">
          Manage your coffee collection and add new products.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm p-8 md:p-12">
        <h2 className="text-2xl font-bold text-[#4a3025] mb-2">
          Add a New Product
        </h2>

        <p className="text-sm text-[#76675d] mb-8">
          Enter the details of the coffee you want to add.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block font-semibold text-sm mb-2">
              Coffee Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Kenyan AA Coffee"
              required
              className="w-full border border-[#e8dccb] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#a17b59]"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-semibold text-sm mb-2">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the coffee..."
              rows="4"
              required
              className="w-full border border-[#e8dccb] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#a17b59]"
            />
          </div>

          <div>
            <label htmlFor="origin" className="block font-semibold text-sm mb-2">
              Origin
            </label>

            <input
              id="origin"
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="e.g. Nyeri, Kenya"
              required
              className="w-full border border-[#e8dccb] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#a17b59]"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="price" className="block font-semibold text-sm mb-2">
                Price (KSh)
              </label>

              <input
              id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="1"
                placeholder="1200"
                required
                className="w-full border border-[#e8dccb] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#a17b59]"
              />
            </div>

            <div>
              <label htmlFor="location" className="block font-semibold text-sm mb-2">
                Location
              </label>

              <select
              id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full border border-[#e8dccb] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#a17b59] bg-white"
              >
                <option value="">Select location</option>
                <option value="Kenya">Kenya</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Colombia">Colombia</option>
                <option value="Brazil">Brazil</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#4a3025] text-white py-4 rounded-xl font-bold hover:bg-[#80583d] disabled:opacity-60"
          >
            {submitting ? 'Adding Product...' : 'Add Coffee Product'}
          </button>

          {message && (
            <p role="status" className="text-center text-green-700 text-sm">
              {message}
            </p>
          )}
        </form>
      </div>

      <section className="mt-16">
        <h2 className="font-['Playfair_Display'] text-3xl text-[#4a3025] mb-6">
          Inventory Management
        </h2>

        {loading ? (
          <p className="text-[#76675d]">Loading inventory...</p>
        ) : error ? (
          <p role="alert" className="text-red-600">{error}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h3 className="font-bold text-lg text-[#4a3025]">
                  {product.name}
                </h3>

                <p className="text-sm text-[#76675d] mt-2">
                  {product.description}
                </p>

                <p className="text-sm text-[#76675d] mt-3">
                  {product.origin}
                </p>

                <p className="font-bold text-[#9b7657] mt-3">
                  KSh {Number(product.price).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Admin

