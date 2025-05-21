import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, LogOut, Package } from 'lucide-react';
import AuthContext from '../../context/AuthContext';
import CartContext from '../../context/CartContext';
import React from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?keyword=${searchTerm}`);
      setSearchTerm('');
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Package className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-gray-800">ShopCart</span>
          </Link>

          {/* Search - Desktop */}
          <div className="hidden md:block flex-grow max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-500">
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="flex items-center text-gray-700 hover:text-blue-500 relative">
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-500">
                  <User size={24} className="mr-1" />
                  <span className="font-medium">{user.name.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block fade-in">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/order-history" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  {user.isAdmin && (
                    <>
                      <div className="border-t border-gray-100 my-1"></div>
                      <Link 
                        to="/admin/products" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Products
                      </Link>
                      <Link 
                        to="/admin/orders" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Orders
                      </Link>
                      <Link 
                        to="/admin/users" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Users
                      </Link>
                    </>
                  )}
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="mr-4 text-gray-700 hover:text-blue-500 relative">
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 slide-in">
            <form onSubmit={handleSearch} className="mb-4 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-500">
                <Search size={20} />
              </button>
            </form>
            
            <nav className="flex flex-col space-y-3">
              {user ? (
                <>
                  <div className="py-2 border-b border-gray-200">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <Link 
                    to="/profile" 
                    className="text-gray-700 hover:text-blue-500 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/order-history" 
                    className="text-gray-700 hover:text-blue-500 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Order History
                  </Link>
                  {user.isAdmin && (
                    <>
                      <div className="py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-500">Admin</p>
                      </div>
                      <Link 
                        to="/admin/products" 
                        className="text-gray-700 hover:text-blue-500 py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Products
                      </Link>
                      <Link 
                        to="/admin/orders" 
                        className="text-gray-700 hover:text-blue-500 py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Orders
                      </Link>
                      <Link 
                        to="/admin/users" 
                        className="text-gray-700 hover:text-blue-500 py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Users
                      </Link>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-700 hover:text-blue-500 py-1"
                  >
                    <LogOut size={20} className="mr-2" /> Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="btn btn-primary inline-block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;