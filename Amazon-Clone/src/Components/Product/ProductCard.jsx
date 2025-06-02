import React, { useContext } from "react";
import { Rating } from "@mui/material";
import CurrencyFormat from "../Currencyformat/Currencyformat";
import { Link } from "react-router-dom";
import classes from "./product.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/actiontype";
function ProductCard({ product, flex, renderDesc,renderAdd }) {
  const {
    image,
    title,
    id,
    rating = { rate: 0, count: 0 },
    price,
    description,
  } = product;

  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,

      item: { image, title, id, rating, price, description },
    });
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}

        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating?.rate} precision={0.1} />
          {/*  couter */}
          <small>({rating?.count})</small>
        </div>

        <div>
          {/* price  */}
          <CurrencyFormat amount={price} />
        </div>
        {
        renderAdd && <button className={classes.button} onClick={addToCart}>
          Add to Cart
        </button>
        }
      </div>
    </div>
  );
}

export default ProductCard;
