import React, { useContext, useState } from "react";
import classes from "./signup.module.css";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import { ClipLoader } from 'react-spinners';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";

function Auth() {
  const navStateData=useLocation()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  const navigate = useNavigate();

  const authHandler = async (e) => {
    e.preventDefault();

    if (e.target.name === "sign in") {
      setLoading((prev) => ({ ...prev, signIn: true }));
      try {
        const userInfo = await signInWithEmailAndPassword(auth, email, password);
        dispatch({ type: 'SET_USER', user: userInfo.user });
        setLoading((prev) => ({ ...prev, signIn: false }));
        navigate(navStateData?.state?.redirect||'/');


      } catch (err) {
        setError(err.message); // Set the error message
        setLoading((prev) => ({ ...prev, signIn: false }));
        console.log(err);
      }
    } else {
      setLoading((prev) => ({ ...prev, signUp: true }));
      try {
        const userInfo = await createUserWithEmailAndPassword(auth, email, password);
        dispatch({ type: 'SET_USER', user: userInfo.user });
        setLoading((prev) => ({ ...prev, signUp: false }));
        navigate(navStateData?.state?.redirect || "/");
      } catch (err) {
        setError(err.message); // Set the error message
        setLoading((prev) => ({ ...prev, signUp: false }));
        console.log(err);
      }
    }
  };

  return (
    <section className={classes.login}>
      {/* Logo */}
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png?20250504041148"
          alt="Amazon Logo"
        />
      </Link>
      {/* Form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (<small
        style={{
          padding:'5px',
          textAlign:"center",
          color:"red",
          fontWeight:"bold"
        }}>
          {navStateData?.state?.msg}</small>
          )}

        <form onSubmit={authHandler}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Display error */}
          <button
            name="sign in"
            type="submit"
            onClick={authHandler}
            className={classes.login_signinbutton}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>

        {/* Agreement */}
        <p>
          By signing in to your account, you agree to the Amazon conditions of
          use. Please see our privacy notice, cookies notice, and interest-based
          ads.
        </p>

        {/* Create account */}
        <button
          name="sign up"
          type="submit"
          onClick={authHandler}
          className={classes.login_registerButton}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
      </div>
    </section>
  );
}

export default Auth;