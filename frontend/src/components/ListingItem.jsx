import { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdLocationOn } from "react-icons/md";
import { FaBath, FaBed, FaBalanceScale, FaHeart } from "react-icons/fa";
import { updateUserFavorites } from "../redux/user/userSlice";
import {
  isListingCompared,
  toggleCompareListing,
} from "../utils/compareListings";

const FALLBACK_IMAGE =
  "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg";

function ListingItem({
  listing,
  onFavoriteChange,
}) {
  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

  const { currentUser } =
    useSelector(
      (state) => state.user
    );

  const listingPath = `/listing/${listing._id}`;
  const coverImage = listing.imageUrls?.[0] || FALLBACK_IMAGE;
  const [
    compared,
    setCompared,
  ] = useState(false);
  const [
    compareMessage,
    setCompareMessage,
  ] = useState("");
  const authUser =
    currentUser?.user ||
    currentUser;

  const favoriteIds =
    authUser?.favorites?.map(
      (favorite) =>
        favorite?._id ||
        favorite?.toString()
    ) || [];

  const isSaved =
    favoriteIds.includes(
      listing._id
    );

  useEffect(() => {
    setCompared(
      isListingCompared(
        listing._id
      )
    );
  }, [listing._id]);

  const handleFavoriteClick =
    async () => {
      if (!authUser) {
        navigate("/sign-in");
        return;
      }

      try {
        const res =
          await fetch(
            `${import.meta.env.VITE_API_URL}/api/user/favorites/${listing._id}`,
            {
              method:
                "POST",
              credentials:
                "include",
            }
          );

        const data =
          await res.json();

        if (
          data.success ===
          false
        ) {
          return;
        }

        dispatch(
          updateUserFavorites(
            data.favorites
          )
        );

        onFavoriteChange?.(
          data
        );
      } catch (error) {
        console.log(
          error.message
        );
      }
    };

  const handleCompareClick = () => {
    const result =
      toggleCompareListing(
        listing
      );

    if (result.limitReached) {
      setCompareMessage(
        "Max 3 properties"
      );
      window.setTimeout(
        () => setCompareMessage(""),
        1800
      );
      return;
    }

    setCompared(result.added);
    setCompareMessage(
      result.added
        ? "Added to compare"
        : "Removed"
    );

    window.setTimeout(
      () => setCompareMessage(""),
      1400
    );
  };

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
              onClick={
                handleFavoriteClick
              }
              className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-[transform,border-color,background-color] duration-200 hover:scale-110 hover:border-[#c9a84c] ${
                isSaved
                  ? "border-[#e86b6b]/60 bg-[#e86b6b]/20"
                  : "border-[rgba(255,255,255,0.07)] bg-[#22262f] hover:bg-[#c9a84c]/25"
              }`}
              type="button"
              aria-label={
                isSaved
                  ? "Remove saved listing"
                  : "Save listing"
              }
            >
              <FaHeart
                className={`text-[0.85rem] ${
                  isSaved
                    ? "text-[#ff8a8a]"
                    : "text-[#e86b6b]"
                }`}
              />
            </button>
            <button
              onClick={
                handleCompareClick
              }
              className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-[transform,border-color,background-color] duration-200 hover:scale-110 hover:border-[#c9a84c] ${
                compared
                  ? "border-[#c9a84c]/70 bg-[#c9a84c]/20"
                  : "border-[rgba(255,255,255,0.07)] bg-[#22262f] hover:bg-[#c9a84c]/25"
              }`}
              type="button"
              aria-label={
                compared
                  ? "Remove from compare"
                  : "Add to compare"
              }
            >
              <FaBalanceScale
                className={`text-[0.85rem] ${
                  compared
                    ? "text-[#c9a84c]"
                    : "text-[#8a8d96]"
                }`}
              />
            </button>
          </div>
        </div>

        {compareMessage && (
          <p className="rounded-md border border-[#c9a84c]/20 bg-[#c9a84c]/10 px-3 py-2 text-center text-xs font-bold uppercase tracking-wider text-[#c9a84c]">
            {compareMessage}
          </p>
        )}

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
