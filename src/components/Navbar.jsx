import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed w-full top-0 z-10 flex justify-between items-center px-4 py-3 bg-blue-600 text-white">
        <h1 className="font-bold text-lg">Admin Dashboard</h1>

        
        <div className="hidden md:flex space-x-6">
          <Link to="/">Dashboard</Link>
          <Link to="/users">Users</Link>
          <Link to="/products">Products</Link>
          <Link to="/add-product">Add Product</Link>
        </div>

        {/* Mobile screen */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          
          {/* Overlay */}
          <div
            className="flex-1 bg-black opacity-50"
            onClick={() => setOpen(false)}
          ></div>

          <div className="w-64 bg-white p-6">
            <button
              className="text-xl mb-6"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <nav className="flex flex-col space-y-4">
              <Link to="/" onClick={() => setOpen(false)}>Dashboard</Link>
              <Link to="/users" onClick={() => setOpen(false)}>Users</Link>
              <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
              <Link to="/add-product" onClick={() => setOpen(false)}>Add Product</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
