'use client';

import { createProduct } from '@/lib/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    Img: '',
    ProductCode: '',
    ProductName: '',
    Qty: '',
    TotalPrice: '',
    UnitPrice: '',
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProduct(formData);
    router.push('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
  <h1 className="text-2xl font-semibold mb-6">Add Product</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {Object.keys(formData).map((key) => (
      <div key={key} className="flex flex-col">
        <label className="text-gray-700 font-medium mb-2">{key}</label>
        <input
          type="text"
          name={key}
          value={formData[key]}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-lg"
        />
      </div>
    ))}
  </div>
  <button
    type="submit"
    className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
  >
    Submit
  </button>
</form>

  );
}
