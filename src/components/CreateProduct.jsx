import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { Authcontext } from "../context/AuthContext";

const CreateProduct = () => {
  const { user } = useContext(Authcontext);

  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price_min: "",
    price_max: "",
    image: "",
    location: "",
    condition: "used",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      ...formData,
      price_min: Number(formData.price_min),
      price_max: Number(formData.price_max),
      seller_name: user?.displayName,
      seller_email: user?.email,
      createdAt: new Date(),
    };

    try {
      setSubmitting(true);

      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();

      if (data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Product Added Successfully",
          timer: 1800,
          showConfirmButton: false,
        });

        setFormData({
          title: "",
          category: "",
          price_min: "",
          price_max: "",
          image: "",
          location: "",
          condition: "used",
          description: "",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}

        <div className="text-center mb-12">

          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            Seller Dashboard
          </span>

          <h1 className="mt-5 text-4xl md:text-5xl font-bold">
            Create
            <span className="text-primary"> Product</span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-base-content/70">
            List your product on SmartDeals. Complete the details below
            to attract more buyers and receive competitive bids.
          </p>

        </div>

        <div className="rounded-3xl border border-base-300 bg-base-100 shadow-lg p-6 md:p-10">

          <form
            onSubmit={handleSubmit}
            className="grid gap-6 md:grid-cols-2"
          >

            {/* Product Title */}

            <div className="form-control">

              <label className="label">
                <span className="label-text font-semibold">
                  Product Title
                  <span className="text-error"> *</span>
                </span>
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. MacBook Air M2 (2024)"
                className="input input-bordered w-full focus:input-primary"
                required
              />

            </div>

            {/* Category */}

            <div className="form-control">

              <label className="label">
                <span className="label-text font-semibold">
                  Category
                  <span className="text-error"> *</span>
                </span>
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select select-bordered w-full"
                required
              >
                <option value="">Select Category</option>
                <option>Electronics</option>
                <option>Vehicles</option>
                <option>Furniture</option>
                <option>Fashion</option>
                <option>Gaming</option>
                <option>Books</option>
                <option>Sports</option>
              </select>

            </div>

            {/* Minimum Price */}

            <div className="form-control">

              <label className="label">
                <span className="label-text font-semibold">
                  Minimum Price ($)
                </span>
              </label>

              <input
                type="number"
                min="0"
                name="price_min"
                value={formData.price_min}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Minimum Price"
                required
              />

            </div>

            {/* Maximum Price */}

            <div className="form-control">

              <label className="label">
                <span className="label-text font-semibold">
                  Maximum Price ($)
                </span>
              </label>

              <input
                type="number"
                min="0"
                name="price_max"
                value={formData.price_max}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Maximum Price"
                required
              />

            </div>

            {/* Image */}

            <div className="form-control">

              <label className="label">
                <span className="label-text font-semibold">
                  Image URL
                </span>
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="input input-bordered w-full"
                required
              />

            </div>

            {/* Location */}

            <div className="form-control">

              <label className="label">
                <span className="label-text font-semibold">
                  Location
                </span>
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Dhaka"
                className="input input-bordered w-full"
                required
              />

            </div>
                        {/* Condition */}

            <div className="form-control">

              <label className="label">
                <span className="label-text font-semibold">
                  Product Condition
                </span>
              </label>

              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>

            </div>

            {/* Seller Name */}

            <div className="form-control">

              <label className="label">
                <span className="label-text font-semibold">
                  Seller Name
                </span>
              </label>

              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered bg-base-200 cursor-not-allowed w-full"
              />

            </div>

            {/* Seller Email */}

            <div className="form-control md:col-span-2">

              <label className="label">
                <span className="label-text font-semibold">
                  Seller Email
                </span>
              </label>

              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered bg-base-200 cursor-not-allowed w-full"
              />

            </div>

            {/* Description */}

            <div className="form-control md:col-span-2">

              <label className="label">
                <span className="label-text font-semibold">
                  Description
                  <span className="text-error"> *</span>
                </span>
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea textarea-bordered h-36 w-full"
                placeholder="Describe your product, condition, included accessories, warranty and other important details..."
                required
              />

            </div>

            {/* Image Preview */}

            {formData.image && (
              <div className="md:col-span-2">

                <label className="label">
                  <span className="label-text font-semibold">
                    Image Preview
                  </span>
                </label>

                <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100">

                  <img
                    src={formData.image}
                    alt="Preview"
                    className="h-72 w-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/1200x600?text=Image+Preview";
                    }}
                  />

                </div>

              </div>
            )}

            {/* Submit Button */}

            <div className="md:col-span-2 mt-4">

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-lg w-full"
              >
                {submitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Adding Product...
                  </>
                ) : (
                  "Add Product"
                )}
              </button>

            </div>

          </form>

        </div>

      </div>
    </section>
  );
};

export default CreateProduct;