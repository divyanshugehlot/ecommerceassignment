import React from "react";
import Header from "./Header"; // Import your Header component
import { useCart } from "../context/CartContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const {cartTotalQuantity} = useCart()
  return (
    <div>
      <Header totalCartItems={cartTotalQuantity}  /> {/* This renders the Header on every page */}
      <main className="container mx-auto p-4">{children}</main> {/* The page content */}
    </div>
  );
};

export default Layout;
