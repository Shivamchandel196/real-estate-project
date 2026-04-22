import { FaSearch } from "react-icons/fa";
import {Link,useNavigate,useLocation,} from "react-router-dom";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {

  const { currentUser } = useSelector(
    (state) => state.user
  );

  console.log(currentUser);

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  const handleSubmit = (e) => {

    e.preventDefault();

    const urlParams = new URLSearchParams(
      location.search
    );

    if (searchTerm.trim()) {

      urlParams.set(
        "searchTerm",
        searchTerm
      );

    } else {

      urlParams.delete("searchTerm");

    }

    navigate(
      `/search?${urlParams.toString()}`
    );
  };

  useEffect(() => {

    const urlParams = new URLSearchParams(
      location.search
    );

    const searchTermFromUrl =
      urlParams.get("searchTerm") || "";

    if (
      searchTermFromUrl !== searchTerm
    ) {

      setTimeout(() => {
        setSearchTerm(searchTermFromUrl);
      }, 0);

    }

  }, [location.search, searchTerm]);

  return (

    <header className="bg-slate-200 shadow-md">

      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">

        <Link to="/">

          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">

            <span className="text-slate-500">
              Royal
            </span>

            <span className="text-slate-700">
              Estate
            </span>

          </h1>

        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
          />

          <button type="submit">

            <FaSearch className="text-slate-600" />

          </button>

        </form>

        <ul className="flex gap-4 items-center">

          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>

          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>

          <Link to="/profile">

            {currentUser ? (

              <img
                src={
                  currentUser?.avatar
                    ? currentUser.avatar.startsWith(
                        "http"
                      )
                      ? currentUser.avatar
                      : `http://localhost:8000${currentUser.avatar}`
                    : "http://localhost:8000/profile.png"
                }
                alt="profile"
                className="rounded-full h-8 w-8 object-cover"
              />

            ) : (

              <li className="text-slate-700 hover:underline">
                Sign In
              </li>

            )}

          </Link>

        </ul>

      </div>

    </header>
  );
};

export default Header;