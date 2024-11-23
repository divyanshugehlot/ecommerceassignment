import { useState, useEffect } from "react";
import axios from "axios";


export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://fakestoreapi.com/products/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
};


export const useProducts = (categories: string[], sort: string) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = "https://fakestoreapi.com/products";

        if (categories.length > 0) {
          url = `https://fakestoreapi.com/products/category/${categories.join(",")}`;
        }

        const response = await axios.get(url);
        let fetchedProducts = response.data;

        // Sorting logic
        if (sort === "price-asc") {
          fetchedProducts = fetchedProducts.sort((a: any, b: any) => a.price - b.price);
        } else if (sort === "price-desc") {
          fetchedProducts = fetchedProducts.sort((a: any, b: any) => b.price - a.price);
        } else if (sort === "title-asc") {
          fetchedProducts = fetchedProducts.sort((a: any, b: any) => a.title.localeCompare(b.title));
        } else if (sort === "title-desc") {
          fetchedProducts = fetchedProducts.sort((a: any, b: any) => b.title.localeCompare(a.title));
        }

        setProducts(fetchedProducts);
      } catch (error) {
        setError("Error fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categories, sort]);

  return { products, loading, error };
};
