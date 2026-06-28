import React, { use, useState } from "react";
import { Authcontext } from "../context/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Login = () => {
  const { signInWithGoogle } = use(Authcontext);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = (e) => {
    e.preventDefault();

    setLoading(true);

    signInWithGoogle()
      .then((result) => {
        console.log(result)
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Login Successful",
              timer: 1500,
              showConfirmButton: false,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-6 space-y-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-sm text-base-content/60">
            Login to your account
          </p>
        </div>

        {/* Switch */}
        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register now
          </Link>
        </p>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="btn btn-outline w-full transition hover:scale-[1.02]"
        >
          {loading ? "Logging in..." : "Continue with Google"}
        </button>

        <div className="divider text-xs">OR</div>

        <p className="text-xs text-center text-base-content/60">
          Secure login with Google authentication
        </p>

      </div>
    </section>
  );
};

export default Login;