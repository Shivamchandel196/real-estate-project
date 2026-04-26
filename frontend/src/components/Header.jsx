import { FaSearch } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);

  
  const urlParams = new URLSearchParams(location.search);
  const searchTermFromUrl =
    urlParams.get("searchTerm") || "";

  
  const [searchTerm, setSearchTerm] =
    useState(searchTermFromUrl);

  
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );
    };
  }, []);

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.set(
        "searchTerm",
        searchTerm.trim()
      );
    }

    navigate(`/search?${params.toString()}`);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b border-yellow-900/20
      ${
        scrolled
          ? "bg-[#0b0c0e]/95 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
          : "bg-[#0b0c0e]/80"
      } backdrop-blur-xl`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-17">

        
        <Link
          to="/"
          className="flex flex-col leading-none gap-0.5"
        >
          <h1
            className="font-black text-2xl tracking-wide"
            style={{
              fontFamily:
                "'Playfair Display', serif",
            }}
          >
            <span className="text-yellow-500">
              Royal
            </span>

            <span className="text-slate-100">
              Estate
            </span>
          </h1>

          <span
            className="text-[10px] tracking-[0.2em]
            uppercase text-slate-500
            font-medium"
          >
            Find Your Dream Home
          </span>
        </Link>

        
        <form
          onSubmit={handleSubmit}
          className="hidden md:flex items-center
          bg-[#1a1d24]
          border border-white/[0.07]
          focus-within:border-yellow-500/50
          focus-within:shadow-[0_0_0_3px_rgba(201,168,76,0.15)]
          px-4 py-1.5 rounded-full
          w-[38%]
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
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          <button
            type="submit"
            className="bg-yellow-500
            hover:bg-yellow-400
            transition-all duration-200
            text-[#0b0c0e]
            w-8 h-8 rounded-full
            flex items-center
            justify-center
            flex-shrink-0 ml-2
            hover:scale-110 text-xs"
          >
            <FaSearch />
          </button>
        </form>

        
        <ul className="flex items-center gap-1">
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
          ].map(({ to, label }) => (
            <Link to={to} key={to}>
              <li
                className={`hidden sm:inline-block
                px-3 py-2 rounded-md
                text-sm font-medium
                tracking-wide
                transition-all duration-200
                cursor-pointer
                ${
                  location.pathname === to
                    ? "text-yellow-500 bg-yellow-500/10"
                    : "text-slate-400 hover:text-yellow-400 hover:bg-yellow-500/10"
                }`}
              >
                {label}
              </li>
            </Link>
          ))}

          
          <li className="ml-2">
            <Link to="/profile">
              {currentUser ? (
                <div className="relative group">
                  <img
                    src={
                      currentUser?.avatar ||
                      "/default_profile.png"
                    }
                    alt="profile"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "/default_profile.png";
                    }}
                    className="rounded-full
                    h-10 w-10 object-cover
                    border-2 border-yellow-500
                    cursor-pointer
                    hover:scale-110
                    hover:shadow-[0_0_0_3px_rgba(201,168,76,0.25)]
                    transition-all duration-300"
                  />

                  
                  <div
                    className="absolute hidden
                    group-hover:block
                    right-0 top-[calc(100%+10px)]
                    bg-[#1a1d24]
                    border border-yellow-900/30
                    rounded-xl p-4 w-52
                    shadow-[0_20px_60px_rgba(0,0,0,0.7)]
                    z-50"
                  >
                    <div
                      className="absolute
                      -top-1.5 right-4
                      w-3 h-3
                      bg-[#1a1d24]
                      border-l border-t
                      border-yellow-900/30
                      rotate-45"
                    />

                    <p
                      className="text-sm
                      font-semibold
                      text-slate-100 truncate"
                    >
                      {currentUser.username}
                    </p>

                    <p
                      className="text-xs
                      text-slate-500
                      truncate mt-1"
                    >
                      {currentUser.email}
                    </p>

                    <div
                      className="border-t
                      border-white/[0.07]
                      my-3"
                    />

                    <p className="text-xs text-slate-400">
                      👋 Welcome back
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  className="border
                  border-yellow-500/50
                  text-yellow-500
                  hover:bg-yellow-500
                  hover:text-[#0b0c0e]
                  hover:border-yellow-500
                  hover:shadow-[0_4px_20px_rgba(201,168,76,0.3)]
                  transition-all duration-200
                  px-5 py-2 rounded
                  text-sm font-semibold
                  tracking-widest uppercase"
                >
                  Sign In
                </button>
              )}
            </Link>
          </li>
        </ul>
      </div>

      
      <div
        className="md:hidden px-4 pb-3
        border-t border-white/4"
      >
        <form
          onSubmit={handleSubmit}
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
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
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