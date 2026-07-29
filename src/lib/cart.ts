export type CartItem = {
  slug: string;
  quantity: number;
};

export const CART_STORAGE_KEY = 'paw-cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('cart:updated'));
}

export function addToCart(slug: string) {
  const cart = getCart();
  const existing = cart.find((item) => item.slug === slug);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ slug, quantity: 1 });
  }

  setCart(cart);
  return cart;
}

export function updateCartItem(slug: string, quantity: number) {
  const cart = getCart().filter((item) => item.slug !== slug);

  if (quantity > 0) {
    cart.push({ slug, quantity });
  }

  setCart(cart);
  return cart;
}

export function removeFromCart(slug: string) {
  const cart = getCart().filter((item) => item.slug !== slug);
  setCart(cart);
  return cart;
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartItemsForProducts<T extends { slug: string; name: string; price: number }>(products: T[]) {
  return getCart()
    .map((item) => {
      const product = products.find((entry) => entry.slug === item.slug);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);
}
