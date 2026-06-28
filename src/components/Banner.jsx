import React from "react";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="hero min-h-[70vh] bg-base-200 rounded-3xl">
      <div className="hero-content text-center">
        <div className="max-w-3xl">
          <div className="badge badge-primary badge-lg mb-4">
            Buy • Sell • Trade
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Deal Your Products
            <br />
            <span className="text-primary">
              The Smart Way
            </span>
          </h1>

          <p className="py-6 text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
            Discover great deals, sell your unused items, and connect
            with trusted buyers and sellers. A modern marketplace built
            for smarter and faster product trading.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="allproducts" className="btn btn-primary">
              Browse Products
            </Link>

            <Link to='createproduct' className="btn btn-outline">
              Add Product
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-12">
            <div>
              <h3 className="text-2xl font-bold text-primary">
                10K+
              </h3>
              <p className="text-sm text-gray-500">
                Products Listed
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary">
                5K+
              </h3>
              <p className="text-sm text-gray-500">
                Active Users
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary">
                99%
              </h3>
              <p className="text-sm text-gray-500">
                Trusted Deals
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;