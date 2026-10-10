import { useEffect, useMemo, useState } from 'react'
import { Search, Utensils } from 'lucide-react'
import MenuCard from '../components/MenuCard'
import { restaurantApi } from '../services/api'
import type { MenuItem } from '../types'
import { fallbackMenu } from '../data/fallbackMenu'

export default function MenuPage() {
  const useLiveApi = import.meta.env.VITE_USE_LIVE_API === 'true'
  const [items, setItems] = useState<MenuItem[]>(fallbackMenu)
  const [loading, setLoading] = useState(useLiveApi)
  const [error, setError] = useState('')
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  useEffect(() => {
    if (!useLiveApi) return
    restaurantApi.getMenu().then(setItems).catch(() => {
      setItems(fallbackMenu)
      setError('Live kitchen connection is offline. Preview menu is being shown.')
    }).finally(() => setLoading(false))
  }, [useLiveApi])
  const categories = ['All', ...new Set(items.map((item) => item.category))]
  const filtered = useMemo(() => items.filter((item) => (category === 'All' || item.category === category) && item.name.toLowerCase().includes(query.toLowerCase())), [items, category, query])
  return <div className="page-content page-width">
    <div className="page-hero"><span className="eyebrow">Made fresh for you</span><h1>Explore our menu</h1><p>Choose a favourite, customise your cart and we'll fire up the wok.</p></div>
    <div className="menu-toolbar"><div className="categories">{categories.map((item) => <button className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><label className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dishes" /></label></div>
    {loading && <div className="state-message">Loading today's fresh menu…</div>}
    {error && <div className="api-notice"><Utensils size={17} /><span>{error}</span></div>}
    {!loading && <div className="menu-grid">{filtered.map((item) => <MenuCard item={item} key={item.id} />)}</div>}
    {!loading && !filtered.length && <div className="state-message">No matching dishes found.</div>}
  </div>
}
