import logo from "../assets/International_Pokémon_logo.svg"

import './navbar.css'
const Navbar = () => {
    return (
        <nav className="navbar">
            <div><img src={logo} /></div>
        </nav>
    )
}

export default Navbar