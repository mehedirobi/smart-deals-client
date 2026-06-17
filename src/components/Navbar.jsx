import React, { use } from "react";
import { Link } from "react-router";
import { Authcontext } from "../context/AuthContext";

const Navbar = () => {
  const {user, logOut} = use(Authcontext)

  const handleSignOut = (e) => {
    e.preventDefault();
    logOut()
  }

    const links = <>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/allproducts">All Products</Link></li>
    <li><Link to="/register">Register</Link></li>

    {
      user &&
      <>
      <li><Link to="myproducts">My Products</Link></li>
    <li><Link to="/mybids">My Bids</Link></li>
      </>
    }
                
    </>
  return (
    
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="font-bold text-2xl">Smart <span className="text-purple-500">Deals</span></a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
        {
        user ? 
        <a onClick={handleSignOut} className="btn">Sign Out</a> 
        : 
        <Link to="register">Sign In</Link>
        }
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
