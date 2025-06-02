import React, { useContext, useState } from "react";
import { db } from "../../Utility/firebase";
import Layout from "../../components/Layout/Layout";
import classes from "./payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/Currencyformat/Currencyformat";
import { axiosInstance } from "../../Api/axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const [CardError, setCardError] = useState(null);
  // const checkout = useCheckout();
  const navigate = useNavigate();
  // Calculate total amount (assuming each item has a price property)
  const totalAmount = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  // totalprice
  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };
  //calling hooks

  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  // the payment error handle functionnn incorrect card number is entered
  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // Step 1: Create payment intent on the backend
      // const response = await axiosInstance({
      //   method: "POST",
      //   url: `/payment/create?total=${total}*100`,
      // });

      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create`,
        data: {
          total: total * 100, // Calculate total in the request body
        },
      });
      const clientSecret = response.data?.clientSecret;

      // Step 2: Confirm the payment with Stripe
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // Step 3: Save order in Firestore
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      //empty the basket
      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order!" } });
    } catch (error) {
      // console.error(error);

      setProcessing(false);
    }
  };

  return (
    <Layout>
      {/* headerr */}
      <div className={classes.payment_header}>Checkout ({basket.length})</div>
      {/* payment methodd */}
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123, Addis Ababa</div>
            <div>Ethiopia</div>
          </div>
        </div>
        <hr />
        {/* reviewc */}
        <div className={classes.flex}>
          <h3>Review items</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* cardform */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>

          <div className={classes.payment_card_container}>
            <div className={classes.payment_detail}>
              <form onSubmit={handlePayment}>
                {/* errorr */}
                {CardError && (
                  <small style={{ color: "red" }}>{CardError}</small>
                )}
                {/* cardd */}
                <CardElement onChange={handleChange} />

                {/* prisesss */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />

                        <p> please wait ...</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
