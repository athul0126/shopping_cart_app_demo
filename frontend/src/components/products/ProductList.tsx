import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import api from '../../services/api';
import { Search, Filter } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

interface ProductListProps {
  keyword?: string;
  category?: string;
}

const ProductList: React.FC<ProductListProps> = ({ keyword, category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (keyword) params.append('keyword', keyword);
        if (category) params.append('category', category);

        const { data } = await api.get(`/api/products?${params.toString()}`);
        console.log('Fetched products:', data);

        const productsArray = Array.isArray(data) ? data : data.products;
        setProducts(Array.isArray(productsArray) ? productsArray : []);

        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword, category]);

  // Apply filters and sorting
  const filteredProducts = products
    .filter(product => {
      if (!filter) return true;
      return product.category === filter;
    })
    .sort((a, b) => {
      if (!sort) return 0;
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating-desc') return b.rating - a.rating;
      return 0;
    });

  // Get unique categories
  const categories = [...new Set(products.map(p => p.category))];

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          {keyword ? `Search Results for "${keyword}"` : 'Latest Products'}
        </h2>

        <button
          onClick={toggleFilters}
          className="flex items-center text-gray-600 md:hidden"
        >
          <Filter size={18} className="mr-1" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className={`flex flex-col w-full md:flex-row md:w-auto ${showFilters ? 'block' : 'hidden md:flex'} mt-4 md:mt-0 space-y-3 md:space-y-0 md:space-x-3`}>
          {/* Category filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Sort options */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Top Rated</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <Search size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
          <p className="text-gray-500">Try changing your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
