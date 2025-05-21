import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Check } from 'lucide-react';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import React from 'react';

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const { cartItems, itemsPrice, taxPrice, shippingPrice, totalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handlers for shipping form
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep(2);
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  // Handler for payment method
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep(3);
  };

  // Handler for place order
  const handlePlaceOrder = async () => {
    try {
      const { data } = await api.post('/api/orders', {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id,
        })),
        shippingAddress,
        paymentMethod,
        totalPrice,
      });
      
      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/order/${data._id}`);
    } catch (error) {
      toast.error('Failed to place order.');
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
      
      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex flex-col items-center ${activeStep >= 1 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              activeStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              <Truck size={20} />
            </div>
            <span className="text-sm font-medium">Shipping</span>
          </div>
          
          <div className={`flex-1 h-1 mx-2 ${activeStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
          
          <div className={`flex flex-col items-center ${activeStep >= 2 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              activeStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              <CreditCard size={20} />
            </div>
            <span className="text-sm font-medium">Payment</span>
          </div>
          
          <div className={`flex-1 h-1 mx-2 ${activeStep >= 3 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
          
          <div className={`flex flex-col items-center ${activeStep >= 3 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              activeStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              <Check size={20} />
            </div>
            <span className="text-sm font-medium">Place Order</span>
          </div>
        </div>
      </div>
      
      {/* Shipping Address Form */}
      {activeStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Address</h2>
            <form onSubmit={handleShippingSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleShippingChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleShippingChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleShippingChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleShippingChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="mt-6 w-full btn btn-primary"
              >
                Continue to Payment
              </button>
            </form>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between">
                  <div className="flex items-center">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-10 h-10 object-cover mr-2" 
                    />
                    <span className="text-gray-700">
                      {item.name} <span className="text-gray-500">x{item.qty}</span>
                    </span>
                  </div>
                  <span className="text-gray-900">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-800">${taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-800">${shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Payment Method */}
      {activeStep === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>
            <form onSubmit={handlePaymentSubmit}>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    checked={paymentMethod === 'PayPal'}
                    onChange={() => setPaymentMethod('PayPal')}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                    PayPal or Credit Card
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="stripe"
                    name="paymentMethod"
                    type="radio"
                    checked={paymentMethod === 'Stripe'}
                    onChange={() => setPaymentMethod('Stripe')}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="stripe" className="ml-3 block text-sm font-medium text-gray-700">
                    Stripe
                  </label>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="btn btn-secondary"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Continue to Review
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            {/* Same order summary as before */}
            <div className="space-y-2 mb-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between">
                  <div className="flex items-center">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-10 h-10 object-cover mr-2" 
                    />
                    <span className="text-gray-700">
                      {item.name} <span className="text-gray-500">x{item.qty}</span>
                    </span>
                  </div>
                  <span className="text-gray-900">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-800">${taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-800">${shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Place Order */}
      {activeStep === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Review</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Shipping Address</h3>
                <p className="text-gray-600">
                  {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Payment Method</h3>
                <p className="text-gray-600">{paymentMethod}</p>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Order Items</h3>
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between">
                      <div className="flex items-center">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-10 h-10 object-cover mr-2" 
                        />
                        <span className="text-gray-700">
                          {item.name} <span className="text-gray-500">x{item.qty}</span>
                        </span>
                      </div>
                      <span className="text-gray-900">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="btn btn-secondary"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="btn btn-primary"
              >
                Place Order
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            {/* Same order summary as before */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Items</span>
                <span className="text-gray-800">${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-800">${taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-800">${shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 p-4 rounded-md">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Note:</span> This is a demo checkout. No real payments will be processed.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;