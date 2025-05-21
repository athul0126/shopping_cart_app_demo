import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import OrderPage from './pages/OrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminProductListPage from  './pages/admin/ProductListPage';
import AdminProductEditPage from './pages/admin/ProductEditPage';
import AdminOrderListPage from './pages/admin/OrderListPage';
import AdminUserListPage from './pages/admin/UserListPage';

// Private Route Component
import PrivateRoute from './components/routes/PrivateRoute';
import AdminRoute from './components/routes/AdminRoute';
import React from 'react';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Private Routes */}
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />
          <Route path="/checkout" element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          } />
          <Route path="/order/:id" element={
            <PrivateRoute>
              <OrderPage />
            </PrivateRoute>
          } />
          <Route path="/order-history" element={
            <PrivateRoute>
              <OrderHistoryPage />
            </PrivateRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/products" element={
            <AdminRoute>
              <AdminProductListPage />
            </AdminRoute>
          } />
          <Route path="/admin/product/:id/edit" element={
            <AdminRoute>
              <AdminProductEditPage />
            </AdminRoute>
          } />
          <Route path="/admin/orders" element={
            <AdminRoute>
              <AdminOrderListPage />
            </AdminRoute>
          } />
          <Route path="/admin/users" element={
            <AdminRoute>
              <AdminUserListPage />
            </AdminRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;