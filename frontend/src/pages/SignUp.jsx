import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import OAuth from "../components/OAuth";
import { showSuccessToast, showErrorToast } from "../utils/toast";

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        showErrorToast(data.message);
        return;
      }

      setLoading(false);
      showSuccessToast("Account created successfully!");
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      showErrorToast(error.message || "Something went wrong!");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 pb-10 pt-32 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-8">
        <div className="text-center mb-10">
          <p className="uppercase tracking-[0.3em] text-yellow-500 text-xs font-semibold mb-4">
            Get Started
          </p>

          <h1 className="mb-3 font-serif text-5xl font-black">
            Create <span className="text-yellow-500">Account</span>
          </h1>

          <p className="text-zinc-500">Join RoyalEstate today</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            className="rounded-xl border border-white/10 bg-black/35 p-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-500"
          />

          <input
            type="email"
            placeholder="Email Address"
            id="email"
            onChange={handleChange}
            className="rounded-xl border border-white/10 bg-black/35 p-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-500"
          />

          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="rounded-xl border border-white/10 bg-black/35 p-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-500"
          />

          <button
            disabled={loading}
            className="rounded-xl bg-yellow-500 p-4 font-bold uppercase tracking-[0.18em] text-black transition hover:bg-yellow-400 disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-px bg-zinc-800"></div>

            <span className="text-zinc-500 text-xs uppercase tracking-widest">
              OR
            </span>

            <div className="flex-1 h-px bg-zinc-800"></div>
          </div>

          <OAuth />
        </form>

        <div className="flex justify-center gap-2 mt-8 text-sm">
          <span className="text-zinc-500">Already have an account?</span>

          <Link
            to="/sign-in"
            className="text-yellow-500 hover:text-yellow-400 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
