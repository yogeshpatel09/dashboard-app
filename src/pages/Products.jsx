import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6 space-y-6">

      <div className="mb-4">
        <h1 className="text-2xl font-bold text-green-900">Products</h1>
        <p className="text-gray-500">Browse all available products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-green-50 border border-green-100 rounded-xl p-4 shadow hover:shadow-lg transition duration-200 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-contain mb-4"
            />

            <h3 className="font-semibold text-green-900 line-clamp-2 mb-1">
              {product.title}
            </h3>

            <p className="text-green-700 font-semibold mb-2">₹ {product.price}</p>

            <Link
              to={`/products/${product.id}`}
              className="mt-auto text-blue-600 hover:underline text-sm"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
