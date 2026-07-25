import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      
      addToCart: (item) => {
        set((state) => {
          const existItem = state.cartItems.find((x) => x.product === item.product);
          if (existItem) {
            return {
              cartItems: state.cartItems.map((x) =>
                x.product === existItem.product ? item : x
              ),
            };
          } else {
            return { cartItems: [...state.cartItems, item] };
          }
        });
      },

      removeFromCart: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((x) => x.product !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          cartItems: state.cartItems.map((x) =>
            x.product === id ? { ...x, quantity: Number(quantity) } : x
          ),
        }));
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      getCartTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce((acc, item) => acc + item.priceAtPurchase * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useCartStore;
