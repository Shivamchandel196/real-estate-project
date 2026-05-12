import { useEffect, useMemo, useState } from "react";
import {
  FaBars,
  FaChevronDown,
  FaPlus,
  FaSearch,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice";

const API_URL = import.meta.env.VITE_API_URL || "";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/search", label: "Explore" },
  { to: "/compare", label: "Compare" },
];

const getUserDetails = (currentUser) => {
  const user = currentUser?.user || currentUser || {};

  return {
    avatar: user.avatar || user.profilePicture || "/profile.png",
    email: user.email || "No Email",
    username: user.username || "User",
  };
};

const navClassName = ({ isActive }) =>
  [
    "rounded-xl px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300",
    isActive
      ? "bg-yellow-500/10 text-yellow-400"
      : "text-slate-400 hover:bg-yellow-500/10 hover:text-yellow-400",
  ].join(" ");

const SearchForm = ({ searchTerm, setSearchTerm, onSubmit, compact = false }) => (
  <form
    onSubmit={onSubmit}
    className={[
      "flex items-center rounded-full border border-white/[0.07] bg-[#1a1d24] transition-all duration-300",
      "focus-within:border-yellow-500/50 focus-within:shadow-[0_0_0_3px_rgba(201,168,76,0.15)]",
      compact ? "px-4 py-2" : "px-5 py-2",
    ].join(" ")}
  >
    <input
      type="text"
      placeholder="Search properties..."
      className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    <button
      type="submit"
      aria-label="Search properties"
      className={[
        "ml-2 flex items-center justify-center rounded-full text-black transition-all duration-200",
        compact
          ? "h-9 w-9 bg-yellow-500 text-sm hover:bg-yellow-400"
          : "h-10 w-10 bg-yellow-500 hover:scale-110 hover:bg-yellow-400",
      ].join(" ")}
    >
      <FaSearch />
    </button>
  </form>
);

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const userDetails = useMemo(
    () => getUserDetails(currentUser),
    [currentUser]
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const params = new URLSearchParams(location.search);

      setSearchTerm(params.get("searchTerm") || "");
      setProfileOpen(false);
      setMobileOpen(false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    const trimmedSearch = searchTerm.trim();

    if (trimmedSearch) {
      params.set("searchTerm", trimmedSearch);
    }

    navigate(`/search${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await fetch(`${API_URL}/api/auth/signout`, {
        credentials: "include",
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }

      dispatch(signOutUserSuccess());
      navigate("/sign-in");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <header
      className={[
        "fixed left-0 top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-yellow-900/30 bg-[#111318]/90 shadow-[0_4px_30px_rgba(0,0,0,0.65)] backdrop-blur-xl"
          : "border-yellow-900/20 bg-[#111318] shadow-[0_4px_30px_rgba(0,0,0,0.6)]",
      ].join(" ")}
    >
      <div className="mx-auto flex h-[85px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex min-w-fit flex-col gap-0.5 leading-none">
          <h1 className="font-serif text-2xl font-black tracking-wide sm:text-3xl">
            <span className="text-yellow-500">Royal</span>
            <span className="text-white">Estate</span>
          </h1>
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-slate-500">
            Find Your Dream Home
          </span>
        </Link>

        <div className="hidden min-w-[260px] flex-1 justify-center md:flex">
          <div className="w-full max-w-xl">
            <SearchForm
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSubmit={handleSubmit}
            />
          </div>
        </div>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClassName} end>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/5 p-1 pr-2 transition-all duration-300 hover:border-yellow-500/60 hover:bg-yellow-500/10"
              >
                <img
                  src={userDetails.avatar}
                  alt="profile"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/profile.png";
                  }}
                  className="h-11 w-11 rounded-full border-2 border-yellow-500 object-cover"
                />
                <FaChevronDown
                  className={[
                    "hidden text-xs text-yellow-500 transition-transform sm:block",
                    profileOpen ? "rotate-180" : "",
                  ].join(" ")}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-[calc(100%+14px)] z-50 w-64 rounded-2xl border border-yellow-500/20 bg-[#111827] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
                  <div className="absolute -top-2 right-6 h-4 w-4 rotate-45 border-l border-t border-yellow-500/20 bg-[#111827]" />

                  <div className="flex items-center gap-3">
                    <img
                      src={userDetails.avatar}
                      alt="profile"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/profile.png";
                      }}
                      className="h-12 w-12 rounded-full border border-yellow-500 object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-white">
                        {userDetails.username}
                      </p>
                      <p className="mt-1 truncate text-xs text-slate-400">
                        {userDetails.email}
                      </p>
                    </div>
                  </div>

                  <div className="my-4 border-t border-white/10" />

                  <Link
                    to="/profile"
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-yellow-500/10 hover:text-yellow-400"
                  >
                    <FaUser className="text-xs" />
                    Profile
                  </Link>
                  <Link
                    to="/create-listing"
                    className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-yellow-500/10 hover:text-yellow-400"
                  >
                    <FaPlus className="text-xs" />
                    Create Listing
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                  >
                    <FaSignOutAlt className="text-xs" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/sign-in"
              className="hidden rounded-xl border border-yellow-500/50 px-5 py-2 text-sm font-bold tracking-wide text-yellow-500 transition-all duration-300 hover:bg-yellow-500 hover:text-black sm:block"
            >
              Sign In
            </Link>
          )}

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#1a1d24] text-yellow-500 transition hover:border-yellow-500/50 lg:hidden"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/5 bg-[#0f1117] px-4 pb-5 pt-4 shadow-[0_18px_40px_rgba(0,0,0,0.45)] lg:hidden">
          <SearchForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSubmit={handleSubmit}
            compact
          />

          <nav className="mt-4 grid gap-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "rounded-xl px-4 py-3 text-sm font-semibold transition",
                    isActive
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "text-slate-300 hover:bg-yellow-500/10 hover:text-yellow-400",
                  ].join(" ")
                }
                end
              >
                {item.label}
              </NavLink>
            ))}

            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-yellow-500/10 hover:text-yellow-400"
                >
                  Profile
                </Link>
                <Link
                  to="/create-listing"
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-yellow-500/10 hover:text-yellow-400"
                >
                  Create Listing
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/sign-in"
                className="rounded-xl border border-yellow-500/40 px-4 py-3 text-center text-sm font-bold text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
