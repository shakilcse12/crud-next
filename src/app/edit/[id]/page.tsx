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
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(formData)
          .filter((key) => key !== '_id' && key !== 'CreatedDate')
          .map((key) => (
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
        Update
      </button>
    </form>
  );
}
