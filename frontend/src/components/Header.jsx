import { FaSearch } from "react-icons/fa";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useSelector } from "react-redux";

import {
  useState,
  useEffect,
} from "react";

const Header = () => {

  const { currentUser } =
    useSelector(
      (state) => state.user
    );

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [
    scrolled,
    setScrolled,
  ] = useState(false);

  const urlParams =
    new URLSearchParams(
      location.search
    );

  const searchTermFromUrl =
    urlParams.get(
      "searchTerm"
    ) || "";

  const [
    searchTerm,
    setSearchTerm,
  ] = useState(
    searchTermFromUrl
  );

  useEffect(() => {

    const onScroll = () => {

      setScrolled(
        window.scrollY > 20
      );

    };

    window.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true,
      }
    );

    return () => {

      window.removeEventListener(
        "scroll",
        onScroll
      );

    };

  }, []);

  const handleSubmit =
    (e) => {

      e.preventDefault();

      const params =
        new URLSearchParams();

      if (
        searchTerm.trim()
      ) {

        params.set(
          "searchTerm",
          searchTerm.trim()
        );

      }

      navigate(
        `/search?${params.toString()}`
      );

    };

  return (

    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b border-yellow-900/20

      ${
        scrolled
          ? "bg-[#0b0c0e]/95 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
          : "bg-[#0b0c0e]/80"
      }

      backdrop-blur-xl`}
    >

      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-[85px]">

        {/* LOGO */}

        <Link
          to="/"
          className="flex flex-col leading-none gap-0.5"
        >

          <h1
            className="font-black text-3xl tracking-wide"
            style={{
              fontFamily:
                "'Playfair Display', serif",
            }}
          >

            <span className="text-yellow-500">

              Royal

            </span>

            <span className="text-white">

              Estate

            </span>

          </h1>

          <span
            className="text-[10px] tracking-[0.3em]
            uppercase text-slate-500
            font-medium"
          >

            Find Your Dream Home

          </span>

        </Link>

        {/* SEARCH */}

        <form
          onSubmit={
            handleSubmit
          }
          className="hidden md:flex items-center
          bg-[#1a1d24]
          border border-white/[0.07]
          focus-within:border-yellow-500/50
          focus-within:shadow-[0_0_0_3px_rgba(201,168,76,0.15)]
          px-5 py-2 rounded-full
          w-[40%]
          transition-all duration-300"
        >

          <input
            type="text"
            placeholder="Search properties..."
            className="bg-transparent
            focus:outline-none w-full
            text-slate-200
            placeholder:text-slate-500
            text-sm"
            value={
              searchTerm
            }
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            className="bg-yellow-500
            hover:bg-yellow-400
            transition-all duration-200
            text-black
            w-10 h-10 rounded-full
            flex items-center
            justify-center
            ml-2
            hover:scale-110"
          >

            <FaSearch />

          </button>

        </form>

        {/* NAV */}

        <ul className="flex items-center gap-2">

          {[
            {
              to: "/",
              label: "Home",
            },

            {
              to: "/about",
              label: "About",
            },

            {
              to: "/search",
              label: "Explore",
            },

          ].map(
            ({
              to,
              label,
            }) => (

              <Link
                to={to}
                key={to}
              >

                <li
                  className={`hidden sm:inline-block

                  px-4 py-2 rounded-xl

                  text-sm font-semibold

                  tracking-wide

                  transition-all duration-300

                  cursor-pointer

                  ${
                    location.pathname ===
                    to

                      ? "text-yellow-400 bg-yellow-500/10"

                      : "text-slate-400 hover:text-yellow-400 hover:bg-yellow-500/10"
                  }`}
                >

                  {label}

                </li>

              </Link>

            )
          )}

          {/* PROFILE */}

          <li className="ml-3">

            <Link to="/profile">

              {currentUser ? (

                <div className="relative group">

                  <img
                    src={
                      currentUser?.avatar ||

                      currentUser?.profilePicture ||

                      currentUser?.user
                        ?.avatar ||

                      currentUser?.user
                        ?.profilePicture ||

                      "/profile.png"
                    }

                    alt="profile"

                    onError={(e) => {

                      e.target.onerror =
                        null;

                      e.target.src =
                        "/profile.png";

                    }}

                    className="rounded-full
                    h-12 w-12 object-cover
                    border-2 border-yellow-500
                    cursor-pointer
                    hover:scale-110
                    hover:shadow-[0_0_20px_rgba(255,204,0,0.5)]
                    transition-all duration-300"
                  />

                  {/* DROPDOWN */}

                  <div
                    className="absolute hidden
                    group-hover:block
                    right-0 top-[calc(100%+12px)]

                    bg-[#111827]

                    border border-yellow-500/20

                    rounded-2xl p-5 w-60

                    shadow-[0_20px_60px_rgba(0,0,0,0.7)]

                    z-50"
                  >

                    <div
                      className="absolute
                      -top-2 right-5

                      w-4 h-4

                      bg-[#111827]

                      border-l border-t

                      border-yellow-500/20

                      rotate-45"
                    />

                    <div className="flex items-center gap-3">

                      <img
                        src={
                          currentUser?.avatar ||

                          currentUser?.profilePicture ||

                          currentUser?.user
                            ?.avatar ||

                          currentUser?.user
                            ?.profilePicture ||

                          "/profile.png"
                        }

                        alt="profile"

                        className="w-14 h-14 rounded-full border border-yellow-500 object-cover"
                      />

                      <div>

                        <p
                          className="text-sm
                          font-bold
                          text-white truncate"
                        >

                          {
                            currentUser?.username ||

                            currentUser?.user
                              ?.username ||

                            "User"
                          }

                        </p>

                        <p
                          className="text-xs
                          text-slate-400 truncate mt-1"
                        >

                          {
                            currentUser?.email ||

                            currentUser?.user
                              ?.email ||

                            "No Email"
                          }

                        </p>

                      </div>

                    </div>

                    <div
                      className="border-t
                      border-white/10
                      my-4"
                    />

                    <p className="text-xs text-slate-400">

                      👋 Welcome back to RoyalEstate

                    </p>

                  </div>

                </div>

              ) : (

                <button
                  className="border
                  border-yellow-500/50

                  text-yellow-500

                  hover:bg-yellow-500
                  hover:text-black

                  transition-all duration-300

                  px-5 py-2 rounded-xl

                  text-sm font-bold
                  tracking-wide"
                >

                  Sign In

                </button>

              )}

            </Link>

          </li>

        </ul>

      </div>

      {/* MOBILE SEARCH */}

      <div
        className="md:hidden px-4 pb-4
        border-t border-white/5"
      >

        <form
          onSubmit={
            handleSubmit
          }
          className="flex items-center

          bg-[#1a1d24]

          border border-white/[0.07]

          focus-within:border-yellow-500/40

          rounded-full px-4 py-2 mt-3

          transition-all duration-300"
        >

          <input
            type="text"

            placeholder="Search properties..."

            className="bg-transparent
            focus:outline-none w-full
            text-slate-200
            placeholder:text-slate-500
            text-sm"

            value={
              searchTerm
            }

            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
          />

          <button
            type="submit"

            className="text-yellow-500
            ml-2 text-base p-2"
          >

            <FaSearch />

          </button>

        </form>

      </div>

    </header>

  );

};

export default Header;