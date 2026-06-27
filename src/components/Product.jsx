import { Link } from "react-router";
import { MapPin, Tag } from "lucide-react";

const Product = ({ product }) => {
  const {
    _id,
    title,
    image,
    category,
    condition,
    location,
    price_min,
    price_max,
  } = product;

  return (
    <article className="group overflow-hidden rounded-2xl border border-base-200 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Product Image */}
      <figure className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Category */}
        <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow">
          {category}
        </span>

        {/* Condition */}
        <span className="absolute right-4 top-4 rounded-full bg-base-100/90 px-3 py-1 text-xs font-semibold capitalize backdrop-blur">
          {condition}
        </span>
      </figure>

      {/* Content */}
      <div className="flex flex-col p-6">
        {/* Title */}
        <h2 className="line-clamp-2 text-xl font-bold transition-colors duration-300 group-hover:text-primary">
          {title}
        </h2>

        {/* Location */}
        <div className="mt-3 flex items-center gap-2 text-sm text-base-content/70">
          <MapPin size={16} className="text-primary" />
          <span>{location}</span>
        </div>

        {/* Price */}
        <div className="mt-6 rounded-xl bg-base-200 p-4">
          <p className="mb-1 flex items-center gap-2 text-sm text-base-content/60">
            <Tag size={15} />
            Price Range
          </p>

          <p className="text-2xl font-bold text-primary">
            ${price_min} – ${price_max}
          </p>
        </div>

        {/* Button */}
        <Link
          to={`/productdetails/${_id}`}
          className="btn btn-primary mt-6 w-full rounded-xl transition-all duration-300 group-hover:translate-y-[-2px]"
        >
          View Details
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default Product;