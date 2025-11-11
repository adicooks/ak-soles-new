import { Product } from '../types'

export const ALL_PRODUCTS: Product[] = [
  // Nike
  { name: 'Nike Dunk Low Needlework', tag: 'needle', price: 160, size: 7, image: '/img/needle.png', category: 'nike' },
  { name: 'Nike Dunk Low Gardenia', tag: 'gardenia', price: 225, size: 9.5, image: '/img/gardenia.png', category: 'nike' },
  { name: 'Nike Dunk Low SLAG', tag: 'slag', price: 200, size: 9, image: '/img/slag.png', category: 'nike' },
  { name: 'Nike Dunk Low Panda', tag: 'panda', price: 150, size: 11, image: '/img/panda.png', category: 'nike' },
  { name: 'Nike Dunk Low Ebay', tag: 'ebay', price: 150, size: 8.5, image: '/img/ebay.png', category: 'nike' },
  { name: 'Nike Dunk Low Fuschia', tag: 'fuschia', price: 175, size: 7, image: '/img/fuschia.png', category: 'nike' },

  // Jordan
  { name: 'Nike Air Force 1 Jackie Robinson', tag: 'jackie', price: 300, size: 11, image: '/img/jackie.png', category: 'jordan' },
  { name: 'Nike KD 15 B.A.D', tag: 'kd', price: 290, size: 11, image: '/img/kd.png', category: 'jordan' },
  { name: 'Air Jordan 1 Low Doernbecher', tag: 'riddhi', price: 375, size: 8.5, image: '/img/riddhi.png', category: 'jordan' },
  { name: 'Air Jordan 3 Reimagined', tag: 'reimagined', price: 275, size: 10, image: '/img/reimagined.png', category: 'jordan' },
  { name: 'Air Jordan 4 Seafoam', tag: 'seafoam', price: 250, size: 5.5, image: '/img/seafoam.png', category: 'jordan' },
  { name: 'Air Jordan 4 Craft', tag: 'craft', price: 250, size: 11, image: '/img/craft.png', category: 'jordan' },

  // Yeezy
  { name: 'Adidas Yeezy Boost 350 Onyx', tag: 'onyx', price: 275, size: 10, image: '/img/onyx.png', category: 'yeezy' },
  { name: 'Adidas Yeezy Boost 350 Pirate Black', tag: 'pirate', price: 300, size: 10, image: '/img/pirate.png', category: 'yeezy' },
  { name: 'Adidas Yeezy Foam Runner Mx Cinder', tag: 'cinder', price: 150, size: 10, image: '/img/cinder.png', category: 'yeezy' },
  { name: 'Adidas Yeezy Slide Onyx', tag: 'slide', price: 150, size: 9, image: '/img/slide.png', category: 'yeezy' },
  { name: 'Adidas Yeezy Canvas', tag: 'canvas', price: 375, size: 12, image: '/img/canvas.png', category: 'yeezy' },
  { name: 'Adidas Yeezy Midnight Navy', tag: 'midnight', price: 300, size: 10.5, image: '/img/midnight.png', category: 'yeezy' },
]

export function getProductsByCategory(category: 'nike' | 'jordan' | 'yeezy') {
  return ALL_PRODUCTS.filter(p => p.category === category)
}

export function getProductByTag(tag: string) {
  return ALL_PRODUCTS.find(p => p.tag.toLowerCase() === tag.toLowerCase())
}
