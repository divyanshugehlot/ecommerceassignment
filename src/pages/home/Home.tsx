import  { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../component/ProductCard";
import { useCategories, useProducts } from "../../hooks/useFilter";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categories, loading: categoriesLoading } = useCategories();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
const [ratingRange, setRatingRange] = useState<[number, number]>([0, 5]);
const [sort, setSort] = useState<string>("");

const updateFiltersInUrl = () => {
  const queryParams = new URLSearchParams();

  if (selectedCategories.length > 0) {
    queryParams.set("categories", selectedCategories.join(","));
  } else {
    queryParams.delete("categories"); // Remove the categories filter if none are selected
  }

  if (priceRange[0] !== 0 || priceRange[1] !== 100) {
    queryParams.set("price", `${priceRange[0]},${priceRange[1]}`);
  } else {
    queryParams.delete("price"); // Remove the price range filter if the default value is selected
  }

  if (ratingRange[0] !== 0 || ratingRange[1] !== 5) {
    queryParams.set("rating", `${ratingRange[0]},${ratingRange[1]}`);
  } else {
    queryParams.delete("rating"); // Remove the rating filter if the default value is selected
  }

  if (sort) {
    queryParams.set("sort", sort);
  } else {
    queryParams.delete("sort"); // Remove the sort filter if no sort is selected
  }

  navigate({ search: queryParams.toString() }); // Update the URL with query parameters
};
useEffect(() => {
  updateFiltersInUrl();
}, [selectedCategories, priceRange, ratingRange, sort]);

  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoriesParam = searchParams.get("categories");
    const sortParam = searchParams.get("sort");

    if (categoriesParam) {
      setSelectedCategories(categoriesParam.split(","));
    }

    if (sortParam) {
      setSortOption(sortParam);
    }
  }, [location.search]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category];
      return newCategories;
    });
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
  };

  const applyFilters = () => {
    const searchParams = new URLSearchParams();
    if (selectedCategories.length > 0) {
      searchParams.set("categories", selectedCategories.join(","));
    }
    if (sortOption) {
      searchParams.set("sort", sortOption);
    }
    navigate(`?${searchParams.toString()}`);
  };

  
  const { products, loading: productsLoading, error } = useProducts(selectedCategories, sortOption);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>

      
      <div className="mb-4">
        <h3 className="text-lg font-medium">Filter by Categories</h3>
        {categoriesLoading ? (
          <p>Loading categories...</p>
        ) : (
          categories.map((category) => (
            <label key={category} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              {category}
            </label>
          ))
        )}
      </div>

      
      <div className="mb-4">
        <h3 className="text-lg font-medium">Sort by</h3>
        <select
          onChange={(e) => handleSortChange(e.target.value)}
          value={sortOption}
          className="p-2 border border-gray-300"
        >
          <option value="">Select</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
        </select>
      </div>

      
      <button
        onClick={applyFilters}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Apply Filters
      </button>

      {/* Display Products */}
      {productsLoading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              description={product.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
