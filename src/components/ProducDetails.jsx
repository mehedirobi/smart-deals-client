import React, { use, useRef } from "react";
import { useLoaderData } from "react-router";
import { Authcontext } from "../context/AuthContext";

const ProducDetails = () => {

  const {user} = use(Authcontext)

  const product = useLoaderData();
  const bidModalRef = useRef(null)
  console.log(product);

  const handleBidModal = () => {
    bidModalRef.current.showModal();
  }

  const handleBitSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <div>
      <button
      onClick={handleBidModal} className="btn btn-primary">I want to buy this product</button>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      
      <dialog ref={bidModalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Give the best offrer!</h3>
          <p className="py-4">
            Offer something seller can not rassist
          </p>

          {/* Form */}
          <form onSubmit={handleBitSubmit}>
             <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="email" className="input" defaultValue={user.displayName} readOnly />

          <label className="label">Email</label>
          <input type="email" readOnly className="input" defaultValue={user.email} />

          <label className="label">Bid Amount</label>
          <input type="number" className="input" placeholder="Enter Bid amount" />

          <button className="btn btn-primary my-2">Place yout Bid</button>
          
          
        </fieldset>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProducDetails;
