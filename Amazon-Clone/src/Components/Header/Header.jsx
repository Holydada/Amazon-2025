import React from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { BiCart } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import {auth} from '../../Utility/firebase'
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import LowerHeader from "./LowerHeader";

function Header() {
  // const [basket] = useContext(DataContext);
  const [state] = useContext(DataContext); // Correct destructuring
  const basket = state.basket;// Access basket from state
  const user = state.user;
  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount+amount},0)
  
  
  return (
    <>
      <section className={classes.fixed}>
        <section>
          <div className={classes.header_container}>
            <div className={classes.logo_container}>
              {/* logo */}
              <Link to="/">
                <img
                  src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                  alt="amazon logo"
                />
              </Link>
              {/* delivery */}
              <div className={classes.delivery}>
                <span>
                  <SlLocationPin />
                </span>
                {/* icon */}
                <div>
                  <p>Delivered to</p>
                  <span>Ethiopia</span>
                </div>
              </div>
            </div>

            {/* searchbar section */}
            <div className={classes.search}>
              <select name="" id="" size={1.5}>
                <option value="">All</option>
              </select>
              <input type="text" name="" id="" placeholder="search product" />
              {/* icon */}
              <BsSearch size={20} />
            </div>

            {/* rightside */}
            <div className={classes.order_container}>
              <Link to="" className={classes.language}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_States_%281890%E2%80%931891%29.svg/640px-Flag_of_the_United_States_%281890%E2%80%931891%29.svg.png"
                  alt=""
                />
                <select name="" id="">
                  <option value="">EN</option>
                </select>
              </Link>

              {/* three components */}
              <Link to={!user && "/auth"}>
              
              <div>
                {
                  user?(
                    <>
                    <p>Hello {user?.email?.split('@')[0]}</p>
                    <span onClick={()=>auth.signOut()}> Sign Out</span>
</>
                  ):(
                    <>
                    <p>Hello,sign In</p>
                    <span> Account & Lists</span>
                    </>
                  )
                
                }
           
                </div>
               
              </Link>
              {/* orders */}
              <Link to="/orders">
                <p>returns</p>
                <span>& Orders</span>
              </Link>
              {/* cart */}

              <Link to="/cart" className={classes.cart}>
                <BiCart size={35} />
                <span>{totalItem}</span>
              </Link>
            </div>
          </div>
        </section>
        <LowerHeader />
      </section>
    </>
  );
}

export default Header;
