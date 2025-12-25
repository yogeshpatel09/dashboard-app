import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [id]);

  if (!user) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-8">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6">

        <div className="flex items-center space-x-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-700">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user.name}
            </h2>
            <p className="text-gray-500">@{user.username}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="border rounded-lg p-4">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-800">{user.email}</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium text-gray-800">{user.phone}</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-sm text-gray-500">Website</p>
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              {user.website}
            </a>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Address
          </h3>
          <div className="border rounded-lg p-4 space-y-1">
            <p>
              {user.address.suite}, {user.address.street}
            </p>
            <p>
              {user.address.city} - {user.address.zipcode}
            </p>
            <p className="text-sm text-gray-500">
              Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Company
          </h3>
          <div className="border rounded-lg p-4 space-y-2">
            <p className="font-medium text-gray-800">
              {user.company.name}
            </p>
            <p className="text-gray-600">
              {user.company.catchPhrase}
            </p>
            <p className="text-sm text-gray-500">
              {user.company.bs}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDetails;
