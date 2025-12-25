import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6 space-y-6">

      <div className="mb-4">
        <h1 className="text-2xl font-bold text-blue-900">Users</h1>
        <p className="text-gray-500">List of all registered users</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map(user => (
          <div
            key={user.id}
            className="bg-blue-50 border border-blue-100 rounded-xl p-4 shadow hover:shadow-lg transition duration-200"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.username}</p>
              </div>
            </div>

            <p className="text-gray-700 text-sm mb-2">Email: {user.email}</p>
            <p className="text-gray-500 text-sm">Company: {user.company.name}</p>

            <Link
              to={`/users/${user.id}`}
              className="mt-3 inline-block text-blue-600 hover:underline text-sm"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
