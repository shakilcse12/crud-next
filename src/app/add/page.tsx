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
    <form onSubmit={handleSubmit}>
      <h1>Add Product</h1>
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label>{key}</label>
          <input
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
