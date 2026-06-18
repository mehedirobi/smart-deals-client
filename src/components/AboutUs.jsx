import React from "react";

const AboutUs = () => {
  return (
    <section className="w-11/12 mx-auto py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">
          About <span className="text-primary">SmartDeals</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          SmartDeals is a modern online marketplace designed to connect buyers
          and sellers through a transparent and competitive bidding system. Our
          platform helps users discover valuable products, place bids, and make
          smarter purchasing decisions.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200"
            alt="Online Marketplace"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">
            Our Mission
          </h2>

          <p className="text-gray-600 mb-6">
            Our mission is to create a secure, user-friendly, and efficient
            marketplace where buyers can find the best deals and sellers can
            maximize the value of their products through competitive bidding.
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-base-200">
              <h3 className="font-semibold text-lg">
                Transparent Bidding
              </h3>
              <p className="text-gray-600">
                Real-time bidding ensures fairness and transparency for every
                transaction.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-base-200">
              <h3 className="font-semibold text-lg">
                Trusted Marketplace
              </h3>
              <p className="text-gray-600">
                We focus on creating a safe environment for buyers and sellers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-base-200">
              <h3 className="font-semibold text-lg">
                Smart Buying Experience
              </h3>
              <p className="text-gray-600">
                Discover quality products and make informed purchasing
                decisions with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-4 gap-6 mt-20">
        <div className="bg-base-200 p-6 rounded-xl text-center">
          <h3 className="text-3xl font-bold text-primary">1000+</h3>
          <p className="text-gray-600">Products Listed</p>
        </div>

        <div className="bg-base-200 p-6 rounded-xl text-center">
          <h3 className="text-3xl font-bold text-primary">500+</h3>
          <p className="text-gray-600">Active Users</p>
        </div>

        <div className="bg-base-200 p-6 rounded-xl text-center">
          <h3 className="text-3xl font-bold text-primary">300+</h3>
          <p className="text-gray-600">Successful Deals</p>
        </div>

        <div className="bg-base-200 p-6 rounded-xl text-center">
          <h3 className="text-3xl font-bold text-primary">99%</h3>
          <p className="text-gray-600">Customer Satisfaction</p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;