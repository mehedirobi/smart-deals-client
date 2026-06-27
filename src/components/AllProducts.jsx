import { useEffect, useState } from "react";
import Product from "./Product";

const PRODUCTS_PER_PAGE = 9;

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

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${PRODUCTS_PER_PAGE}`
        );

        if (!response.ok) {
          throw new Error("Failed to load products.");
        }

        const data = await response.json();

        setProducts(data.products ?? []);
        setTotalPages(data.totalPages ?? 1);
        setError("");

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  if (loading) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="rounded-2xl border border-error/20 bg-error/10 p-10 text-center">
          <h2 className="text-3xl font-bold text-error">
            Failed to Load Products
          </h2>

          <p className="mt-3 text-base-content/70">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary mt-6"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}

        <div className="max-w-3xl mx-auto text-center mb-14">
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Explore Our{" "}
            <span className="text-primary">
              Products
            </span>
          </h1>

          <p className="mt-4 text-base-content/70 leading-7">
            Browse our latest collection of products from trusted sellers.
            Find great deals, compare prices, and bid with confidence.
          </p>
        </div>

        {/* Empty State */}

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-base-300 py-20 text-center">

            <h3 className="text-2xl font-bold">
              No Products Found
            </h3>

            <p className="mt-3 text-base-content/60">
              There are currently no products available.
            </p>

          </div>
        ) : (
          <>
            {/* Products */}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                />
              ))}
            </div>

            {/* Pagination */}

            <div className="mt-14 flex flex-col items-center gap-5">

              <div className="join">

                <button
                  className="join-item btn btn-outline"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  ← Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setPage(index + 1)
                      }
                      className={`join-item btn ${
                        page === index + 1
                          ? "btn-primary"
                          : "btn-outline"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <button
                  className="join-item btn btn-outline"
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next →
                </button>

              </div>

              <p className="text-sm text-base-content/60">
                Page {page} of {totalPages}
              </p>

            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AllProducts;