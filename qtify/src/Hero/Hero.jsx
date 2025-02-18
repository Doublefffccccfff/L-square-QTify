import React from "react";
import styles from "./Hero.module.css";
import AlbumCard from "../albumCard/Card";
import Section from "../Section/Section";

function Hero() {
  return (
    <>
    <div className={styles.hero}>
      <div>
        <h1>100 Thousand Songs, ad-free</h1>
        <h1>Over thousands podcast episodes</h1>
      </div>
      <div>
        <img
          src={require("../assets/vibrating-headphone 1 (1).png")}
          width={212}
          alt="headphones"
        />
      </div>
      
    </div>
    <div >
      <Section title={'Top Albums'} loc={'top'}/>
      <Section title={'New Albums'} loc={'new'}/>
    </div>
     
    </>
    
  );
}

export default Hero;
