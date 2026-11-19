
import { Link } from 'react-router-dom'

const featuredCoffee = [
  {
    name: 'Kenyan AA',
    origin: 'Nyeri, Kenya',
    price: 'KSh 1,200',
    image: 'photo-1442512595331-e89e73853f31',
  },
  {
    name: 'Ethiopian Yirgacheffe',
    origin: 'Ethiopia',
    price: 'KSh 1,500',
    image: 'photo-1559525839-b184a4d698c7',
  },
  {
    name: 'Colombian Supremo',
    origin: 'Colombia',
    price: 'KSh 1,350',
    image: 'photo-1445116572660-236099ec97a0',
  },
]

function Home() {
  return (
    <main>
      <section className="bg-[#4a3025] text-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
            <div>
            <p className="uppercase tracking-[0.3em] text-[#d5b99b] text-sm mb-6">
              A better coffee experience
            </p>

            <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl leading-tight mb-6">
              Discover Your
              <span className="block text-[#d5b99b]">Perfect Brew.</span>
            </h1>

            <p className="text-[#e5d8ca] leading-8 max-w-lg mb-9">
              Explore exceptional coffee sourced from the world's
              finest growing regions. Every cup tells a story.
            </p>

            <Link
              to="/shop"
              className="inline-block bg-[#d5b99b] text-[#35251d] px-8 py-4 rounded-full font-bold hover:bg-white"
            >
              Explore Our Coffee →
            </Link>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1000"
              alt="Freshly roasted coffee beans"
              className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute bottom-5 left-5 bg-[#faf7f2] text-[#4a3025] px-5 py-3 rounded-xl">
              <p className="text-xs uppercase tracking-widest">Our passion</p>
              <p className="font-bold">Quality in every cup.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-[#9b7657] uppercase tracking-widest text-sm mb-3">
            Carefully selected
          </p>
          <h2 className="font-['Playfair_Display'] text-4xl text-[#4a3025]">
            Featured Coffee
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCoffee.map((coffee) => (
            <article key={coffee.name} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <img
                src={`https://images.unsplash.com/${coffee.image}?w=700`}
                alt={coffee.name}
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-[#9b7657]">{coffee.origin}</p>
                <h3 className="text-xl font-bold mt-2">{coffee.name}</h3>
                <div className="flex justify-between items-center mt-5">
                  <span className="font-bold text-[#80583d]">{coffee.price}</span>
                  <Link to="/shop" className="text-sm font-bold text-[#80583d] hover:underline">
            Shop now →
        </Link>
    </div>
    </div>
    </article>
    ))}
      </div>
      </section>

      <footer className="bg-[#35251d] text-[#e5d8ca] text-center py-8">
        <p>© 2026 Coffee R Us. Crafted for coffee lovers.</p>
      </footer>
    </main>
  )
}

export default Home
