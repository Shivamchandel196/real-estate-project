import {
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import OAuth from "../components/OAuth";

const SignUp = () => {

  const [
    error,
    setError,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const navigate =
    useNavigate();

  const [
    formData,
    setFormData,
  ] = useState({});

  const handleChange = (
    e
  ) => {

    setFormData({

      ...formData,

      [e.target.id]:
        e.target.value,

    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await fetch(

            "/api/auth/signup",

            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body:
                JSON.stringify(
                  formData
                ),

            }

          );

        const data =
          await res.json();

        if (
          data.success ===
          false
        ) {

          setLoading(
            false
          );

          setError(
            data.message
          );

          return;

        }

        setLoading(
          false
        );

        setError(null);

        navigate(
          "/sign-in"
        );

      } catch (error) {

        setLoading(
          false
        );

        setError(
          error.message
        );

      }

    };

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 shadow-2xl">

        <div className="text-center mb-10">

          <p className="uppercase tracking-[0.3em] text-yellow-500 text-xs font-semibold mb-4">

            Get Started

          </p>

          <h1 className="text-5xl font-black mb-3">

            Create{" "}

            <span className="text-yellow-500">

              Account

            </span>

          </h1>

          <p className="text-zinc-500">

            Join RoyalEstate today

          </p>

        </div>

        <form

          onSubmit={
            handleSubmit
          }

          className="flex flex-col gap-5"

        >

          <input

            type="text"

            placeholder="Username"

            id="username"

            onChange={
              handleChange
            }

            className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-500"

          />

          <input

            type="email"

            placeholder="Email Address"

            id="email"

            onChange={
              handleChange
            }

            className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-500"

          />

          <input

            type="password"

            placeholder="Password"

            id="password"

            onChange={
              handleChange
            }

            className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-500"

          />

          <button

            disabled={
              loading
            }

            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-[0.2em] p-4 rounded-2xl transition disabled:opacity-60"

          >

            {loading

              ? "Creating Account..."

              : "Sign Up"}

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

          <span className="text-zinc-500">

            Already have an account?

          </span>

          <Link
            to="/sign-in"
            className="text-yellow-500 hover:text-yellow-400 transition"
          >

            Sign In

          </Link>

        </div>

        {error && (

          <div className="mt-6 bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-2xl text-center">

            {error}

          </div>

        )}

      </div>

    </main>

  );

};

export default SignUp;