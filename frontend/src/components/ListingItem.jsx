import { memo } from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaBath, FaBed, FaHeart, FaShareAlt } from "react-icons/fa";

const FALLBACK_IMAGE =
  "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg";

function ListingItem({ listing }) {
  const listingPath = `/listing/${listing._id}`;
  const coverImage = listing.imageUrls?.[0] || FALLBACK_IMAGE;

  return (
    <div className="group relative w-full overflow-hidden rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[#1a1d24] font-sans transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-[rgba(201,168,76,0.45)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.55)]">
      <div className="pointer-events-none absolute inset-0 z-10 rounded-[14px] bg-linear-to-br from-[#c9a84c]/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <Link
        to={listingPath}
        aria-label={`View ${listing.name}`}
        className="block no-underline"
      >
        <div className="relative h-[220px] overflow-hidden">
          <img
            src={coverImage}
            alt="listing cover"
            className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.07]"
            loading="lazy"
            decoding="async"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-[rgba(11,12,14,0.7)] to-transparent" />

          <span className="absolute left-3 top-3 z-20 rounded-full bg-[#4a8fe8] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
            {listing.type === "rent" ? "For Rent" : "For Sale"}
          </span>

          {listing.offer && (
            <span className="absolute right-3 top-3 z-20 rounded-full bg-[#c9a84c] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#0b0c0e] shadow-[0_2px_10px_rgba(201,168,76,0.25)]">
              Offer
            </span>
          )}
        </div>
      </Link>

      <div className="relative z-20 flex flex-col gap-3 px-[1.3rem] pb-[1.4rem] pt-[1.3rem]">
        <Link to={listingPath} className="block no-underline">
          <h2 className="overflow-hidden text-ellipsis whitespace-nowrap font-serif text-[1.15rem] font-bold leading-tight text-[#f0ece4]">
            {listing.name}
          </h2>

          <div className="mt-3 flex items-center gap-1.5 text-[0.82rem] text-[#8a8d96]">
            <MdLocationOn className="shrink-0 text-base text-[#4caf82]" />
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              {listing.address}
            </p>
          </div>

          <p className="mt-3 overflow-hidden text-[0.83rem] leading-[1.6] text-[#8a8d96] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
            {listing.description}
          </p>
        </Link>

        <div className="flex items-center justify-between">
          <Link to={listingPath} className="block no-underline">
            <div>
              <p className="font-serif text-2xl font-black leading-none text-[#c9a84c]">
                $
                {listing.offer
                  ? listing.discountPrice?.toLocaleString("en-US")
                  : listing.regularPrice?.toLocaleString("en-US")}
              </p>
              {listing.type === "rent" && (
                <p className="mt-1 text-xs font-normal text-[#8a8d96]">
                  per month
                </p>
              )}
            </div>
          </Link>

          <div className="flex gap-2">
            <button
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[rgba(255,255,255,0.07)] bg-[#22262f] transition-[transform,border-color,background-color] duration-200 hover:scale-110 hover:border-[#c9a84c] hover:bg-[#c9a84c]/25"
              type="button"
              aria-label="Save listing"
            >
              <FaHeart className="text-[0.85rem] text-[#e86b6b]" />
            </button>
            <button
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[rgba(255,255,255,0.07)] bg-[#22262f] transition-[transform,border-color,background-color] duration-200 hover:scale-110 hover:border-[#c9a84c] hover:bg-[#c9a84c]/25"
              type="button"
              aria-label="Share listing"
            >
              <FaShareAlt className="text-[0.85rem] text-[#8a8d96]" />
            </button>
          </div>
        </div>

        <Link to={listingPath} className="block no-underline">
          <div className="flex gap-2.5">
            <div className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-[rgba(255,255,255,0.06)] bg-[#22262f] px-3 py-1.5 text-[0.8rem] font-semibold text-[#8a8d96]">
              <FaBed className="text-[0.85rem] text-[#4a8fe8]" />
              <span>{listing.bedrooms} Beds</span>
            </div>
            <div className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-[rgba(255,255,255,0.06)] bg-[#22262f] px-3 py-1.5 text-[0.8rem] font-semibold text-[#8a8d96]">
              <FaBath className="text-[0.85rem] text-[#4caf82]" />
              <span>{listing.bathrooms} Baths</span>
            </div>
          </div>
        </Link>

        <Link
          className="mt-1 block w-full rounded-[7px] border border-[#c9a84c]/35 bg-transparent p-3 text-center text-[0.82rem] font-bold uppercase tracking-[0.1em] text-[#c9a84c] no-underline transition-[transform,border-color,background-color,box-shadow,color] duration-200 hover:-translate-y-0.5 hover:border-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0b0c0e] hover:shadow-[0_6px_24px_rgba(201,168,76,0.25)]"
          to={listingPath}
        >
          View Property
        </Link>
      </div>
    </div>
  );
}

export default memo(ListingItem);
