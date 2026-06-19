import React, { use, useRef } from "react";
import { useLoaderData } from "react-router";
import { Authcontext } from "../context/AuthContext";

const ProducDetails = () => {
  const { user } = use(Authcontext);

  const {_id: productId} = useLoaderData();

  const bidModalRef = useRef(null);

  const handleBidModal = () => {
    bidModalRef.current.showModal();
  };

  const handleBitSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;

    const newBid = {
      product: productId,
      buyer_name: name, 
      buyer_email: email,
      bid_price: bid,
      status: 'pending'
    }

    fetch('http://localhost:3000/bids', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newBid)
    })
    .then(res => res.json())
    .then(data => console.log('after place bids', data))

    console.log(productId, name, email, bid);
  };

  return (
    <div>
      <button
        onClick={handleBidModal}
        className="btn btn-primary"
      >
        I want to buy this product
      </button>

      <dialog
        ref={bidModalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Give the best offrer!
          </h3>

          <p className="py-4">
            Offer something seller can not rassist
          </p>

          <form onSubmit={handleBitSubmit}>
            <fieldset className="fieldset">
              <label className="label">Name</label>

              <input
                type="text"
                name="name"
                className="input"
                defaultValue={user?.displayName || ""}
                readOnly
              />

              <label className="label">Email</label>

              <input
                type="email"
                name="email"
                className="input"
                defaultValue={user?.email || ""}
                readOnly
              />

              <label className="label">Bid Amount</label>

              <input
                type="number"
                name="bid"
                className="input"
                placeholder="Enter Bid amount"
                required
              />

              <button className="btn btn-primary my-2">
                Place your Bid
              </button>
            </fieldset>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProducDetails;