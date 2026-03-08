import { create } from 'zustand';
import { Pet, CartItem } from '../types';

interface PetStore {
  pets: Pet[];
  addPet: (pet: Pet) => void;
  removePet: (id: string) => void;

  cart: CartItem[];
  addToCart: (pet: Pet) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;

  randomDogImage: string | null;
  setRandomDogImage: (url: string) => void;
  isFetchingDogImage: boolean;
  setIsFetchingDogImage: (val: boolean) => void;
}

export const usePetStore = create<PetStore>((set, get) => ({
  pets: [
    {
      id: '1',
      name: 'Test Dog one',
      breed: 'Golden Retriever',
      age: '2',
      price: 1200,
      image: null,
    },
    {
      id: '2',
      name: 'Test Dog Two',
      breed: 'Golden Retriever',
      age: '1',
      price: 900,
      image: null,
    },
    {
      id: '3',
      name: 'Test Dog Three',
      breed: 'Golden Retriever',
      age: '3',
      price: 750,
      image: null,
    },
  ],

  addPet: (pet) =>
    set((state) => ({ pets: [pet, ...state.pets] })),

  removePet: (id) =>
    set((state) => ({ pets: state.pets.filter((p) => p.id !== id) })),

  cart: [],

  addToCart: (pet) =>
    set((state) => {
      const existing = state.cart.find((c) => c.id === pet.id);
      if (existing) {
        return {
          cart: state.cart.map((c) =>
            c.id === pet.id ? { ...c, quantity: c.quantity + 1 } : c,
          ),
        };
      }
      return { cart: [...state.cart, { ...pet, quantity: 1 }] };
    }),

  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((c) => c.id !== id) })),

  increaseQty: (id) =>
    set((state) => ({
      cart: state.cart.map((c) =>
        c.id === id ? { ...c, quantity: c.quantity + 1 } : c,
      ),
    })),

  decreaseQty: (id) =>
    set((state) => ({
      cart: state.cart
        .map((c) =>
          c.id === id ? { ...c, quantity: c.quantity - 1 } : c,
        )
        .filter((c) => c.quantity > 0),
    })),

  clearCart: () => set({ cart: [] }),

  cartTotal: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  cartCount: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  randomDogImage: null,
  setRandomDogImage: (url) => set({ randomDogImage: url }),
  isFetchingDogImage: false,
  setIsFetchingDogImage: (val) => set({ isFetchingDogImage: val }),
}));
