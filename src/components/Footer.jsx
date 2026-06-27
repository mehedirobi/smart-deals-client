import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import {
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

const Footer = () => {
  const year = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "All Products", path: "/allproducts" },
    { name: "About Us", path: "/aboutus" },
  ];

  return (
    <footer className="mt-24 border-t border-base-300 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-3xl font-extrabold tracking-tight"
            >
              Smart
              <span className="text-primary">Deals</span>
            </Link>

            <p className="mt-5 leading-7 text-base-content/70">
              SmartDeals is a modern online marketplace where buyers
              and sellers connect, place bids, and discover the best
              deals with confidence.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="inline-flex transition-all duration-300 hover:text-primary hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-base-content/70">

              <div className="flex items-center gap-3">
                <FiMail className="text-primary" />
                <span>support@smartdeals.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FiPhone className="text-primary" />
                <span>+880 1336-458100</span>
              </div>

              <div className="flex items-center gap-3">
                <FiMapPin className="text-primary" />
                <span>Dhaka, Bangladesh</span>
              </div>

            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Follow Us
            </h3>

            <div className="flex flex-wrap gap-3">

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-base-300 bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-base-300 bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-base-300 bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-base-300 bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white"
              >
                <FaGithub />
              </a>

            </div>

            <p className="mt-5 text-sm text-base-content/60">
              Stay connected for updates, new features, and community
              news.
            </p>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-base-300 pt-6 text-sm text-base-content/60 md:flex-row">

          <p>
            © {year} SmartDeals. All rights reserved.
          </p>

          <p>
            Built with React • Tailwind CSS • Node.js
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;