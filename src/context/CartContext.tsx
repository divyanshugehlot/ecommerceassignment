import React, { createContext, useState, useEffect, ReactNode } from "react";
import { toast } from "react-toastify";

// Define types for the cart state
interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  cartQuantity: number;
  description:string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
  addToCart: (product: CartItem) => void;
  decreaseCart: (product: CartItem) => void;
  removeFromCart: (product: CartItem) => void;
  getTotals: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems") || "")
      : []
  );
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);

  // Add item to cart
  const addToCart = (product: CartItem) => {
    const existingIndex = cartItems.findIndex((item) => item.id === product.id);
    if (existingIndex >= 0) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingIndex] = {
        ...updatedCartItems[existingIndex],
        cartQuantity: updatedCartItems[existingIndex].cartQuantity + 1,
      };
      setCartItems(updatedCartItems);
      toast.info("Increased product quantity", {
        position: "bottom-left",
      });
    } else {
      setCartItems([...cartItems, { ...product, cartQuantity: 1 }]);
      toast.success("Product added to cart", {
        position: "bottom-left",
      });
    }
  };

  // Decrease item quantity in cart
  const decreaseCart = (product: CartItem) => {
    const itemIndex = cartItems.findIndex((item) => item.id === product.id);
    if (cartItems[itemIndex].cartQuantity > 1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].cartQuantity -= 1;
      setCartItems(updatedCartItems);
      toast.info("Decreased product quantity", {
        position: "bottom-left",
      });
    } else if (cartItems[itemIndex].cartQuantity === 1) {
      const updatedCartItems = cartItems.filter(
        (item) => item.id !== product.id
      );
      setCartItems(updatedCartItems);
      toast.error("Product removed from cart", {
        position: "bottom-left",
      });
    }
  };

  // Remove product from cart
  const removeFromCart = (product: CartItem) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCartItems);
    toast.error("Product removed from cart", {
      position: "bottom-left",
    });
  };

  // Calculate total quantity and amount
  const getTotals = () => {
    let total = 0;
    let quantity = 0;
    cartItems.forEach((cartItem) => {
      total += cartItem.price * cartItem.cartQuantity;
      quantity += cartItem.cartQuantity;
    });
    total = parseFloat(total.toFixed(2));
    setCartTotalQuantity(quantity);
    setCartTotalAmount(total);
  };

  // Clear all items from the cart
  const clearCart = () => {
    setCartItems([]);
    toast.error("Cart cleared", { position: "bottom-left" });
  };

  // Sync cart with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    getTotals();
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotalQuantity,
        cartTotalAmount,
        addToCart,
        decreaseCart,
        removeFromCart,
        getTotals,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
