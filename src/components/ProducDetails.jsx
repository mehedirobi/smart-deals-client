import React, { useRef } from "react";
import { useLoaderData } from "react-router";

const ProducDetails = () => {
  const product = useLoaderData();
  const bidModalRef = useRef(null)
  console.log(product);

  const handleBidModal = () => {
    bidModalRef.current.showModal();
  }
  return (
    <div>
      <button
      onClick={handleBidModal} className="btn btn-primary">I want to buy this product</button>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      
      <dialog ref={bidModalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
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
