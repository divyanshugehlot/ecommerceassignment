import { useState, useEffect } from "react";
import axios from "axios";

// Define the product type based on the structure from the API
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

// Custom hook to fetch a single product by its ID
const useProductById = (productId: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data); 
      } catch (err) {
        setError("Error fetching product details");
      } finally {
        setLoading(false); 
      }
    };

    fetchProduct();
  }, [productId]); 

  return { product, loading, error };
};

export default useProductById;
