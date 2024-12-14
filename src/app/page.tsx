import { getProducts } from '@/lib/api';
import Link from 'next/link';

export default async function Home() {
  let products = [];

  try {
    products = await getProducts(); // Fetch products from API
  } catch (error) {
    console.error('Error fetching products:', error);
    products = [];
  }

  // Safeguard: Ensure `products` is an array
  if (!Array.isArray(products)) {
    console.error('Expected an array but got:', products);
    products = [];
  }

  return (
    <div>
      <h1>Product List</h1>
      <Link href="/add">
        <button style={{ background: 'green', color: 'white' }}>Add Product</button>
      </Link>
      <div>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product: any) => (
            <div key={product._id} className="product">
              <h3>{product.ProductName}</h3>
              <p>Price: ${product.UnitPrice}</p>
              <button style={{ background: 'blue', color: 'white' }}>
                <Link href={`/edit/${product._id}`}>Edit</Link>
              </button>
              <button style={{ background: 'red', color: 'white' }}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
