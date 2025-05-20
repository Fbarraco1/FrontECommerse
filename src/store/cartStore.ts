import { create } from "zustand";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  size: string; 
  color: string; 
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}

const getCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

export const useCartStore = create<CartState>((set) => ({
  items: getCartFromLocalStorage(),
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      const updatedItems = existingItem
        ? state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { ...item, quantity: 1 }];
      
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { items: updatedItems };
    }),
  removeItem: (id) =>
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { items: updatedItems };
    }),
  increaseQuantity: (id) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { items: updatedItems };
    }),
  decreaseQuantity: (id) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { items: updatedItems };
    }),
}));
