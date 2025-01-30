import create from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  totalItems: 0,
  totalAmount: 0,

  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      
      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalAmount: state.totalAmount + product.price,
        };
      }

      return {
        items: [...state.items, { ...product, quantity: 1 }],
        totalItems: state.totalItems + 1,
        totalAmount: state.totalAmount + product.price,
      };
    }),

  removeItem: (productId) =>
    set((state) => {
      const item = state.items.find((item) => item.id === productId);
      if (!item) return state;

      const updatedItems = state.items.filter((item) => item.id !== productId);
      return {
        items: updatedItems,
        totalItems: state.totalItems - item.quantity,
        totalAmount: state.totalAmount - (item.price * item.quantity),
      };
    }),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === productId) {
          const quantityDiff = quantity - item.quantity;
          return { ...item, quantity };
        }
        return item;
      });

      const newTotalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalAmount = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        items: updatedItems,
        totalItems: newTotalItems,
        totalAmount: newTotalAmount,
      };
    }),

  clearCart: () =>
    set({
      items: [],
      totalItems: 0,
      totalAmount: 0,
    }),
}));

export default useCartStore;