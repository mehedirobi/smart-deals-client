import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-20">
      <div className="w-11/12 mx-auto py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Smart<span className="text-primary">Deals</span>
            </h2>

            <p className="text-gray-600">
              SmartDeals is a modern bidding marketplace where buyers and
              sellers connect, compete, and make smarter deals with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-primary transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/allproducts"
                  className="hover:text-primary transition"
                >
                  All Products
                </Link>
              </li>

              <li>
                <Link
                  to="/aboutus"
                  className="hover:text-primary transition"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-2 text-gray-600">
              <p>Email: support@smartdeals.com</p>
              <p>Phone: +880 1234-567890</p>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Follow Us
            </h3>

            <div className="flex gap-4">
              <a
                href="#"
                className="btn btn-circle btn-outline"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="btn btn-circle btn-outline"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="btn btn-circle btn-outline"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="btn btn-circle btn-outline"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-base-300 mt-10 pt-6 text-center text-gray-500">
          <p>
            © {new Date().getFullYear()} SmartDeals. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;