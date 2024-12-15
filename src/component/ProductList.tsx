'use client';

import { useState } from 'react';
import { deleteProduct } from '@/lib/api';
import Link from 'next/link';

export default function ProductList({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState(initialProducts);

  const handleDelete = async (id: string) => {
    try {
      console.log(`Attempting to delete product with ID: ${id}`);
      const response = await deleteProduct(id);
      console.log('Delete API Response:', response);

      if (response?.data?.acknowledged && response?.data?.deletedCount === 1) {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
      } else {
        alert('Failed to delete the product. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Something went wrong while deleting the product.');
    }
  };

  if (products.length === 0) {
    return (
      <div>
        <p>No products available.</p>
        <Link href="/add">
          <button style={{ background: 'green', color: 'white' }}>Add Product</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/add">
          <button style={{ background: 'green', color: 'white' }}>Add Product</button>
        </Link>
      </div>
      {products.map((product: any) => (
        <div key={product._id} className="product">
          <h3>{product.ProductName}</h3>
          <p>Price: ${product.UnitPrice}</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link href={`/edit/${product._id}`}>
              <button style={{ background: 'blue', color: 'white' }}>Edit</button>
            </Link>
            <button
              style={{ background: 'red', color: 'white' }}
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
