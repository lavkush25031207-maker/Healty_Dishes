import { FormEvent, useState } from 'react'
import { CheckCircle2, LockKeyhole, Store, Truck, UtensilsCrossed } from 'lucide-react'
import { Link } from 'react-router-dom'
import { restaurantApi } from '../services/api'
import { useRestaurantStore } from '../store/useRestaurantStore'
import type { OrderRequest, OrderResponse } from '../types'

export default function CheckoutPage() {
  const { cart, clearCart } = useRestaurantStore()
  const [order, setOrder] = useState<OrderResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<Omit<OrderRequest, 'items'>>({ customerName: '', phone: '', email: '', orderType: 'DELIVERY', deliveryAddress: '', tableBookingCode: '', paymentMethod: 'CASH' })
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const orderTypes = [
    { value: 'DELIVERY', title: 'Home Delivery', detail: 'Delivered to your address', icon: Truck },
    { value: 'PICKUP', title: 'Self Pickup', detail: 'Collect from the restaurant', icon: Store },
    { value: 'DINE_IN', title: 'Dine In', detail: 'Serve at your booked table', icon: UtensilsCrossed },
  ] as const
  const update = (field: keyof typeof form, value: string | number) => setForm((current) => ({ ...current, [field]: value }))
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setLoading(true); setError('')
    try { const result = await restaurantApi.createOrder({ ...form, items: cart.map((item) => ({ menuItemId: item.id, quantity: item.quantity })) }); setOrder(result); clearCart() } catch (err) { setError((err as Error).message) } finally { setLoading(false) }
  }
  if (order) return <div className="center-page"><div className="success-panel standalone"><CheckCircle2 /><span className="eyebrow">Order confirmed</span><h1>Your wok is fired up!</h1><p>Use this number to track your order.</p><strong>{order.orderNumber}</strong><small>Total paid: ₹{order.totalAmount}</small><Link className="primary-button" to="/track-order">Track my order</Link></div></div>
  if (!cart.length) return <div className="center-page"><div className="empty-checkout"><h1>Your cart feels light.</h1><p>Add a few delicious dishes before checking out.</p><Link className="primary-button" to="/menu">Browse menu</Link></div></div>
  return <div className="checkout-page page-width"><section><span className="eyebrow">Almost there</span><h1>Checkout</h1><form className="form-grid checkout-form" onSubmit={submit}>
    <label className="wide">Full name<input required value={form.customerName} onChange={(e) => update('customerName', e.target.value)} /></label>
    <label>Phone<input required pattern="[0-9+ ]{10,15}" value={form.phone} onChange={(e) => update('phone', e.target.value)} /></label>
    <label>Email<input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} /></label>
    <fieldset className="wide"><legend>How would you like your order?</legend><div className="order-type-options">{orderTypes.map(({ value, title, detail, icon: Icon }) => <label key={value} className={form.orderType === value ? 'selected' : ''}><input type="radio" name="orderType" checked={form.orderType === value} onChange={() => update('orderType', value)} /><Icon size={20} /><span><strong>{title}</strong><small>{detail}</small></span></label>)}</div></fieldset>
    {form.orderType === 'DELIVERY' && <label className="wide">Delivery address<textarea required value={form.deliveryAddress} onChange={(e) => update('deliveryAddress', e.target.value)} /></label>}
    {form.orderType === 'DINE_IN' && <label className="wide">Table booking ID <span>(received after table reservation)</span><input required value={form.tableBookingCode ?? ''} onChange={(e) => update('tableBookingCode', e.target.value.toUpperCase())} placeholder="TB-XXXXXXXX" /></label>}
    <fieldset className="wide"><legend>Payment method</legend><div className="option-row payment-method-row"><label><input type="radio" name="paymentMethod" checked readOnly />CASH</label><label className="disabled-option" title="UPI is temporarily unavailable"><input type="radio" name="paymentMethod" disabled />UPI <small>Unavailable</small></label><label className="disabled-option" title="Card payment is temporarily unavailable"><input type="radio" name="paymentMethod" disabled />CARD <small>Unavailable</small></label></div></fieldset>
    {error && <p className="form-error wide">{error}</p>}<button className="primary-button wide" disabled={loading}><LockKeyhole size={17} /> {loading ? 'Placing order…' : `Place order · ₹${subtotal}`}</button>
  </form></section><aside className="order-summary"><h2>Your order</h2>{cart.map((item) => <div className="summary-item" key={item.id}><span>{item.quantity} × {item.name}</span><strong>₹{item.price * item.quantity}</strong></div>)}<div className="summary-total"><span>Total</span><strong>₹{subtotal}</strong></div></aside></div>
}
