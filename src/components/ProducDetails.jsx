import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { Authcontext } from "../context/AuthContext";
import Swal from "sweetalert2";

const ProducDetails = () => {
  const { user } = use(Authcontext);
  const [bids, setBids] = useState([]);

  const { _id: productId } = useLoaderData();

  const bidModalRef = useRef(null);

  const handleBidModal = () => {
    bidModalRef.current.showModal();
  };

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("bids for this product", data);
        setBids(data);
      });
  }, [productId]);

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
      status: "pending",
    };

    fetch("http://localhost:3000/bids", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your Bid has been placed",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });

    console.log(productId, name, email, bid);
  };

  return (
    <div>
      <div>
        <button onClick={handleBidModal} className="btn btn-primary">
          I want to buy this product
        </button>

        <dialog
          ref={bidModalRef}
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Give the best offrer!</h3>

            <p className="py-4">Offer something seller can not rassist</p>

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

                <button className="btn btn-primary my-2">Place your Bid</button>
              </fieldset>
            </form>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      {/* Bids for this product */}
      <div>
        <h1 className="text-3xl">
          Bids for this product:{" "}
          <span className="text-primary">{bids.length}</span>
        </h1>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                 <th>Sl No.</th>
                </th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>
                  {
                    bids.map((bid, index) => <tr>
                      <th>{index + 1}</th>
                    </tr> )
                  }
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span>
                </td>
                <td>Purple</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            </tbody>
            
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProducDetails;
