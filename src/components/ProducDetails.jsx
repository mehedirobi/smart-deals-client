import React, { use, useEffect, useMemo, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { Authcontext } from "../context/AuthContext";
import Swal from "sweetalert2";

const ProducDetails = () => {
  const { user } = use(Authcontext);

  const [bids, setBids] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { _id: productId, title } = useLoaderData();

  const bidModalRef = useRef(null);

  const openModal = () => bidModalRef.current?.showModal();

  // Fetch bids
  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products/bids/${productId}`
        );
        const data = await res.json();
        setBids(data || []);
      } catch (error) {
        console.error("Failed to fetch bids:", error);
      }
    };

    if (productId) fetchBids();
  }, [productId]);

  // Sort bids (highest first)
  const sortedBids = useMemo(() => {
    return [...bids].sort(
      (a, b) => Number(b.bid_price) - Number(a.bid_price)
    );
  }, [bids]);

  // Submit bid
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

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/bids`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newBid),
        }
      );

      const data = await res.json();

      if (data.insertedId) {
        setBids((prev) => [
          ...prev,
          { ...newBid, _id: data.insertedId },
        ]);

        bidModalRef.current?.close();

        Swal.fire({
          icon: "success",
          title: "Bid placed successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to place bid",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 space-y-10">

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">
          {title || "Product Details"}
        </h1>
        <p className="text-base-content/60">
          Place your bid and win this product
        </p>
      </div>

      {/* 🔥 BEAUTIFUL CTA BUTTON SECTION */}
      <div className="flex justify-center">
        <div className="bg-base-200 border border-base-300 rounded-2xl p-6 shadow-md flex flex-col items-center gap-3 w-full max-w-md">

          <h2 className="text-lg font-semibold">
            Ready to make an offer?
          </h2>

          <p className="text-sm text-base-content/60 text-center">
            Click below to open bidding form and submit your best price
          </p>

          <button
            onClick={openModal}
            className="btn btn-primary btn-wide mt-2 hover:scale-105 transition-transform"
          >
            💰 Place Your Bid
          </button>

        </div>
      </div>

      {/* Modal */}
      <dialog ref={bidModalRef} className="modal">
        <div className="modal-box">

          <h3 className="text-xl font-bold">
            Submit Your Offer
          </h3>

          <p className="text-sm text-base-content/60 mt-1">
            Higher bids increase your chance to win
          </p>

          <form onSubmit={handleBidSubmit} className="mt-5 space-y-3">

            <input
              name="name"
              defaultValue={user?.displayName}
              readOnly
              className="input input-bordered w-full"
            />

            <input
              name="email"
              defaultValue={user?.email}
              readOnly
              className="input input-bordered w-full"
            />

            <input
              name="bid"
              type="number"
              min="1"
              placeholder="Enter your bid amount"
              className="input input-bordered w-full"
              required
            />

            <button
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              {isSubmitting ? "Submitting..." : "Submit Bid"}
            </button>

          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">Close</button>
            </form>
          </div>

        </div>
      </dialog>

      {/* Bids Section */}
      <div>

        <h2 className="text-2xl font-bold mb-4">
          Current Bids ({sortedBids.length})
        </h2>

        {sortedBids.length === 0 ? (
          <div className="text-center py-10 text-base-content/60">
            No bids yet. Be the first to place an offer.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border">

            <table className="table">

              <thead>
                <tr>
                  <th>#</th>
                  <th>Buyer</th>
                  <th>Email</th>
                  <th>Bid</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {sortedBids.map((bid, i) => (
                  <tr key={bid._id}>
                    <td>{i + 1}</td>
                    <td>{bid.buyer_name}</td>
                    <td>{bid.buyer_email}</td>
                    <td className="font-bold text-primary">
                      ${bid.bid_price}
                    </td>
                    <td>
                      <span className="badge badge-warning">
                        {bid.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

    </section>
  );
};

export default ProducDetails;