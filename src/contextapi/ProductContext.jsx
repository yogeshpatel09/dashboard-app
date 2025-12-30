import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Get all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Get single product
  const fetchProductById = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        product,
        loading,
        fetchProducts,
        fetchProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
