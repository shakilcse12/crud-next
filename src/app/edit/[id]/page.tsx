'use client';

import { updateProduct, getProducts } from '@/lib/api';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type FormData = {
  [key: string]: string;
};

export default function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const [formData, setFormData] = useState<FormData>({});
  const [id, setId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const productList = await getProducts();
        const product = productList.find((p: any) => p._id === id);
        setFormData(product || {});
      };
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProduct(id!, formData);
    router.push('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: FormData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!formData || Object.keys(formData).length === 0) return <div>Loading...</div>;

  return (
    <form
  onSubmit={handleSubmit}
  className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200"
>
  <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
    Edit Product
  </h1>
  {Object.keys(formData)
  .filter((key) => key !== '_id' && key !== 'CreatedDate') // Exclude '_id' field
  .map((key) => (
    <div key={key} className="mb-4">
      <label
        htmlFor={key}
        className="block text-sm font-medium text-gray-700 capitalize"
      >
        {key.replace(/([A-Z])/g, ' $1')} {/* Adds spaces for camelCase */}
      </label>
      <input
        type="text"
        id={key}
        name={key}
        value={formData[key]}
        onChange={handleChange}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder={`Enter ${key}`}
        required
      />
    </div>
  ))}
  <button
    type="submit"
    className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
  >
    Update Product
  </button>
</form>

  );
}
