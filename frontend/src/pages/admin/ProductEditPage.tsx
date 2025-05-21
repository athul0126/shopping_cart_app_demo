import React from 'react';
import { useParams } from 'react-router-dom';

const ProductEditPage = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Edit Product - {id}</h1>
      <p>Edit form will go here.</p>
    </div>
  );
};

export default ProductEditPage;
