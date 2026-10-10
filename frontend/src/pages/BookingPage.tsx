import { FormEvent, useEffect, useState } from 'react'
import { BedDouble, CalendarCheck, CheckCircle2, Clock3, Users, Utensils } from 'lucide-react'
import { restaurantApi } from '../services/api'
import type { AvailableTable, BookingRequest, BookingResponse } from '../types'
import './BookingPage.css'
import './BookingCategories.css'
import './HallBooking.css'
import './RoomCapacity.css'
import './TableBooking.css'

const initialForm: BookingRequest = { customerName: '', phone: '', email: '', bookingDate: '', bookingTime: '', guestCount: 2, tableNumber: 0, reservationType: 'TABLE', roomCategory: '', bookingPrice: 0, specialRequest: '' }
const tablePlan: AvailableTable[] = [2,2,2,4,4,4,4,6,6,8,8,10].map((capacity, index) => ({ tableNumber: index + 1, capacity, area: capacity === 2 ? 'Couple' : capacity <= 6 ? 'Family' : 'General Dining', available: ![3, 7].includes(index + 1) }))
const seatingOptions = [
  { label: 'Intimate Table', range: '1–2 guests', min: 1, max: 2, capacity: 2, area: 'Window or quiet corner' },
  { label: 'Classic Table', range: '3–4 guests', min: 3, max: 4, capacity: 4, area: 'Main dining room' },
  { label: 'Family Table', range: '5–6 guests', min: 5, max: 6, capacity: 6, area: 'Family dining area' },
  { label: 'Group Table', range: '7–8 guests', min: 7, max: 8, capacity: 8, area: 'Flexible group seating' },
]
const rooms = [
  { name: 'City View Room', category: 'City View Room', minCapacity: 4, maxCapacity: 6, available: 3, total: 4, lunchSpend: 6000, dinnerSpend: 9000, description: 'An intimate enclosed room for small family meals' },
  { name: 'Ruby Dining Room', category: 'Ruby Room', minCapacity: 6, maxCapacity: 8, available: 2, total: 3, lunchSpend: 9000, dinnerSpend: 14000, description: 'Private dining with dedicated table service' },
  { name: 'Emerald Dining Suite', category: 'Emerald Suite', minCapacity: 8, maxCapacity: 12, available: 1, total: 2, lunchSpend: 15000, dinnerSpend: 22000, description: 'Premium private suite for celebrations and business dinners' },
]
const halls = [
  { name: 'Celebration Hall', category: 'Celebration Hall', capacity: 30, size: '900 sq ft', price: 25000, deposit: 5000, description: 'Birthdays, anniversaries and intimate social events' },
  { name: 'Grand Banquet Hall', category: 'Grand Banquet', capacity: 80, size: '2,400 sq ft', price: 65000, deposit: 15000, description: 'Large celebrations with flexible round-table seating' },
  { name: 'Corporate Event Hall', category: 'Corporate Hall', capacity: 120, size: '3,200 sq ft', price: 90000, deposit: 20000, description: 'Stage, projector and theatre or classroom layouts' },
]

