export type FoodType = 'VEG' | 'NON_VEG' | 'VEGAN'

export interface MenuItem {
  id: number
  name: string
  description: string
  category: string
  price: number
  imageUrl: string
  foodType: FoodType
  available: boolean
  preparationMinutes: number
}

export interface CartItem extends MenuItem { quantity: number }

export interface BookingRequest {
  customerName: string
  phone: string
  email: string
  bookingDate: string
  bookingTime: string
  guestCount: number
  tableNumber: number
  reservationType: 'TABLE' | 'ROOM' | 'HALL'
  roomCategory: string
  bookingPrice: number
  specialRequest: string
}

export interface AvailableTable {
  tableNumber: number
  capacity: number
  area: string
  available: boolean
}

export interface BookingResponse extends BookingRequest {
  id: number
  bookingCode: string
  status: string
}

export interface OrderRequest {
  customerName: string
  phone: string
  email: string
  orderType: 'DELIVERY' | 'PICKUP' | 'DINE_IN'
  deliveryAddress: string
  tableBookingCode?: string
  paymentMethod: 'CASH' | 'CARD' | 'UPI'
  items: Array<{ menuItemId: number; quantity: number }>
}

export interface OrderResponse {
  id: number
  orderNumber: string
  status: string
  totalAmount: number
  createdAt: string
}
