import { useEffect, useState } from "react";
import Product from "./Product";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:3000/products?page=${page}&limit=9`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        setProducts(data.products);
        setTotalPages(data.totalPages);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold text-error">{error}</h2>
      </div>
    );
  }

  return (
    <section className="w-11/12 mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        All <span className="text-primary">Products</span>
      </h1>

      {products.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No products found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
            <button
              className="btn btn-outline"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </button>

            {[...Array(totalPages).keys()].map((number) => (
              <button
                key={number}
                onClick={() => setPage(number + 1)}
                className={`btn ${
                  page === number + 1 ? "btn-primary" : "btn-outline"
                }`}
              >
                {number + 1}
              </button>
            ))}

            <button
              className="btn btn-outline"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default AllProducts;