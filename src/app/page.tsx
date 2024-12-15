import { getProducts } from '@/lib/api';
import ProductList from '../component/ProductList';

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <h1>Product List</h1>
      <ProductList initialProducts={products} />
    </div>
  );
}
