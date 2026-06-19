import React from "react";
import { Link } from "react-router";

const Product = ({ product }) => {
  const {
    title,
    _id,
    price_min,
    price_max,
    image,
    category,
    location,
    condition,
  } = product;

  return (
      <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-200">
      <figure className="h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </figure>

      <div className="card-body">
        <div className="flex items-center justify-between">
          <span className="badge badge-primary badge-outline">
            {category}
          </span>

          <span className="badge badge-secondary badge-outline capitalize">
            {condition}
          </span>
        </div>

        <h2 className="card-title text-xl line-clamp-1">
          {title}
        </h2>

        <p className="text-sm text-gray-500">
        Location: {location}
        </p>

        <div className="mt-2">
          <p className="text-xl font-bold text-primary">
            Price: ${price_min} - ${price_max}
          </p>
        </div>

        <div className="card-actions mt-4">
          <Link to={`/productdetails/${_id}`} className="btn btn-primary w-full">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;