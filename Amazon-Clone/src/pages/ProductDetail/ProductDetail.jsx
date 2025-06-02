import React,{useState,useEffect} from "react";
import Layout from "../../components/Layout/Layout";
import classes from "./ProductDetail.module.css";
import { productUrl } from "../../Api/endPoints";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";
function ProductDetail() {
  const { productId } = useParams();
  const [product, setproduct] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true)
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${productUrl}/products/${productId}`);
        setproduct(res.data);
         setIsLoading(false);
      } catch (err) {
        console.error(err);
             setIsLoading(false);
      }
    };

    fetchProducts();
  }, [productId]);
  return (
    <Layout>
      {isLoading ? <Loader /> : <ProductCard product={product} flex={true} 
      renderDesc={true}
      renderAdd={true}
      />}
    </Layout>
  );
}

export default ProductDetail;
