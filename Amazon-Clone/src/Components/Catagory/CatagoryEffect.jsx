import React from "react";
import { CatagoryImage } from "./CatagoryImage";
import CatagoryCard from "./CatagoryCard";

import classes from './catagory.module.css'

function CatagoryEffect() {
  return (
    <section className={classes.catagory_container}>
      {CatagoryImage.map((infos)=>( 
        <CatagoryCard key={infos.title} data={infos} />
      ))}

    </section>
  );
}

export default CatagoryEffect;
