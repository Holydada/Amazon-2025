import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import ProtectedRoute from "./src/components/ProtectedRoute/ProtectedRoute";
import { loadStripe } from "@stripe/stripe-js";
//used to load stripe to react
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./src/pages/Landing/Landing";
import Auth from "./src/pages/Auth/Auth";
import Payment from "./src/pages/Payment/Payment";
import Orders from "./src/pages/Orders/Orders";
import Cart from "./src/pages/Cart/Cart";
import Results from "./src/pages/Results/Results";

import ProductDetail from "./src/pages/ProductDetail/ProductDetail";

const stripePromise = loadStripe(
  "pk_test_51RPgov08LbYbuD82CBMOIgjNXJzUiO3BG0SbxScasFDJVcIVtTnJ20qZKEe2emEtvRZTo85wRVqUltzFHtUJtTi400o1FZVK3S"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />}></Route>
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"you must login to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"you must login to see order"}
              redirect={"/orders"}
            >
              <Elements stripe={stripePromise}>
                <Orders />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default Routing;
