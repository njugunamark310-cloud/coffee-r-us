
import { useState } from 'react'

function Admin() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    origin: '',
    price: '',
    location: '',
  })

  const [message, setMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    setMessage('Form completed! Backend integration is our next step.')

    setFormData({
      name: '',
      description: '',
      origin: '',
      price: '',
      location: '',
    })
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
            <label className="block font-semibold text-sm mb-2">
              Coffee Name
            </label>

            <input
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
            <label className="block font-semibold text-sm mb-2">
              Description
            </label>

            <textarea
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
            <label className="block font-semibold text-sm mb-2">
              Origin
            </label>

            <input
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
              <label className="block font-semibold text-sm mb-2">
                Price (KSh)
              </label>

              <input
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
              <label className="block font-semibold text-sm mb-2">
                Location
              </label>

              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full border border-[#e8dccb] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#a17b59] bg-white"
              >
                <option value="">Select origin</option>
                <option value="Kenya">Kenya</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Colombia">Colombia</option>
                <option value="Brazil">Brazil</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4a3025] text-white py-4 rounded-xl font-bold hover:bg-[#80583d]"
          >
            Add Coffee Product
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

    <div className="bg-white rounded-2xl p-8 shadow-sm">
        <p className="text-[#76675d]">
        Your product inventory will appear here once we connect the backend.
       </p>
    </div>
</section>
</main>
  )
}

export default Admin
