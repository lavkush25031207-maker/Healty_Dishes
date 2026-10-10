import { FormEvent, useState } from 'react'
import { Bike, Check, ChefHat, PackageCheck, Search } from 'lucide-react'
import { restaurantApi } from '../services/api'
import type { OrderResponse } from '../types'

const statuses = ['CONFIRMED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED']
export default function TrackOrderPage() {
  const [number, setNumber] = useState('')
  const [order, setOrder] = useState<OrderResponse | null>(null)
  const [error, setError] = useState('')
  const submit = async (event: FormEvent) => { event.preventDefault(); setError(''); setOrder(null); try { setOrder(await restaurantApi.trackOrder(number.trim())) } catch (err) { setError((err as Error).message) } }
  const activeIndex = order ? statuses.indexOf(order.status) : -1
  return <div className="track-page page-width"><div className="page-hero"><span className="eyebrow">From our wok to you</span><h1>Track your order</h1><p>Enter the order number from your confirmation screen.</p></div>
    <form className="track-form" onSubmit={submit}><Search /><input required value={number} onChange={(e) => setNumber(e.target.value)} placeholder="e.g. HD-20261010-AB12" /><button className="primary-button">Track order</button></form>
    {error && <p className="form-error track-error">{error}</p>}
    {order && <section className="tracking-card"><div className="tracking-head"><div><span>Order number</span><h2>{order.orderNumber}</h2></div><strong>₹{order.totalAmount}</strong></div><div className="timeline">{statuses.map((status, index) => <div className={index <= activeIndex ? 'timeline-step done' : 'timeline-step'} key={status}><span>{index < activeIndex ? <Check /> : index === 1 ? <ChefHat /> : index === 3 ? <Bike /> : <PackageCheck />}</span><p>{status.replaceAll('_', ' ')}</p></div>)}</div></section>}
  </div>
}
