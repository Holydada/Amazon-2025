import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import classes from './product.module.css'
import Loader from "../../components/Loader/Loader";
function Product() {
  const [products, setproducts] = useState([]);
     const [isLoading, setIsLoading] = useState(false);
    
  useEffect(() => {
     setIsLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setproducts(res.data);
          setIsLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
          setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {products?.map((singleProduct) => (
            <ProductCard 
            product={singleProduct}
             key={singleProduct.id} 
             renderAdd={true}/>
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
