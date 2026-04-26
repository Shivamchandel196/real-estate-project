import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import ListingItem from "../components/ListingItem";

export default function Search() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [
    sidebarData,
    setSidebarData,
  ] = useState({

    searchTerm: "",

    type: "all",

    parking: false,

    furnished: false,

    offer: false,

    sort: "createdAt",

    order: "desc",

  });

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    listings,
    setListings,
  ] = useState([]);

  const [
    showMore,
    setShowMore,
  ] = useState(false);

  useEffect(() => {

    const urlParams =
      new URLSearchParams(
        location.search
      );

    const newSidebarData = {

      searchTerm:

        urlParams.get(
          "searchTerm"
        ) || "",

      type:

        urlParams.get(
          "type"
        ) || "all",

      parking:

        urlParams.get(
          "parking"
        ) === "true",

      furnished:

        urlParams.get(
          "furnished"
        ) === "true",

      offer:

        urlParams.get(
          "offer"
        ) === "true",

      sort:

        urlParams.get(
          "sort"
        ) || "createdAt",

      order:

        urlParams.get(
          "order"
        ) || "desc",

    };

    const fetchListings =
      async () => {

        try {

          setLoading(true);

          setShowMore(
            false
          );

          const searchQuery =
            urlParams.toString();

          const res =
            await fetch(

              `/api/listing/get?${searchQuery}`

            );

          if (!res.ok) {

            throw new Error(
              "Failed to fetch listings"
            );

          }

          const data =
            await res.json();

          setListings(
            data
          );

          setShowMore(
            data.length > 8
          );

          setSidebarData(
            newSidebarData
          );

        } catch (error) {

          console.log(
            error
          );

          setListings([]);

        } finally {

          setLoading(false);

        }

      };

    fetchListings();

  }, [location.search]);

  const handleChange = (
    e
  ) => {

    if (

      [
        "all",
        "rent",
        "sale",
      ].includes(
        e.target.id
      )

    ) {

      setSidebarData(
        (prev) => ({

          ...prev,

          type:
            e.target.id,

        })
      );

    }

    if (
      e.target.id ===
      "searchTerm"
    ) {

      setSidebarData(
        (prev) => ({

          ...prev,

          searchTerm:
            e.target.value,

        })
      );

    }

    if (

      [
        "parking",
        "furnished",
        "offer",
      ].includes(
        e.target.id
      )

    ) {

      setSidebarData(
        (prev) => ({

          ...prev,

          [e.target.id]:

            e.target.checked,

        })
      );

    }

    if (
      e.target.id ===
      "sort_order"
    ) {

      const [
        sort,
        order,
      ] =
        e.target.value.split(
          "_"
        );

      setSidebarData(
        (prev) => ({

          ...prev,

          sort:
            sort ||
            "createdAt",

          order:
            order ||
            "desc",

        })
      );

    }

  };

  const handleSubmit = (
    e
  ) => {

    e.preventDefault();

    const urlParams =
      new URLSearchParams();

    urlParams.set(
      "searchTerm",
      sidebarData.searchTerm
    );

    urlParams.set(
      "type",
      sidebarData.type
    );

    urlParams.set(
      "parking",
      sidebarData.parking
    );

    urlParams.set(
      "furnished",
      sidebarData.furnished
    );

    urlParams.set(
      "offer",
      sidebarData.offer
    );

    urlParams.set(
      "sort",
      sidebarData.sort
    );

    urlParams.set(
      "order",
      sidebarData.order
    );

    navigate(

      `/search?${urlParams.toString()}`

    );

  };

  const onShowMoreClick =
    async () => {

      try {

        const startIndex =
          listings.length;

        const urlParams =
          new URLSearchParams(
            location.search
          );

        urlParams.set(
          "startIndex",
          startIndex
        );

        const res =
          await fetch(

            `/api/listing/get?${urlParams.toString()}`

          );

        if (!res.ok) {

          throw new Error(
            "Failed to load more listings"
          );

        }

        const data =
          await res.json();

        setListings(
          (prev) => [

            ...prev,

            ...data,

          ]
        );

        if (
          data.length < 9
        ) {

          setShowMore(
            false
          );

        }

      } catch (error) {

        console.log(
          error
        );

      }

    };

  return (

    <main className="min-h-screen bg-black text-white flex flex-col lg:flex-row">

      {/* SIDEBAR */}

      <aside className="w-full lg:w-[340px] border-b lg:border-r border-zinc-800 bg-zinc-950 p-8">

        <div className="mb-10">

          <p className="uppercase tracking-[0.3em] text-yellow-500 text-xs font-semibold mb-4">

            Advanced Search

          </p>

          <h1 className="text-4xl font-black">

            Find Your
            <br />

            Dream Home

          </h1>

        </div>

        <form

          onSubmit={
            handleSubmit
          }

          className="flex flex-col gap-8"

        >

          <div>

            <label className="block text-sm uppercase tracking-wider text-zinc-400 mb-3">

              Search

            </label>

            <input

              type="text"

              id="searchTerm"

              placeholder="Search properties..."

              value={
                sidebarData.searchTerm
              }

              onChange={
                handleChange
              }

              className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-500"

            />

          </div>

          <div>

            <label className="block text-sm uppercase tracking-wider text-zinc-400 mb-4">

              Property Type

            </label>

            <div className="flex flex-col gap-4">

              {[
                "all",
                "rent",
                "sale",
              ].map(
                (
                  item
                ) => (

                  <label

                    key={
                      item
                    }

                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                      sidebarData.type ===
                      item

                        ? "border-yellow-500 bg-yellow-500/10"

                        : "border-zinc-800 bg-zinc-900"

                    }`}

                  >

                    <span className="capitalize">

                      {item ===
                      "all"

                        ? "Rent & Sale"

                        : item}

                    </span>

                    <input

                      type="checkbox"

                      id={item}

                      checked={
                        sidebarData.type ===
                        item
                      }

                      onChange={
                        handleChange
                      }

                      className="accent-yellow-500"

                    />

                  </label>

                )

              )}

            </div>

          </div>

          <div>

            <label className="block text-sm uppercase tracking-wider text-zinc-400 mb-4">

              Amenities

            </label>

            <div className="flex flex-col gap-4">

              {[
                "parking",
                "furnished",
                "offer",
              ].map(
                (
                  item
                ) => (

                  <label

                    key={
                      item
                    }

                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                      sidebarData[
                        item
                      ]

                        ? "border-yellow-500 bg-yellow-500/10"

                        : "border-zinc-800 bg-zinc-900"

                    }`}

                  >

                    <span className="capitalize">

                      {item}

                    </span>

                    <input

                      type="checkbox"

                      id={item}

                      checked={
                        sidebarData[
                          item
                        ]
                      }

                      onChange={
                        handleChange
                      }

                      className="accent-yellow-500"

                    />

                  </label>

                )

              )}

            </div>

          </div>

          <div>

            <label className="block text-sm uppercase tracking-wider text-zinc-400 mb-3">

              Sort By

            </label>

            <select

              id="sort_order"

              value={`${sidebarData.sort}_${sidebarData.order}`}

              onChange={
                handleChange
              }

              className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-500"

            >

              <option value="regularPrice_desc">

                Price High to Low

              </option>

              <option value="regularPrice_asc">

                Price Low to High

              </option>

              <option value="createdAt_desc">

                Latest

              </option>

              <option value="createdAt_asc">

                Oldest

              </option>

            </select>

          </div>

          <button

            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-[0.2em] p-5 rounded-2xl transition"

          >

            Search

          </button>

        </form>

      </aside>

      {/* RESULTS */}

      <section className="flex-1 p-6 md:p-10">

        <div className="flex items-end justify-between border-b border-zinc-800 pb-6 mb-10">

          <div>

            <p className="uppercase tracking-[0.3em] text-yellow-500 text-xs font-semibold mb-4">

              Properties

            </p>

            <h2 className="text-5xl font-black">

              Search Results

            </h2>

          </div>

          <p className="text-zinc-500">

            {
              listings.length
            } Listings Found

          </p>

        </div>

        {loading && (

          <div className="flex justify-center py-20">

            <div className="w-12 h-12 border-2 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>

          </div>

        )}

        {!loading &&
          listings.length ===
            0 && (

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">

              <h3 className="text-3xl font-bold mb-4">

                No Listings Found

              </h3>

              <p className="text-zinc-500">

                Try changing your filters

              </p>

            </div>

          )}

        {!loading &&
          listings.length >
            0 && (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {listings.map(
                (
                  listing
                ) => (

                  <ListingItem

                    key={
                      listing._id
                    }

                    listing={
                      listing
                    }

                  />

                )

              )}

            </div>

          )}

        {showMore && (

          <div className="flex justify-center mt-14">

            <button

              onClick={
                onShowMoreClick
              }

              className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 rounded-2xl font-semibold transition"

            >

              Show More

            </button>

          </div>

        )}

      </section>

    </main>

  );

}