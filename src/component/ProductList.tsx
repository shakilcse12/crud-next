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
    <div className="container mx-auto p-4">
    <div className="p-4">
  {/* Card Wrapper */}
  <div className="border rounded-lg shadow-md bg-white overflow-hidden">
    {/* Table Title */}
    <div className="bg-gray-100 p-4 border-b">
      <h2 className="text-xl font-semibold text-gray-700">Product List</h2>
    </div>

    {/* Table */}
    <table className="w-full text-center">
      <thead className="bg-gray-50 text-gray-600">
        <tr>
          <th className="p-3 border-b">Product</th>
          <th className="p-3 border-b">Unit Price</th>
          <th className="p-3 border-b">QTY</th>
          <th className="p-3 border-b">Total Price</th>
          <th className="p-3 border-b">Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product: any) => (
          <tr key={product._id} className="hover:bg-gray-50">
            {/* Product Image & Name */}
            <td className="p-3 border-b flex items-center gap-3 justify-center">
              <img
                src="https://via.placeholder.com/50" // Placeholder image
                alt="Product"
                className="w-12 h-12 rounded-md object-cover"
              />
              <div>
                <span className="font-medium text-gray-700">
                  {product.ProductName}
                </span>
                <p className="text-gray-500 text-sm">
                  {product.Description || 'N/A'}
                </p>
              </div>
            </td>
            {/* Unit Price */}
            <td className="p-3 border-b text-gray-600">
              ${product.UnitPrice || 0}
            </td>
            {/* Quantity */}
            <td className="p-3 border-b text-gray-600">
              {product.Quantity || 0}
            </td>
            {/* Total Price */}
            <td className="p-3 border-b text-gray-700 font-medium">
              $
              {Number(product.UnitPrice || 0) * Number(product.Quantity || 0)}
            </td>
            {/* Action Buttons */}
            <td className="p-3 border-b">
              <div className="flex justify-center gap-2">
                <Link href={`/edit/${product._id}`}>
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
                    <i className="fas fa-edit"></i>
                  </button>
                </Link>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(product._id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

</div>
  );
}
