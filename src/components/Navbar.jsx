
import { NavLink } from 'react-router-dom'

function Navbar() {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Admin', path: '/admin' },
]

  return (
    <header className="bg-[#faf7f2] border-b border-[#e8dccb]">
    <nav className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
    <NavLink to="/" className="text-2xl font-bold text-[#4a3025]">
          Coffee <span className="text-[#a17b59]">R Us.</span>
    </NavLink>

        <div className="flex items-center gap-7">
          {links.map((link) => (
            <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
            `text-sm font-semibold ${
            isActive
            ? 'text-[#80583d]'
            : 'text-[#76675d] hover:text-[#4a3025]'
            }`
              }
            >
            {link.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar

