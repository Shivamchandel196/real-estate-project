import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBath,
  FaBed,
  FaChair,
  FaParking,
  FaTimes,
} from "react-icons/fa";
import Footer from "../components/Footer";
import {
  getCompareListings,
  saveCompareListings,
} from "../utils/compareListings";

const formatPrice = (listing) => {
  const price =
    listing.offer
      ? listing.discountPrice
      : listing.regularPrice;

  return `Rs ${(price || 0).toLocaleString(
    "en-IN"
  )}${listing.type === "rent" ? " / month" : ""}`;
};

const getBestValueId = (listings) => {
  if (listings.length < 2) {
    return null;
  }

  return listings.reduce(
    (best, listing) => {
      const currentPrice =
        listing.offer
          ? listing.discountPrice
          : listing.regularPrice;
      const bestPrice =
        best.offer
          ? best.discountPrice
          : best.regularPrice;

      return (currentPrice || 0) <
        (bestPrice || 0)
        ? listing
        : best;
    },
    listings[0]
  )._id;
};

const CompareRow = ({
  label,
  values,
}) => (
  <div className="grid min-w-[780px] grid-cols-[180px_repeat(var(--compare-count),minmax(190px,1fr))] border-t border-zinc-800">
    <div className="bg-zinc-950 p-4 text-sm font-bold uppercase tracking-[0.16em] text-zinc-500">
      {label}
    </div>
    {values.map((value, index) => (
      <div
        key={`${label}-${index}`}
        className="border-l border-zinc-800 p-4 text-sm leading-6 text-zinc-300"
      >
        {value}
      </div>
    ))}
  </div>
);

const Compare = () => {
  const [
    listings,
    setListings,
  ] = useState([]);

  useEffect(() => {
    setListings(
      getCompareListings()
    );
  }, []);

  const bestValueId =
    getBestValueId(listings);

  const removeListing = (listingId) => {
    const updatedListings =
      listings.filter(
        (listing) =>
          listing._id !== listingId
      );

    setListings(updatedListings);
    saveCompareListings(
      updatedListings
    );
  };

  const clearCompare = () => {
    setListings([]);
    saveCompareListings([]);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-yellow-500/10 px-6 pb-12 pt-32">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">
              Compare
            </p>
            <h1 className="text-5xl font-black md:text-7xl">
              Compare Properties
            </h1>
            <p className="mt-4 max-w-2xl text-zinc-400">
              Review price, location, features, and contact details side by side.
            </p>
          </div>

          {listings.length > 0 && (
            <button
              type="button"
              onClick={clearCompare}
              className="rounded-xl border border-red-500/30 px-5 py-3 text-sm font-bold text-red-400 transition hover:bg-red-500/10"
            >
              Clear Compare
            </button>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        {listings.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
            <h2 className="text-3xl font-black">
              No properties selected
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-zinc-400">
              Add properties from listing cards using the compare button.
            </p>
            <Link
              to="/search"
              className="mt-6 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black transition hover:bg-yellow-400"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
            <div
              className="grid min-w-[780px] grid-cols-[180px_repeat(var(--compare-count),minmax(190px,1fr))]"
              style={{
                "--compare-count":
                  listings.length,
              }}
            >
              <div className="bg-zinc-950 p-4" />
              {listings.map((listing) => (
                <div
                  key={listing._id}
                  className="relative border-l border-zinc-800 p-4"
                >
                  <button
                    type="button"
                    onClick={() =>
                      removeListing(
                        listing._id
                      )
                    }
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-zinc-300 transition hover:bg-red-500 hover:text-white"
                    aria-label="Remove from compare"
                  >
                    <FaTimes />
                  </button>

                  <img
                    src={
                      listing.imageUrls?.[0] ||
                      "/bg-img.jpg"
                    }
                    alt={listing.name}
                    className="h-40 w-full rounded-xl object-cover"
                  />

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-300">
                        {listing.type ===
                        "rent"
                          ? "Rent"
                          : "Sale"}
                      </span>
                      {bestValueId ===
                        listing._id && (
                        <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
                          Best Price
                        </span>
                      )}
                    </div>

                    <h2 className="mt-3 text-xl font-black">
                      {listing.name}
                    </h2>

                    <Link
                      to={`/listing/${listing._id}`}
                      className="mt-4 inline-block rounded-lg border border-yellow-500/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                "--compare-count":
                  listings.length,
              }}
            >
              <CompareRow
                label="Price"
                values={listings.map(
                  formatPrice
                )}
              />
              <CompareRow
                label="Location"
                values={listings.map(
                  (listing) =>
                    listing.address
                )}
              />
              <CompareRow
                label="Beds"
                values={listings.map(
                  (listing) => (
                    <span className="inline-flex items-center gap-2">
                      <FaBed className="text-blue-400" />
                      {listing.bedrooms}
                    </span>
                  )
                )}
              />
              <CompareRow
                label="Baths"
                values={listings.map(
                  (listing) => (
                    <span className="inline-flex items-center gap-2">
                      <FaBath className="text-green-400" />
                      {listing.bathrooms}
                    </span>
                  )
                )}
              />
              <CompareRow
                label="Parking"
                values={listings.map(
                  (listing) => (
                    <span className="inline-flex items-center gap-2">
                      <FaParking className="text-orange-400" />
                      {listing.parking
                        ? "Yes"
                        : "No"}
                    </span>
                  )
                )}
              />
              <CompareRow
                label="Furnished"
                values={listings.map(
                  (listing) => (
                    <span className="inline-flex items-center gap-2">
                      <FaChair className="text-violet-400" />
                      {listing.furnished
                        ? "Yes"
                        : "No"}
                    </span>
                  )
                )}
              />
              <CompareRow
                label="Offer"
                values={listings.map(
                  (listing) =>
                    listing.offer
                      ? "Available"
                      : "No"
                )}
              />
              <CompareRow
                label="Contact"
                values={listings.map(
                  (listing) =>
                    listing.contactEmail ||
                    "Open listing"
                )}
              />
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
};

export default Compare;
