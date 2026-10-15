import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useRestaurantStore } from '../store/useRestaurantStore'
import { assetUrl } from '../utils/assetUrl'

export default function CartDrawer() {
  const navigate = useNavigate()
  const { cart, cartOpen, setCartOpen, updateQuantity, removeFromCart } = useRestaurantStore()
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return <>
    {cartOpen && <button className="drawer-overlay" onClick={() => setCartOpen(false)} aria-label="Close cart" />}
    <aside className={cartOpen ? 'cart-drawer open' : 'cart-drawer'} aria-hidden={!cartOpen}>
      <div className="drawer-head"><div><span className="eyebrow">Your order</span><h2>Good food awaits</h2></div><button onClick={() => setCartOpen(false)}><X /></button></div>
      <div className="cart-items">
        {!cart.length && <div className="empty-cart"><ShoppingBag size={45} /><h3>Your cart is empty</h3><p>Add something fresh and delicious from our menu.</p></div>}
        {cart.map((item) => <div className="cart-item" key={item.id}>
          <img src={assetUrl(item.imageUrl)} alt="" />
          <div><h4>{item.name}</h4><p>₹{item.price}</p><div className="quantity"><button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button></div></div>
          <button className="remove" onClick={() => removeFromCart(item.id)}><Trash2 size={17} /></button>
        </div>)}
      </div>
      {!!cart.length && <div className="drawer-total"><div><span>Subtotal</span><strong>₹{subtotal.toFixed(0)}</strong></div><small>Taxes and delivery charges calculated at checkout.</small><button className="primary-button full" onClick={() => { setCartOpen(false); navigate('/checkout') }}>Proceed to checkout</button></div>}
    </aside>
  </>
}
