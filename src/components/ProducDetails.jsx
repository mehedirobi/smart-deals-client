import React, { use, useEffect, useMemo, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { Authcontext } from "../context/AuthContext";
import Swal from "sweetalert2";

const ProducDetails = () => {
  const { user } = use(Authcontext);

  const [bids, setBids] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { _id: productId } = useLoaderData();

  const bidModalRef = useRef(null);

  const handleBidModal = () => {
    bidModalRef.current?.showModal();
  };

  // Fetch bids
  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/products/bids/${productId}`
        );

        const data = await res.json();

        setBids(data);
      } catch (error) {
        console.error("Failed to fetch bids:", error);
      }
    };

    fetchBids();
  }, [productId]);

  // Highest bid first
  const sortedBids = useMemo(() => {
    return [...bids].sort(
      (a, b) => Number(b.bid_price) - Number(a.bid_price)
    );
  }, [bids]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const newBid = {
      product: productId,
      buyer_name: form.name.value,
      buyer_email: form.email.value,
      bid_price: Number(form.bid.value),
      status: "pending",
    };

    try {
      setIsSubmitting(true);

      const res = await fetch("http://localhost:3000/bids", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newBid),
      });

      const data = await res.json();

      if (data.insertedId) {
        setBids((prevBids) => [
          ...prevBids,
          {
            ...newBid,
            _id: data.insertedId,
          },
        ]);

        bidModalRef.current?.close();

        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your bid has been placed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Failed to place bid",
        text: "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Bid Button */}
      <div>
        <button onClick={handleBidModal} className="btn btn-primary">
          I want to buy this product
        </button>

        {/* Modal */}
        <dialog
          ref={bidModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Give the Best Offer!</h3>

            <p className="py-4">
              Offer something the seller cannot resist.
            </p>

            <form onSubmit={handleBidSubmit}>
              <fieldset className="fieldset">
                <label className="label">Name</label>

                <input
                  type="text"
                  name="name"
                  className="input w-full"
                  defaultValue={user?.displayName || ""}
                  readOnly
                />

                <label className="label">Email</label>

                <input
                  type="email"
                  name="email"
                  className="input w-full"
                  defaultValue={user?.email || ""}
                  readOnly
                />

                <label className="label">Bid Amount</label>

                <input
                  type="number"
                  name="bid"
                  className="input w-full"
                  placeholder="Enter bid amount"
                  min="1"
                  required
                />

                <button
                  type="submit"
                  className="btn btn-primary mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Place Your Bid"}
                </button>
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

      {/* Bids Table */}
      <div>
        <h1 className="text-3xl font-bold mb-5">
          Bids for this Product:{" "}
          <span className="text-primary">{sortedBids.length}</span>
        </h1>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {sortedBids.length > 0 ? (
                sortedBids.map((bid, index) => (
                  <tr key={bid._id}>
                    <td>{index + 1}</td>

                    <td>{bid.buyer_name}</td>

                    <td>{bid.buyer_email}</td>

                    <td className="font-semibold">
                      ${bid.bid_price}
                    </td>

                    <td>
                      <span className="badge badge-warning">
                        {bid.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500"
                  >
                    No bids found for this product.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProducDetails;