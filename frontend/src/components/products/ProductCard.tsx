import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import CartContext from '../../context/CartContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: {
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
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = async () => {
    if (product.countInStock > 0) {
      await addToCart(product._id, 1);
    } else {
      toast.error('Sorry, this product is out of stock');
    }
  };

  return (
    <div className="card group transform transition-transform duration-300 hover:-translate-y-1">
      <Link to={`/product/${product._id}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="card-img transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-medium text-gray-800 hover:text-blue-500 transition duration-300 mb-1 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mb-2 line-clamp-1">
          {product.brand}
        </p>
        
        <div className="flex items-center mb-2">
          <div className="flex text-amber-400 mr-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}
                className={i < Math.round(product.rating) ? 'text-amber-400' : 'text-gray-300'} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({product.numReviews})</span>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          
          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className={`p-2 rounded-full transition duration-300 ${
              product.countInStock === 0
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-blue-100 hover:bg-blue-500 hover:text-white text-blue-500'
            }`}
            aria-label="Add to cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
        
        {product.countInStock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
            Out of Stock
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;