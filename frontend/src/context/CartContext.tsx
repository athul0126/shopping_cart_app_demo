import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (id: string, qty: number) => Promise<void>;
  removeFromCart: (id: string) => void;
  updateCartItemQty: (id: string, qty: number) => void;
  clearCart: () => void;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: async () => {},
  removeFromCart: () => {},
  updateCartItemQty: () => {},
  clearCart: () => {},
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
});

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCartItems = localStorage.getItem('cartItems');
      const parsed = savedCartItems ? JSON.parse(savedCartItems) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Failed to parse cartItems from localStorage:', error);
      return [];
    }
  });

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (id: string, qty: number) => {
    try {
      const existingItem = cartItems.find(item => item._id === id);
      if (existingItem) {
        updateCartItemQty(id, existingItem.qty + qty);
        toast.success('Cart updated');
        return;
      }

      const { data } = await api.get(`/api/products/${id}`);
      setCartItems([...cartItems, {
        _id: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      }]);
      toast.success('Item added to cart');
    } catch (error) {
      toast.error('Failed to add item to cart');
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item._id !== id));
    toast.success('Item removed from cart');
  };

  const updateCartItemQty = (id: string, qty: number) => {
    setCartItems(
      cartItems.map(item =>
        item._id === id ? { ...item, qty } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateCartItemQty,
      clearCart,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
