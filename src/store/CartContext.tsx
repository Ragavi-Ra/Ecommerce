import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Text } from 'react-native';

export type SubscriptionType = 'weekend' | 'weekday' | 'random' | null;

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  discountPercentage?: number;
}

export const DummyComponent = () => <Text>Dummy</Text>;

interface CartContextType {
  cart: CartItem[];
  subscriptionType: SubscriptionType;
  selectedDates: string[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  setSubscriptionType: (type: SubscriptionType) => void;
  setSelectedDates: (dates: string[]) => void;
  calculateTotals: () => {
    basePrice: number;
    productDiscountPercent: number;
    subscriptionDiscountPercent: number;
    appliedDiscountPercent: number;
    finalPrice: number;
  };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [subscriptionType, setSubscriptionTypeState] = useState<SubscriptionType>(null);
  const [selectedDates, setSelectedDatesState] = useState<string[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: item.quantity ?? 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setSubscriptionTypeState(null);
    setSelectedDatesState([]);
  };

  const setSubscriptionType = (type: SubscriptionType) => {
    setSubscriptionTypeState(type);
    setSelectedDatesState([]);
  };

  const setSelectedDates = (dates: string[]) => {
    setSelectedDatesState(dates);
  };

  const calculateTotals = () => {
    let basePrice = 0;
    let productDiscountPercent = 0;
    cart.forEach((item) => {
      const disc = item.discountPercentage ?? 0;
      productDiscountPercent = Math.max(productDiscountPercent, disc);
      const priceAfterProductDisc = item.price * (1 - disc / 100);
      basePrice += priceAfterProductDisc * item.quantity;
    });

    let subscriptionDiscountPercent = 0;
    if (selectedDates.length === 5) subscriptionDiscountPercent = 10;
    else if (selectedDates.length === 10) subscriptionDiscountPercent = 15;

    const appliedDiscountPercent = Math.max(productDiscountPercent, subscriptionDiscountPercent);

    const finalPrice = basePrice * (1 - appliedDiscountPercent / 100);

    return {
      basePrice,
      productDiscountPercent,
      subscriptionDiscountPercent,
      appliedDiscountPercent,
      finalPrice,
    };
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        subscriptionType,
        selectedDates,
        addToCart,
        removeFromCart,
        clearCart,
        setSubscriptionType,
        setSelectedDates,
        calculateTotals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
