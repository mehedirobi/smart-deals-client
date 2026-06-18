import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { Authcontext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(Authcontext);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/allproducts", label: "All Products" },
    { path: "/aboutus", label: "About Us" },
  ];

  const privateNavItems = [
    { path: "/myproducts", label: "My Products" },
    { path: "/mybids", label: "My Bids" },
    { path: "/createproduct", label: "Create Product" },
  ];

  const renderLinks = () => (
    <>
      {navItems.map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : ""
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}

      {user &&
        privateNavItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : ""
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
    </>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="navbar w-11/12 mx-auto">
        {/* Left */}
        <div className="navbar-start">
          <div className="dropdown">
            <button
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-56 p-2 shadow z-[100]"
            >
              {renderLinks()}
            </ul>
          </div>

          <Link to="/" className="text-3xl font-bold">
            Smart<span className="text-primary">Deals</span>
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium">
            {renderLinks()}
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end gap-3">
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt={user.displayName || "User"}
              title={user.displayName || "User"}
              className="w-10 h-10 rounded-full object-cover border"
            />
          )}

          {user ? (
            <button
              onClick={handleSignOut}
              className="btn btn-primary"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/register"
              className="btn btn-primary"
            >
              Register
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;