import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import React from 'react';

const CartPage = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateCartItemQty,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=checkout');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="mb-4">
            <ShoppingCart size={64} className="mx-auto text-gray-400" />
          </div>
          <h2 className="text-xl font-medium text-gray-700 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/" className="btn btn-primary inline-flex items-center">
            Continue Shopping <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item._id} className="p-4 sm:p-6 flex flex-col sm:flex-row">
                    <div className="flex-shrink-0 mr-6 mb-4 sm:mb-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                        <Link 
                          to={`/product/${item._id}`} 
                          className="text-lg font-medium text-gray-800 hover:text-blue-500"
                        >
                          {item.name}
                        </Link>
                        <span className="text-gray-900 font-medium sm:ml-4">
                          ${(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4">
                        <div className="flex items-center mb-4 sm:mb-0">
                          <button
                            onClick={() => item.qty > 1 && updateCartItemQty(item._id, item.qty - 1)}
                            className={`p-1 rounded-full border ${
                              item.qty <= 1 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                            }`}
                            disabled={item.qty <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="mx-3 w-8 text-center">{item.qty}</span>
                          <button
                            onClick={() => 
                              item.qty < item.countInStock && 
                              updateCartItemQty(item._id, item.qty + 1)
                            }
                            className={`p-1 rounded-full border ${
                              item.qty >= item.countInStock ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                            }`}
                            disabled={item.qty >= item.countInStock}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="flex items-center text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 size={16} className="mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="border-b pb-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800">${itemsPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-800">${taxPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-800">${shippingPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-lg font-bold text-gray-800">${totalPrice.toFixed(2)}</span>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full btn btn-primary"
              >
                Proceed to Checkout
              </button>
              
              <div className="mt-4">
                <Link 
                  to="/"
                  className="text-blue-500 hover:text-blue-700 text-sm flex items-center justify-center"
                >
                  <ArrowRight size={16} className="mr-1 transform rotate-180" /> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;