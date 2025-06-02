import React, { useState, useEffect, useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import ProductCard from "../../Components/Product/ProductCard";
import classes from "./orders.module.css";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { doc } from "firebase/firestore";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          
          {orders.length == 0 && <div style={{padding:'20px'}}>you dont have order yet!</div>}
          {/* Ordered items */}
          <div>
            {orders?.map((eachOrder) => (
              <div key={eachOrder.id}>
                <hr />
                <p>Order ID: {eachOrder.id}</p>
                {eachOrder.data?.basket?.map((order) => (
                  <ProductCard flex={true} product={order} key={order.id} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
