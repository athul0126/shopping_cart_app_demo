import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-blue-500">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-800">Page Not Found</h2>
        <p className="mt-2 text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/"
          className="inline-flex items-center btn btn-primary px-6 py-3"
        >
          <Home size={20} className="mr-2" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;