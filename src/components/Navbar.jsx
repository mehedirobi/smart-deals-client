import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { Authcontext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(Authcontext);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/allproducts", label: "All Products" },
    { path: "/aboutus", label: "About Us" },
  ];

  const privateLinks = [
    { path: "/myproducts", label: "My Products" },
    { path: "/mybids", label: "My Bids" },
    { path: "/createproduct", label: "Create Product" },
  ];

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full font-medium transition-all duration-300 ${
      isActive
        ? "bg-primary text-white"
        : "hover:bg-primary/10 hover:text-primary"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b bg-base-100/80 backdrop-blur-md">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20">

        {/* Left */}
        <div className="navbar-start">

          {/* Mobile Menu */}
          <div className="dropdown">
            <button
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 z-[100] w-64 rounded-2xl bg-base-100 shadow-xl p-3 space-y-2"
            >
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={navLinkClass}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}

              {user &&
                privateLinks.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={navLinkClass}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </div>

          {/* Logo */}

          <Link
            to="/"
            className="text-3xl font-extrabold tracking-tight"
          >
            Smart
            <span className="text-primary">
              Deals
            </span>
          </Link>
        </div>

        {/* Center */}

        <div className="navbar-center hidden lg:flex">

          <ul className="flex items-center gap-2">

            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={navLinkClass}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}

            {user &&
              privateLinks.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={navLinkClass}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>

        {/* Right */}

        <div className="navbar-end gap-3">

          {user ? (
            <div className="dropdown dropdown-end">

              <div
                tabIndex={0}
                className="cursor-pointer"
              >
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-11 h-11 rounded-full object-cover border-2 border-primary"
                />
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-4 w-72 rounded-2xl bg-base-100 shadow-xl p-4 space-y-2"
              >
                <div className="text-center border-b pb-3">

                  <img
                    src={user.photoURL}
                    alt=""
                    className="w-16 h-16 rounded-full mx-auto mb-2"
                  />

                  <h3 className="font-bold">
                    {user.displayName}
                  </h3>

                  <p className="text-sm opacity-70 break-all">
                    {user.email}
                  </p>
                </div>

                {privateLinks.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className="rounded-lg"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}

                <button
                  onClick={handleSignOut}
                  className="btn btn-primary mt-3 w-full rounded-xl"
                >
                  Sign Out
                </button>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">

              <Link
                to="/login"
                className="btn btn-ghost rounded-xl"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-primary rounded-xl"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;