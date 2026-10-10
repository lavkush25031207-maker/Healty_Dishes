import { Clock, Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import type { MenuItem } from '../types'
import { useRestaurantStore } from '../store/useRestaurantStore'

export default function MenuCard({ item }: { item: MenuItem }) {
  const addToCart = useRestaurantStore((state) => state.addToCart)
  const add = () => { addToCart(item); toast.success(`${item.name} added to cart`) }
  return <article className="menu-card">
    <div className="menu-image-wrap"><img src={item.imageUrl} alt={item.name} /><span className={`food-dot ${item.foodType.toLowerCase()}`} /></div>
    <div className="menu-card-body">
      <div className="menu-title-row"><h3>{item.name}</h3><strong>₹{item.price}</strong></div>
      <p>{item.description}</p>
      <div className="menu-meta"><span><Clock size={15} /> {item.preparationMinutes} min</span><button onClick={add} disabled={!item.available}><Plus size={17} /> {item.available ? 'Add' : 'Sold out'}</button></div>
    </div>
  </article>
}
