import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Facebook, Twitter, Instagram, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Package className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">ShopCart</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your one-stop shop for all your shopping needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition duration-300">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/?category=Electronics" className="text-gray-400 hover:text-white transition duration-300">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/?category=Clothing" className="text-gray-400 hover:text-white transition duration-300">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/?category=Home+Appliances" className="text-gray-400 hover:text-white transition duration-300">
                  Home Appliances
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition duration-300">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition duration-300">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition duration-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest product updates and offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 rounded-l-md w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-md transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} ShopCart. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition duration-300">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition duration-300">
              Terms of Service
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition duration-300">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;