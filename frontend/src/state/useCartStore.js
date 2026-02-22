import { create } from 'zustand';

export const useCartStore = create((set) => ({
  itemCount: 0,
  items: [],
  setItemCount: (count) => set({ itemCount: count }),
  setItems: (items) => set({ 
    items, 
    itemCount: items.length 
  }),
  clearCart: () => set({ items: [], itemCount: 0 }),
}));
