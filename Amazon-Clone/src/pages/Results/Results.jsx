import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import classes from "./Results.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import Loader from "../../Components/Loader/Loader";
import ProductCard from "../../Components/Product/ProductCard";
function Results() {
  const [results,setResults] = useState([]);
  const { categoryName } = useParams();
    const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
     setIsLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${productUrl}/products/category/${categoryName}`
        );
        setResults(res.data);
           setIsLoading(false);
      } catch (err) {
        console.error(err);
           setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);
  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}> Results</h1>
        <p style={{ padding: "30px" }}> Category/{categoryName}</p>
        <hr />
        {isLoading ? <Loader /> :  ( <div className={classes.products_container}>
          {results.map((product) => (
            <ProductCard key={product.id} 

            product={product} 
            renderDesc={false}
            renderAdd={true}
            
            />
          ))}
        </div> )}
      
      </section>
    </Layout>
  );
}

export default Results;
