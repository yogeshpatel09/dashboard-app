import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()),
      fetch("https://fakestoreapi.com/products").then(res => res.json())
    ]).then(([usersData, productsData]) => {
      setUsers(usersData);
      setProducts(productsData);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6 space-y-10">

      
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">
          Overview of users and products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-blue-100 p-6 rounded-xl shadow">
          <p className="text-blue-700">Total Users</p>
          <h2 className="text-3xl font-bold text-blue-900">
            {users.length}
          </h2>
        </div>

        <div className="bg-green-100 p-6 rounded-xl shadow">
          <p className="text-green-700">Total Products</p>
          <h2 className="text-3xl font-bold text-green-900">
            {products.length}
          </h2>
        </div>
      </div>

      
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Latest Products</h2>
          <Link
            to="/products"
            className="text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {products.slice(0, 6).map(product => (
            <div
              key={product.id}
              className="bg-green-50 border border-green-100 rounded-xl p-4 flex flex-col items-center shadow hover:shadow-lg transition duration-200"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-24 w-full object-contain mb-2"
              />
              <p className="text-green-900 font-semibold text-sm text-center line-clamp-2 mb-1">
                {product.title}
              </p>
              <p className="text-green-700 font-semibold">₹ {product.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Latest Users</h2>
          <Link
            to="/users"
            className="text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {users.slice(0, 4).map(user => (
            <div
              key={user.id}
              className="bg-blue-50 border border-blue-100 rounded-xl p-4 shadow hover:shadow-lg transition duration-200"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">{user.name}</h3>
                  <p className="text-gray-600 text-sm">{user.username}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-1">Email: {user.email}</p>
              <p className="text-gray-500 text-sm">Company: {user.company.name}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
