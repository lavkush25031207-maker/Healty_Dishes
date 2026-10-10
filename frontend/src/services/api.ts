import axios from 'axios'
import type { AvailableTable, BookingRequest, BookingResponse, MenuItem, OrderRequest, OrderResponse } from '../types'

const apiBaseUrl = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response || error.response.status === 502) {
      return Promise.reject(new Error('Restaurant server is currently unavailable. Please try again shortly.'))
    }
    return Promise.reject(new Error(error.response.data?.message ?? 'Something went wrong. Please try again.'))
  },
)

export const restaurantApi = {
  getMenu: async () => (await api.get<MenuItem[]>('/menu-items')).data,
  createBooking: async (payload: BookingRequest) => (await api.post<BookingResponse>('/bookings', payload)).data,
  getAvailableTables: async (date: string, time: string, guests: number) => (await api.get<AvailableTable[]>('/bookings/available-tables', { params: { date, time, guests } })).data,
  createOrder: async (payload: OrderRequest) => (await api.post<OrderResponse>('/orders', payload)).data,
  trackOrder: async (orderNumber: string) => (await api.get<OrderResponse>(`/orders/track/${orderNumber}`)).data,
}
