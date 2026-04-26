import {
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";

import OAuth from "../components/OAuth.jsx";

const SignIn = () => {

  const [
    formData,
    setFormData,
  ] = useState({});

  const {
    loading,
    error,
  } = useSelector(
    (state) => state.user
  );

  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

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

        dispatch(
          signInStart()
        );

       
          const res =
  await fetch(

    `${import.meta.env.VITE_API_URL}/api/auth/signin`,

    {

      method: "POST",

      headers: {

        "Content-Type":
          "application/json",

      },

      credentials:
        "include",

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

          dispatch(

            signInFailure(
              data.message
            )

          );

          return;

        }

        dispatch(
          signInSuccess(
            data
          )
        );

        navigate("/");

      } catch (error) {

        dispatch(

          signInFailure(
            error.message
          )

        );

      }

    };

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 shadow-2xl">

        <div className="text-center mb-10">

          <p className="uppercase tracking-[0.3em] text-yellow-500 text-xs font-semibold mb-4">

            Welcome Back

          </p>

          <h1 className="text-5xl font-black mb-3">

            Sign{" "}

            <span className="text-yellow-500">

              In

            </span>

          </h1>

          <p className="text-zinc-500">

            Access your RoyalEstate account

          </p>

        </div>

        <form

          onSubmit={
            handleSubmit
          }

          className="flex flex-col gap-5"

        >

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

              ? "Signing In..."

              : "Sign In"}

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

            Don't have an account?

          </span>

          <Link
            to="/sign-up"
            className="text-yellow-500 hover:text-yellow-400 transition"
          >

            Sign Up

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

export default SignIn;