import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useRestaurantStore } from '../store/useRestaurantStore'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { cart, setCartOpen } = useRestaurantStore()
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const links = [['/', 'Home'], ['/menu', 'Menu'], ['/book-table', 'Book Room & Table'], ['/track-order', 'Track Order']]
  return <header className="site-header">
    <Link className="brand" to="/"><img src="/images/logo.png" alt="Healthy Dishes" /><span><strong>Healthy</strong> Dishes</span></Link>
    <nav className={mobileOpen ? 'nav open' : 'nav'}>
      {links.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setMobileOpen(false)}>{label}</NavLink>)}
      <NavLink className="nav-cta" to="/menu" onClick={() => setMobileOpen(false)}>Order Now</NavLink>
    </nav>
    <div className="header-actions">
      <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${count} items`}><ShoppingBag size={21} /><span>{count}</span></button>
      <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X /> : <Menu />}</button>
    </div>
  </header>
}
