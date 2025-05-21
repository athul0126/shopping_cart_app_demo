import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import { ArrowRight } from 'lucide-react';
import React from 'react';

const HomePage = () => {
  const location = useLocation();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchKeyword = searchParams.get('keyword') || '';
    const searchCategory = searchParams.get('category') || '';
    
    setKeyword(searchKeyword);
    setCategory(searchCategory);
  }, [location.search]);

  return (
    <div>
      {/* Hero Section */}
      {!keyword && !category && (
        <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Shop the Latest Products at Unbeatable Prices
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                Discover amazing deals on electronics, clothing, and more with our extensive collection of quality products.
              </p>
              <a 
                href="#products" 
                className="inline-flex items-center btn bg-white text-blue-600 hover:bg-blue-50 font-medium text-lg px-6 py-3 rounded-md transition-all duration-300"
              >
                Shop Now <ArrowRight className="ml-2" size={20} />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      {!keyword && !category && (
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="/?category=Electronics" className="group">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden transition duration-300 group-hover:shadow-md">
                  <div className="h-32 bg-blue-100 flex items-center justify-center">
                    <span className="text-4xl">🎧</span>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-medium">Electronics</h3>
                  </div>
                </div>
              </a>
              <a href="/?category=Clothing" className="group">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden transition duration-300 group-hover:shadow-md">
                  <div className="h-32 bg-orange-100 flex items-center justify-center">
                    <span className="text-4xl">👕</span>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-medium">Clothing</h3>
                  </div>
                </div>
              </a>
              <a href="/?category=Kitchen" className="group">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden transition duration-300 group-hover:shadow-md">
                  <div className="h-32 bg-green-100 flex items-center justify-center">
                    <span className="text-4xl">🍳</span>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-medium">Kitchen</h3>
                  </div>
                </div>
              </a>
              <a href="/?category=Home+Appliances" className="group">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden transition duration-300 group-hover:shadow-md">
                  <div className="h-32 bg-purple-100 flex items-center justify-center">
                    <span className="text-4xl">🏠</span>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-medium">Home Appliances</h3>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section id="products" className="py-10">
        <div className="container mx-auto px-4">
          <ProductList keyword={keyword} category={category} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;