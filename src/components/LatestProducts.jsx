import { use } from "react";
import Product from "./Product";

const LatestProducts = ({ latestProductsPromise }) => {
  const products = use(latestProductsPromise);

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            New Arrivals
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
            Discover the Latest{" "}
            <span className="text-primary">Products</span>
          </h2>

          <p className="mt-4 text-base-content/70">
            Explore the newest products added to SmartDeals. Find quality
            products at competitive prices before they're gone.
          </p>
        </div>

        {/* Empty State */}
        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-base-300 bg-base-200/40 py-20 text-center">
            <h3 className="text-2xl font-semibold">
              No Products Found
            </h3>

            <p className="mt-3 text-base-content/60">
              New products will appear here once they are published.
            </p>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-12 text-center">
              <a
                href="/allproducts"
                className="btn btn-primary rounded-xl px-8"
              >
                View All Products
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LatestProducts;