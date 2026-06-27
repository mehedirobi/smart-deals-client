import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { Authcontext } from "../context/AuthContext";

const CreateProduct = () => {
  const { user } = useContext(Authcontext);

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
          title: "Product added successfully",
          timer: 1500,
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
    }
  };

  return (
    <section className="w-11/12 max-w-5xl mx-auto py-12">
      <div className="bg-base-100 shadow-xl rounded-xl p-8 border border-base-200">
        <h1 className="text-4xl font-bold text-center mb-8">
          Create <span className="text-primary">Product</span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Product Title */}
          <div className="form-control">
            <label className="label font-semibold">Product Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="MacBook Air M2"
              required
            />
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label font-semibold">Category</label>

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

          {/* Min Price */}
          <div className="form-control">
            <label className="label font-semibold">Minimum Price ($)</label>

            <input
              type="number"
              name="price_min"
              value={formData.price_min}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>

          {/* Max Price */}
          <div className="form-control">
            <label className="label font-semibold">Maximum Price ($)</label>

            <input
              type="number"
              name="price_max"
              value={formData.price_max}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>

          {/* Image */}
          <div className="form-control">
            <label className="label font-semibold">Image URL</label>

            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>

          {/* Location */}
          <div className="form-control">
            <label className="label font-semibold">Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="Dhaka"
              required
            />
          </div>

          {/* Condition */}
          <div className="form-control">
            <label className="label font-semibold">Condition</label>

            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="select select-bordered"
            >
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>

          {/* Seller Name */}
          <div className="form-control">
            <label className="label font-semibold">Seller Name</label>

            <input
              type="text"
              value={user?.displayName || ""}
              className="input input-bordered"
              readOnly
            />
          </div>

          {/* Seller Email */}
          <div className="form-control">
            <label className="label font-semibold">Seller Email</label>

            <input
              type="email"
              value={user?.email || ""}
              className="input input-bordered"
              readOnly
            />
          </div>

          {/* Description */}
          <div className="form-control md:col-span-2">
            <label className="label font-semibold">Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered h-32"
              placeholder="Write a short description..."
              required
            />
          </div>

          <button className="btn btn-primary md:col-span-2 mt-4">
            Add Product
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateProduct;