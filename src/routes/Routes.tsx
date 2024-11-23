import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Product from "../pages/product/Product";
import Cart from "../pages/cart/Cart";
import Layout from "../component/Layout";




const AppRoutes: React.FC = () => {
    
  return (
    <Router>
        <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
