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
    await updateProduct(id, formData);
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
    <form onSubmit={handleSubmit}>
      <h1>Edit Product</h1>
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
      <button type="submit">Update</button>
    </form>
  );
}
