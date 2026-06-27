import { Link } from "react-router-dom";
import { PackagePlus } from "lucide-react";

const MyProducts = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-16">
      <div className="max-w-xl mx-auto px-6 text-center">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <PackagePlus size={42} className="text-primary" />
        </div>

        <h1 className="mt-8 text-4xl font-bold">
          My <span className="text-primary">Products</span>
        </h1>

        <p className="mt-4 text-base-content/70 leading-7">
          This page will allow you to manage all the products you've listed.
          You'll be able to view, edit, and remove your products from one place.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/createproduct"
            className="btn btn-primary"
          >
            Create Product
          </Link>

          <Link
            to="/allproducts"
            className="btn btn-outline"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MyProducts;