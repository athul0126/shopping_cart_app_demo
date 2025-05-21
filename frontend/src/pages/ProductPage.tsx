import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Minus, Plus, ArrowLeft, ShoppingBag } from 'lucide-react';
import api from '../services/api';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';
import React from 'react';

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
  reviews: {
    _id: string;
    name: string;
    rating: number;
    comment: string;
    createdAt: string;
  }[];
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQty = () => {
    if (product && qty < product.countInStock) {
      setQty(qty + 1);
    }
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleAddToCart = async () => {
    if (product) {
      await addToCart(product._id, qty);
      toast.success(`Added ${qty} x ${product.name} to cart`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4">
          <p>{error || 'Product not found'}</p>
          <Link to="/" className="text-blue-500 hover:underline mt-2 inline-block">
            Go back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/" 
        className="inline-flex items-center text-gray-600 hover:text-blue-500 mb-6"
      >
        <ArrowLeft size={16} className="mr-1" /> Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-96 object-contain p-4" 
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>
          
          <div className="flex items-center mb-4">
            <div className="flex text-amber-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={20} 
                  fill={i < Math.round(product.rating) ? 'currentColor' : 'none'} 
                  className={i < Math.round(product.rating) ? 'text-amber-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-gray-600">{product.numReviews} reviews</span>
          </div>
          
          <p className="text-2xl font-bold text-gray-900 mb-4">
            ${product.price.toFixed(2)}
          </p>
          
          <div className="border-t border-b py-4 my-4">
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-gray-600 font-medium">Brand:</span>
              <span className="ml-2">{product.brand}</span>
            </div>
            <div>
              <span className="text-gray-600 font-medium">Category:</span>
              <span className="ml-2">{product.category}</span>
            </div>
            <div>
              <span className="text-gray-600 font-medium">Status:</span>
              <span className={`ml-2 ${product.countInStock > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
          
          {product.countInStock > 0 && (
            <div className="flex items-center mb-6">
              <span className="text-gray-600 font-medium mr-4">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={decreaseQty}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  disabled={qty <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-1 border-l border-r">{qty}</span>
                <button
                  onClick={increaseQty}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  disabled={qty >= product.countInStock}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}
          
          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className={`w-full flex justify-center items-center py-3 rounded-md font-medium transition-colors ${
              product.countInStock === 0
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <ShoppingBag size={20} className="mr-2" />
            {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
        
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div key={review._id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-2">
                  <span className="font-medium text-gray-800">{review.name}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex text-amber-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < review.rating ? 'currentColor' : 'none'} 
                      className={i < review.rating ? 'text-amber-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-500">No reviews yet</p>
          </div>
        )}
        
        {user ? (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Write a Review</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <select
                  id="rating"
                  className="form-input"
                  required
                >
                  <option value="">Select...</option>
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Good</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                  Comment
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  className="form-input"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Submit Review
              </button>
            </form>
          </div>
        ) : (
          <div className="mt-8 bg-blue-50 text-blue-700 p-4 rounded-md">
            <p>
              Please <Link to="/login" className="font-medium underline">sign in</Link> to write a review.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;