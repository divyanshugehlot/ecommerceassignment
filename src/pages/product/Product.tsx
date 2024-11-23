import React from "react";
import { useParams } from "react-router-dom";
import useProductById from "../../hooks/useProductById";
import { useCart } from "../../context/cartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  cartQuantity:number
}



const Product: React.FC = () => {
  
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || "0", 10);
  const { product, loading, error } = useProductById(productId);
  
  const { addToCart } = useCart();
  
  if (!product||loading) {
    return <div>Product is loading</div>;
  }
  const handleAddToCart = () => {
  
    
    const productWithQuantity: Product = { ...product, cartQuantity: 1 }; // Set initial cartQuantity to 1
    addToCart(productWithQuantity); 
  };
  return (
    <div className="container mx-auto p-4">
    
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      
      <div className="w-full md:w-1/2 lg:w-1/3">
        <img
          className="w-full h-auto object-cover rounded-lg"
          src={product.image}
          alt={product.title}
        />
      </div>

      
      <div className="w-full md:w-1/2 lg:w-2/3 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
        <p className="text-xl font-semibold text-indigo-600">₹{product.price}</p>
        <p className="text-lg text-gray-700">{product.description}</p>

        
        <button
        onClick={handleAddToCart}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  );
};

export default Product;
