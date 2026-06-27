import React from "react";
import Banner from "./Banner";
import LatestProducts from "./LatestProducts";

const latestProductsPromise = fetch("http://localhost:3000/products/home")
  .then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner />
      <LatestProducts latestProductsPromise={latestProductsPromise} />
    </div>
  );
};

export default Home;