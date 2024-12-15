import { deleteProduct } from '@/lib/api';
import { redirect } from 'next/navigation';

export default async function DeleteProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  console.log(`Attempting to delete product with ID: ${id}`);
    let resp = null;
  try {
    const response = await deleteProduct(id);
    resp = response;
    console.log('Delete API Response:', response);

    if (response?.data?.acknowledged && response?.data?.deletedCount === 1) {
      redirect('/'); // Redirect on successful deletion
    } else {
      console.error('Failed to delete the product:', response);
      return <p>Failed to delete the product. Please try again.</p>;
    }
  } catch (error) {
    if (resp?.data?.acknowledged && resp?.data?.deletedCount === 1) {
        redirect('/'); // Redirect on successful deletion
      } 
    console.error('Error deleting product:', error);
    return <p>Something went wrong while deleting the product.</p>;
  }
}
