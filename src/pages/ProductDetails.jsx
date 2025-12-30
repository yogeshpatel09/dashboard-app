import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import Loader from "../components/Loader";
import { ProductContext } from "../contextapi/ProductContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { product, loading, fetchProductById } = useContext(ProductContext);

  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  if (loading || !product) return <Loader />;

  return (
    <div className="min-h-[90vh] bg-gray-50 flex justify-center px-4 py-8">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg p-6">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {product.title}
          </h2>
          <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="flex justify-center items-center border rounded-xl p-4">
            <img
              src={product.image}
              alt={product.title}
              className="h-72 object-contain"
            />
          </div>

          <div className="space-y-4">

            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-2xl font-semibold text-green-600">
                ₹ {product.price}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Rating</p>
              <p className="font-medium text-gray-800">
                ⭐ {product.rating.rate} / 5
                <span className="text-gray-500 text-sm">
                  {" "}({product.rating.count} reviews)
                </span>
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Description</p>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
