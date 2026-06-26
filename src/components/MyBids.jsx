import React, { use, useEffect, useState } from "react";
import { Authcontext } from "../context/AuthContext";
import Swal from "sweetalert2";

const MyBids = () => {
  const { user } = use(Authcontext);

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // FETCH BIDS
  useEffect(() => {
    const fetchMyBids = async () => {
      try {
        if (!user?.email) return;

        setLoading(true);

        const res = await fetch(
          `http://localhost:3000/bids?email=${user.email}`
        );

        if (!res.ok) throw new Error("Failed to fetch bids");

        const data = await res.json();

        setBids(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load bids");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBids();
  }, [user?.email]);

  // DELETE BID (OPTIMISTIC UPDATE)
  const handleDeleteBids = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    // 🔥 Instant UI update (optimistic)
    const previousBids = [...bids];
    setBids((prev) => prev.filter((bid) => bid._id !== _id));

    try {
      setDeletingId(_id);

      const res = await fetch(
        `http://localhost:3000/bids/${_id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!data.deletedCount) {
        throw new Error("Delete failed");
      }

      Swal.fire({
        title: "Deleted!",
        text: "Your bid has been Deleted.",
        icon: "success",
      });
    } catch (error) {
      console.error(error);

      // 🔥 rollback if fail
      setBids(previousBids);

      Swal.fire({
        title: "Error!",
        text: "Failed to delete bid.",
        icon: "error",
      });
    } finally {
      setDeletingId(null);
    }
  };

  // LOADING UI
  if (loading) {
    return (
      <div className="text-center py-10">
        Loading your bids...
      </div>
    );
  }

  // ERROR UI
  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">
        My Bids: {bids.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>SL</th>
              <th>Product</th>
              <th>Email</th>
              <th>Bid Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bids.length > 0 ? (
              bids.map((bid, index) => (
                <tr key={bid._id}>
                  <td>{index + 1}</td>

                  <td className="font-semibold">
                    {bid.product}
                  </td>

                  <td>{bid.buyer_email}</td>

                  <td className="font-bold">
                    ${bid.bid_price}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        bid.status === "pending"
                          ? "badge-warning"
                          : bid.status === "accepted"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {bid.status}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        handleDeleteBids(bid._id)
                      }
                      disabled={deletingId === bid._id}
                      className="btn btn-ghost btn-xs border-2 border-red-500 text-red-500"
                    >
                      {deletingId === bid._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500"
                >
                  No bids found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBids;