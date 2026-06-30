import React, { use, useEffect, useState } from "react";
import { Authcontext } from "../context/AuthContext";
import Swal from "sweetalert2";

const MyBids = () => {
  const { user } = use(Authcontext);

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // console.log('token', user.accessToken)
  

  // FETCH BIDS
 useEffect(() => {
  const fetchMyBids = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      setError(null);

      const token = await user.getIdToken(true);

      // 👇 এগুলো add করো
      console.log("User:", user);
      console.log("Email:", user.email);
      console.log("Token:", token);

      const res = await fetch(
        `http://localhost:3000/bids?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch bids");
      }

      setBids(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load your bids.");
      setBids([]);
    } finally {
      setLoading(false);
    }
  };

  fetchMyBids();
}, [user]);

  // DELETE BID
  const handleDeleteBids = async (_id) => {
  const result = await Swal.fire({
    title: "Delete Bid?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#dc2626",
    confirmButtonText: "Delete",
  });

  if (!result.isConfirmed) return;

  const previousBids = [...bids];
  setBids((prev) => prev.filter((bid) => bid._id !== _id));

  try {
    setDeletingId(_id);

    const token = await user.getIdToken();

    const res = await fetch(`http://localhost:3000/bids/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok || !data.deletedCount) {
      throw new Error(data.message || "Delete failed");
    }

    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Your bid has been deleted successfully.",
      timer: 1800,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error(error);

    setBids(previousBids);

    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: error.message || "Failed to delete the bid.",
    });
  } finally {
    setDeletingId(null);
  }
};

  // Loading
  if (loading) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="alert alert-error shadow-lg">
          <span>{error}</span>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}

        <div className="mb-10 text-center">

          <h1 className="text-3xl md:text-4xl font-bold">
            My <span className="text-primary">Bids</span>
          </h1>

          <p className="mt-3 text-base-content/70">
            View and manage all the bids you've placed.
          </p>

          <div className="mt-5 inline-flex rounded-full bg-primary/10 px-5 py-2 text-sm font-medium text-primary">
            Total Bids: {bids.length}
          </div>

        </div>

        {bids.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-base-300 py-20 text-center">

            <h2 className="text-2xl font-bold">
              No Bids Found
            </h2>

            <p className="mt-3 text-base-content/60">
              You haven't placed any bids yet.
            </p>

          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100 shadow-sm">

            <table className="table">

              <thead className="bg-base-200">

                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Email</th>
                  <th>Bid Price</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>

              </thead>

              <tbody>

                {bids.map((bid, index) => (
                  <tr
                    key={bid._id}
                    className="hover"
                  >
                    <td className="font-medium">
                      {index + 1}
                    </td>

                    <td className="font-semibold">
                      {bid.product}
                    </td>

                    <td className="text-base-content/70">
                      {bid.buyer_email}
                    </td>

                    <td className="font-bold text-primary">
                      ${bid.bid_price}
                    </td>

                    <td>
                      <span
                        className={`badge capitalize ${
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

                    <td className="text-center">
                      <button
                        onClick={() =>
                          handleDeleteBids(bid._id)
                        }
                        disabled={deletingId === bid._id}
                        className="btn btn-error btn-sm"
                      >
                        {deletingId === bid._id ? (
                          <>
                            <span className="loading loading-spinner loading-xs"></span>
                            Deleting
                          </>
                        ) : (
                          "Delete"
                        )}
                      </button>
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

export default MyBids;