export default function BookingPage() {
  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState<BookingResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tables, setTables] = useState<AvailableTable[]>(tablePlan)
  const [checkingTables, setCheckingTables] = useState(false)
  const minDate = new Date().toLocaleDateString('en-CA')
  const update = (field: keyof BookingRequest, value: string | number) => setForm((current) => ({ ...current, [field]: value }))
  const selectType = (type: 'TABLE' | 'ROOM' | 'HALL') => setForm((current) => ({ ...current, reservationType: type, tableNumber: 0, roomCategory: '', bookingPrice: 0 }))

  useEffect(() => {
    setForm((current) => current.tableNumber ? { ...current, tableNumber: 0 } : current)
    if (form.reservationType !== 'TABLE' || !form.bookingDate || !form.bookingTime) return
    if (import.meta.env.VITE_USE_LIVE_API !== 'true') { setTables(tablePlan); return }
    setCheckingTables(true)
    restaurantApi.getAvailableTables(form.bookingDate, form.bookingTime, form.guestCount)
      .then(setTables)
      .catch(() => setTables([]))
      .finally(() => setCheckingTables(false))
  }, [form.bookingDate, form.bookingTime, form.guestCount, form.reservationType])

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setLoading(true); setError('')
    try { setResult(await restaurantApi.createBooking(form)); setForm(initialForm) } catch (err) { setError((err as Error).message) } finally { setLoading(false) }
  }
  const selectionDone = form.reservationType === 'TABLE' ? form.tableNumber > 0 : Boolean(form.roomCategory)
  const selectedRoom = rooms.find((room) => room.category === form.roomCategory)
  const roomMinimumSpend = (room: typeof rooms[number]) => Number(form.bookingTime.split(':')[0] || 0) >= 18 ? room.dinnerSpend : room.lunchSpend
  useEffect(() => {
    if (!selectedRoom || form.reservationType !== 'ROOM') return
    const spend = Number(form.bookingTime.split(':')[0] || 0) >= 18 ? selectedRoom.dinnerSpend : selectedRoom.lunchSpend
    setForm((current) => current.bookingPrice === spend ? current : { ...current, bookingPrice: spend })
  }, [form.bookingTime, form.reservationType, selectedRoom])

  return <div className="booking-page room-booking-page">
    <section className="reservation-intro page-width"><span className="eyebrow">Plan your visit</span><h1>Book Room & Table</h1><p>Choose your space first, then share your details to confirm the reservation.</p></section>

    <section className="space-selector page-width">
      <div className="space-tabs"><button className={form.reservationType === 'TABLE' ? 'active' : ''} onClick={() => selectType('TABLE')}><Utensils /> Restaurant Tables</button><button className={form.reservationType === 'ROOM' ? 'active' : ''} onClick={() => selectType('ROOM')}><BedDouble /> Private Dining Rooms</button><button className={form.reservationType === 'HALL' ? 'active' : ''} onClick={() => selectType('HALL')}><Users /> Event Halls</button></div>
      {form.reservationType === 'TABLE' ? <div className="selection-panel">
        <div className="selection-title"><div><h2>Find a table</h2><p>Tell us your party size. We will assign the best available table.</p></div><span>Instant reservation</span></div>
        <div className="table-schedule">
          <label><span><CalendarCheck /> Reservation date</span><input required type="date" min={minDate} value={form.bookingDate} onChange={(event) => update('bookingDate', event.target.value)} /></label>
          <label><span><Clock3 /> Reservation time</span><select required value={form.bookingTime} onChange={(event) => update('bookingTime', event.target.value)}><option value="">Choose time</option>{['11:30','12:30','13:30','18:30','19:30','20:30','21:30'].map((time) => <option key={time}>{time}</option>)}</select></label>
        </div>
        <div className="party-size-picker"><strong>How many people are dining?</strong><div>{Array.from({ length: 8 }, (_, index) => index + 1).map((count) => <button type="button" className={form.guestCount === count ? 'active' : ''} key={count} onClick={() => setForm((current) => ({ ...current, guestCount: count, tableNumber: 0 }))}>{count}</button>)}</div></div>
        {!form.bookingDate || !form.bookingTime ? <div className="availability-prompt"><CalendarCheck /><span><strong>Choose a date and time first</strong><small>We will then show tables available for your visit.</small></span></div> : checkingTables ? <div className="availability-prompt"><span><strong>Checking availability…</strong></span></div> :
        <div className="seating-results"><h3>Available seating for {form.guestCount} {form.guestCount === 1 ? 'guest' : 'guests'}</h3>{seatingOptions.filter((option) => form.guestCount >= option.min && form.guestCount <= option.max).map((option) => { const matching=tables.filter((table)=>table.capacity===option.capacity); const available=matching.filter((table)=>table.available); const assigned=available[0]; return <button type="button" className={assigned && form.tableNumber===assigned.tableNumber ? 'seating-option selected' : 'seating-option'} disabled={!assigned} key={option.label} onClick={() => assigned && setForm((current)=>({...current,tableNumber:assigned.tableNumber,roomCategory:'',bookingPrice:0}))}><div><Utensils /><span><strong>{option.label}</strong><small>{option.range} · {option.area}</small></span></div><span className="availability-count">{available.length ? `${available.length} tables available` : 'Fully booked'}</span><em>{assigned && form.tableNumber===assigned.tableNumber ? 'Selected' : 'Select'}</em></button>})}</div>
        }
        <p className="seat-assignment-note">Table numbers are assigned by the restaurant based on availability. Window or specific-seat requests can be added under Special Request but cannot be guaranteed.</p>
        <div className="large-party-suggestion"><div><Users /><span><strong>Party of 9 or more?</strong><small>Large tables require manual confirmation. Choose private dining or contact our team.</small></span></div><button type="button" onClick={() => selectType('ROOM')}>View private dining</button></div>
      </div> : form.reservationType === 'ROOM' ? <div className="selection-panel">
        <div className="selection-title"><div><h2>Private dining rooms</h2><p>Room charge covers the reserved space; food is billed separately.</p></div><span>{rooms.reduce((sum, room) => sum + room.available, 0)} rooms available</span></div>
        <div className="room-grid">{rooms.map((room) => <button type="button" key={room.category} disabled={!room.available} className={form.roomCategory === room.category ? 'room-card selected' : 'room-card'} onClick={() => setForm((current) => ({ ...current, roomCategory: room.category, bookingPrice: roomMinimumSpend(room), guestCount: room.minCapacity, tableNumber: 0 }))}><div className="room-card-head"><BedDouble /><span>{room.available} of {room.total} available</span></div><h3>{room.name}</h3><p>{room.description}</p><div><span><Users /> {room.minCapacity}–{room.maxCapacity} guests</span><strong>From ₹{room.lunchSpend.toLocaleString('en-IN')}</strong></div></button>)}</div>
        {selectedRoom && <div className="room-party-size"><div><span className="eyebrow">Selected room</span><h3>{selectedRoom.name}</h3><p>Choose the exact number of guests.</p></div><div className="guest-choice"><strong>Number of guests</strong><div className="guest-chips">{Array.from({ length: selectedRoom.maxCapacity - selectedRoom.minCapacity + 1 }, (_, index) => selectedRoom.minCapacity + index).map((count) => <button type="button" className={form.guestCount === count ? 'active' : ''} key={count} onClick={() => update('guestCount', count)}>{count} Guests</button>)}</div></div><div className="minimum-spend"><small>{Number(form.bookingTime.split(':')[0] || 0) >= 18 ? 'Dinner' : 'Lunch'} minimum spend</small><strong>₹{roomMinimumSpend(selectedRoom).toLocaleString('en-IN')}</strong><span>Adjusted against your final food bill</span></div></div>}
      </div> : <div className="selection-panel hall-panel"><div className="selection-title"><div><h2>Event & banquet halls</h2><p>Large events require a tailored proposal. Select a venue and send an enquiry.</p></div><span>Enquiry only</span></div><div className="hall-grid">{halls.map((hall) => <button type="button" key={hall.category} className={form.roomCategory === hall.category ? 'hall-card selected' : 'hall-card'} onClick={() => setForm((current) => ({ ...current, roomCategory: hall.category, bookingPrice: hall.price, guestCount: hall.capacity, tableNumber: 0 }))}><div className="hall-badge">Event venue</div><h3>{hall.name}</h3><p>{hall.description}</p><dl><div><dt>Maximum capacity</dt><dd>{hall.capacity} guests</dd></div><div><dt>Venue size</dt><dd>{hall.size}</dd></div><div><dt>Starting package</dt><dd>₹{hall.price.toLocaleString('en-IN')}</dd></div><div><dt>Refundable deposit</dt><dd>₹{hall.deposit.toLocaleString('en-IN')}</dd></div></dl><span className="enquire-label">{form.roomCategory === hall.category ? 'Selected for enquiry' : 'Select venue'}</span></button>)}</div><div className="hall-policy"><strong>Event booking policy</strong><span>Minimum 72-hour notice · final pricing after menu and seating consultation · venue is confirmed only after deposit.</span></div></div>}
    </section>

    <div className="booking-layout page-width details-layout">
      <aside className="booking-info"><span className="eyebrow light">Your selection</span><h2>{form.reservationType === 'TABLE' ? (form.tableNumber ? `Table for ${form.guestCount}` : 'Choose your party size') : (form.roomCategory || (form.reservationType === 'HALL' ? 'Choose an event hall' : 'Choose a room'))}</h2><p>{form.reservationType === 'HALL' ? 'This is an event enquiry. Our events manager will confirm layout, menu, pricing and availability.' : form.reservationType === 'ROOM' && form.bookingPrice ? `Private room charge ₹${form.bookingPrice}. Food and taxes are additional.` : 'Pick a date and time, then complete your contact details.'}</p><div className="booking-points"><span><Clock3 /> Lunch 11 AM – 4 PM</span><span><CalendarCheck /> Dinner 6 PM – 11 PM</span><span><Users /> {form.reservationType === 'HALL' ? 'Managed event enquiry' : 'Instant confirmation'}</span></div></aside>
      <section className="form-card">
        {result ? <div className="success-panel"><CheckCircle2 /><span className="eyebrow">Booking confirmed</span><h2>See you soon, {result.customerName}!</h2><p>Your confirmation code is</p><strong>{result.bookingCode}</strong><small>{result.bookingDate} at {result.bookingTime} · {result.guestCount} guests</small><button className="primary-button" onClick={() => setResult(null)}>Make another booking</button></div> : <><div className="form-heading"><h2>Guest details</h2><p>Complete your reservation in less than a minute.</p></div><form onSubmit={submit} className="form-grid">
          <label className="wide">Full name<input required value={form.customerName} onChange={(e) => update('customerName', e.target.value)} placeholder="Your name" /></label>
          <label>Phone number<input required pattern="[0-9+ ]{10,15}" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 98765 43210" /></label>
          <label>Email address<input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" /></label>
          {form.reservationType !== 'TABLE' && <><label>Date<input required type="date" min={minDate} value={form.bookingDate} onChange={(e) => update('bookingDate', e.target.value)} /></label><label>Time<select required value={form.bookingTime} onChange={(e) => update('bookingTime', e.target.value)}><option value="">Choose time</option>{['11:30','12:30','13:30','18:30','19:30','20:30','21:30'].map((time) => <option key={time}>{time}</option>)}</select></label></>}
          <div className="wide capacity-confirmation"><Users /><span><small>Reserved capacity</small><strong>{selectionDone ? `Up to ${form.guestCount} guests` : 'Select a table or room first'}</strong></span></div>
          <label className="wide">Special request <span>(optional)</span><textarea value={form.specialRequest} onChange={(e) => update('specialRequest', e.target.value)} placeholder="Allergies, occasion, decorations…" /></label>
          {error && <p className="form-error wide">{error}</p>}<button className="primary-button wide" disabled={loading || !selectionDone}>{loading ? 'Submitting…' : selectionDone ? (form.reservationType === 'HALL' ? 'Send event enquiry' : 'Confirm reservation') : `Select a ${form.reservationType === 'TABLE' ? 'table' : form.reservationType === 'ROOM' ? 'room' : 'hall'} first`}</button>
        </form></>}
      </section>
    </div>
  </div>
}
