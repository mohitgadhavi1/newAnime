import React, { useEffect } from "react";
import styles from "./Home.module.css";
import Header from "./Header";
import AnimeCard from "../../components/AnimeCard";
import Watchlist from "../../components/Watchlist";

import Searchbar from "../../components/Searchbar";
import Filter from "../../components/Filter";

import { useSelector } from "react-redux";

function Home() {


  return (
    <div className={styles.mainWrapper}>
       <Header />
      <div id="lefttBar" className={styles.leftbar}>
      <div className={styles.inputbar}>
    <Searchbar/>
   <Filter/>
    </div>
        <AnimeCard />
      </div>
      <div className={styles.middlebar}>

     
      </div>
      <div id="rightBar" className={styles.rightbar}>
       <Watchlist/>
      </div>
    </div>
  );
}

export default Home;
