import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProductList from "./productList";

function App() {
  const inputRef = useRef();
  const [products, setProducts] = useState([]);
  const [allElectronics, setAllElectronics] = useState([]); 

  useEffect(() => {
    const fetchElectronics = async () => {
      try {
        const { data } = await axios.get("https://fakestoreapi.com/products");
        const electronics = data.filter((product) => product.category === "electronics");
        setAllElectronics(electronics);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchElectronics();
  }, []); // Dependencia vacía para ejecutarlo solo al montar el componente

  function fetchProducts() {
    const n = parseInt(inputRef.current.value);
  
    if (!n || n <= 0) {
      alert("Por favor, ingresa un número válido.");
      return;
    }
  
    const selectedProducts = allElectronics.slice(0, n);
  
    // Guardar los productos seleccionados en json-server
    axios.post("http://localhost:3001/products", { products: selectedProducts })
      .then(() => {
        setProducts(selectedProducts);
      });
  }
  

  return (
    <div>
      <h1>Productos Electronicos</h1>
      <input type="number" placeholder="Cantidad" ref={inputRef} />
      <button onClick={fetchProducts}>Obtener productos</button>
      <ProductList products={products} />
    </div>
  );
}

export default App;
