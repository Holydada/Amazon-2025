// const { onRequest } = require("firebase-functions/v2/https");
// const express = require("express");
// const cors = "cors";
// const dotenv = require("dotenv");
// dotenv.config();
// const stripe = require("stripe")(process.env.STRIPE_KEY);

// const app = express();
// app.use(cors({ origin: true }));
// app.use(json());

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "sucess",
//   });
// });

// // Payment creation route
// app.post("/payment/create", async (req, res) => {
//   const total = parseInt(req.body.total);

//   if (total > 0) {
//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: total,
//         currency: "usd",
//       });

//       res.status(201).json({
//         clientSecret: paymentIntent.client_secret,
//       });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.status(400).json({ message: "Total must be greater than 0" });
//   }
// });

// export const api = onRequest(app);


import express from "express";
import Stripe from "stripe";
import * as dotenv from "dotenv";
import cors from "cors";
import { onRequest } from "firebase-functions/v2/https"; // Import onRequest

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY); // Initialize Stripe

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });
      res.status(201).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: "Total must be greater than 0" });
  }
});

// Export the API using onRequest
export const api = onRequest(app);