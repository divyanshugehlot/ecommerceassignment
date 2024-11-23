import React from "react";
import { Link } from "react-router-dom"; 
import { useCart } from "../context/cartContext";
interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  description:string
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image ,id,description}) => {

  const { addToCart } = useCart(); // Destructure the addToCart function from context

  // Handle Add to Cart button click
  const handleAddToCart = () => {
    const product = { id, title, price, image, description }; // Create a product object
    addToCart(product); // Add the product to the cart via context
  };
  return (
    <>
    
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-contain rounded-lg " src={image} alt={title} />
      <div className="p-4">
      <Link to={`/product/${id}`} className="block" >
        <h2 className="text-xl font-semibold text-gray-800 truncate">{title}</h2>
        <p className="text-lg text-gray-500 mt-2">₹{price}</p>
        </Link>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
    
    
    </>
  );
};

export default ProductCard;
