import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";
import { ProductProvider } from './contextapi/ProductContext';

createRoot(document.getElementById('root')).render(
  <ProductProvider>
  <StrictMode>
    <Toaster position="top-center" />
    <App />
  </StrictMode>
  </ProductProvider>
)
