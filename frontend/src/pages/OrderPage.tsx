import React from 'react';
import { useParams } from 'react-router-dom';

const OrderPage = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Order Details - {id}</h1>
      <p>Order information will be shown here.</p>
    </div>
  );
};

export default OrderPage;
