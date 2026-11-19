const { NavLink } = require("react-router-dom")

key={link.path}
to={link.path}
className={({ isActive })} =>
    isActive
    ? 'font-bold text-amber-800'
     : 'text-stone-600 hover:text-amber-800'
}
>
  {link.name}
  </NavLink>
   ))}
      </div>
    </nav>
  )
}

export default Navbar
