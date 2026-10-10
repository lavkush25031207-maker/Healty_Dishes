import type { MenuItem } from '../types'

export const fallbackMenu: MenuItem[] = [
  { id: 1, name: 'Build Your Own Wok', description: 'Pick your base, protein, vegetables and signature sauce.', category: 'Bowls', price: 349, imageUrl: '/images/img.jpg', foodType: 'VEG', available: true, preparationMinutes: 20 },
  { id: 2, name: 'Chilli Garlic Noodles', description: 'Wok-tossed noodles with crunchy vegetables and roasted garlic.', category: 'Noodles', price: 279, imageUrl: '/images/img2.jpg', foodType: 'VEG', available: true, preparationMinutes: 18 },
  { id: 3, name: 'Hot & Sour Soup', description: 'A warming broth with mushrooms, tofu and seasonal greens.', category: 'Soups', price: 189, imageUrl: '/images/img6.jpg', foodType: 'VEGAN', available: true, preparationMinutes: 12 },
  { id: 4, name: 'Tofu Gochujang', description: 'Crispy tofu glazed in a sweet and spicy Korean chilli sauce.', category: 'Mains', price: 329, imageUrl: '/images/img3.jpg', foodType: 'VEGAN', available: true, preparationMinutes: 22 },
  { id: 5, name: 'Shanghai Chicken Dim Sum', description: 'Juicy chicken dumplings served with house-made chilli oil.', category: 'Dim Sum', price: 299, imageUrl: '/images/img1.jpg', foodType: 'NON_VEG', available: true, preparationMinutes: 16 },
  { id: 6, name: 'Thai Basil Chicken', description: 'Minced chicken, Thai basil and peppers with jasmine rice.', category: 'Mains', price: 369, imageUrl: '/images/img5.jpg', foodType: 'NON_VEG', available: true, preparationMinutes: 24 },
  { id: 7, name: 'Veg Crystal Dumplings', description: 'Translucent dumplings packed with garden vegetables.', category: 'Dim Sum', price: 259, imageUrl: '/images/img4.jpg', foodType: 'VEGAN', available: true, preparationMinutes: 15 },
]
