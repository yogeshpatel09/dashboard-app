import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    image: "",

  });

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.price || !form.description || !form.image) {
      toast.error("All fields including image are required");
      return;
    }

    if (form.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Product added successfully!");
        setForm({
          title: "",
          category: "",
          price: "",
          description: "",
          image: "",
        });
        setImagePreview(null);
      } else {
        toast.error("Failed to add product");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start py-8 px-4 bg-gray-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

        <h2 className="text-xl font-bold text-center text-blue-900">
          Add New Product
        </h2>
        <p className="text-center text-gray-500 mb-4 text-sm">
          Enter product information below
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">

          <div>
            <label className="text-xs font-medium text-gray-600">Product Name</label>
            <input
              type="text"
              value={form.title}
              placeholder="Product name"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white outline-none"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">Price (₹)</label>
            <input
              type="number"
              value={form.price}
              placeholder="Price"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">Description</label>
            <textarea
              rows="3"
              value={form.description}
              placeholder="Short product description"
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 w-full text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-blue-600 text-white py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition"
          >
            {loading ? <Loader /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
