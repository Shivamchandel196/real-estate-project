import { useRef, useState } from "react";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";

import axios from "axios";

import { Link } from "react-router-dom";

export default function Profile() {

  const fileRef = useRef(null);

  const {
    currentUser,
    loading,
  } = useSelector(
    (state) => state.user
  );

  const dispatch =
    useDispatch();

  const [filePerc,
    setFilePerc] =
    useState(0);

  const [
    fileUploadError,

    setFileUploadError,

  ] = useState(false);

  const [formData,
    setFormData] =
    useState({});

  const [
    updateSuccess,

    setUpdateSuccess,

  ] = useState(false);

  const [
    showListingsError,

    setShowListingsError,

  ] = useState(false);

  const [
    userListings,

    setUserListings,

  ] = useState([]);

  /* ─────────────────────────────
     IMAGE UPLOAD
  ───────────────────────────── */

  const handleFileUpload =
    async (file) => {

      try {

        setFileUploadError(
          false
        );

        setFilePerc(10);

        const imageData =
          new FormData();

        imageData.append(
          "image",
          file
        );

        const res =
          await axios.post(

            "http://localhost:8000/post",

            imageData,

            {

              headers: {

                "Content-Type":
                  "multipart/form-data",

              },

            }

          );

        setFilePerc(100);

        setFormData(
          (prev) => ({

            ...prev,

            avatar:
              res.data.imageUrl,

          })
        );

      } catch (error) {

        setFileUploadError(
          true
        );

        setFilePerc(0);

        console.log(error);

      }

    };

  /* ─────────────────────────────
     HANDLE CHANGE
  ───────────────────────────── */

  const handleChange = (
    e
  ) => {

    setFormData({

      ...formData,

      [e.target.id]:
        e.target.value,

    });

  };

  /* ─────────────────────────────
     UPDATE USER
  ───────────────────────────── */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        dispatch(
          updateUserStart()
        );

        const res =
          await fetch(

            `/api/user/update/${currentUser._id}`,

            {

              method:
                "POST",

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

            updateUserFailure(
              data.message
            )

          );

          return;

        }

        dispatch(
          updateUserSuccess(
            data
          )
        );

        setUpdateSuccess(
          true
        );

      } catch (error) {

        dispatch(

          updateUserFailure(
            error.message
          )

        );

      }

    };

  /* ─────────────────────────────
     DELETE USER
  ───────────────────────────── */

  const handleDeleteUser =
    async () => {

      try {

        dispatch(
          deleteUserStart()
        );

        const res =
          await fetch(

            `/api/user/delete/${currentUser._id}`,

            {

              method:
                "DELETE",

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

          dispatch(

            deleteUserFailure(
              data.message
            )

          );

          return;

        }

        dispatch(
          deleteUserSuccess(
            data
          )
        );

      } catch (error) {

        dispatch(

          deleteUserFailure(
            error.message
          )

        );

      }

    };

  /* ─────────────────────────────
     SIGN OUT
  ───────────────────────────── */

  const handleSignOut =
    async () => {

      try {

        dispatch(
          signOutUserStart()
        );

        const res =
          await fetch(

            "/api/auth/signout",

            {

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

          dispatch(

            signOutUserFailure(
              data.message
            )

          );

          return;

        }

        dispatch(
          signOutUserSuccess(
            data
          )
        );

      } catch (error) {

        dispatch(

          signOutUserFailure(
            error.message
          )

        );

      }

    };

  /* ─────────────────────────────
     SHOW LISTINGS
  ───────────────────────────── */

  const handleShowListings =
    async () => {

      try {

        setShowListingsError(
          false
        );

        const res =
          await fetch(

            `/api/user/listings/${currentUser._id}`,

            {

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

          setShowListingsError(
            true
          );

          return;

        }

        setUserListings(
          data
        );

      } catch  {

        setShowListingsError(
          true
        );

      }

    };

  /* ─────────────────────────────
     DELETE LISTING
  ───────────────────────────── */

  const handleListingDelete =
    async (
      listingId
    ) => {

      try {

        const res =
          await fetch(

            `/api/listing/delete/${listingId}`,

            {

              method:
                "DELETE",

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

          console.log(
            data.message
          );

          return;

        }

        setUserListings(
          (prev) =>

            prev.filter(

              (listing) =>

                listing._id !==
                listingId

            )

        );

      } catch (error) {

        console.log(
          error.message
        );

      }

    };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-[#020617] to-[#111827] text-white px-4 py-10">

      <div className="max-w-3xl mx-auto bg-[#0f172a] border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl">

        <h1 className="text-4xl font-bold text-center mb-10">
          My Profile
        </h1>

        {/* FORM */}

        <form
          onSubmit={
            handleSubmit
          }

          className="flex flex-col gap-6"
        >

          <input

            onChange={(e) =>

              handleFileUpload(
                e.target.files[0]
              )

            }

            type="file"

            ref={fileRef}

            hidden

            accept="image/*"

          />

          <div className="flex justify-center">

            <img

              onClick={() =>

                fileRef.current.click()

              }

              src={

                formData.avatar ||

                currentUser.avatar

              }

              alt="profile"

              className="rounded-full h-32 w-32 object-cover cursor-pointer border-4 border-yellow-500 shadow-lg hover:scale-105 transition duration-300"

            />

          </div>

          <p className="text-center text-sm">

            {fileUploadError ? (

              <span className="text-red-500">
                Error uploading image
              </span>

            ) : filePerc > 0 &&
              filePerc < 100 ? (

              <span className="text-slate-300">

                Uploading {filePerc}%

              </span>

            ) : filePerc === 100 ? (

              <span className="text-green-500">

                Image uploaded successfully

              </span>

            ) : (
              ""
            )}

          </p>

          <input

            type="text"

            placeholder="username"

            defaultValue={
              currentUser.username
            }

            id="username"

            className="bg-[#111827] border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-yellow-500"

            onChange={
              handleChange
            }

          />

          <input

            type="email"

            placeholder="email"

            id="email"

            defaultValue={
              currentUser.email
            }

            className="bg-[#111827] border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-yellow-500"

            onChange={
              handleChange
            }

          />

          <input

            type="password"

            placeholder="new password"

            id="password"

            className="bg-[#111827] border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-yellow-500"

            onChange={
              handleChange
            }

          />

          <button

            disabled={loading}

            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold p-4 rounded-xl transition duration-300 uppercase tracking-wider"

          >

            {loading
              ? "Loading..."
              : "Update Profile"}

          </button>

          <Link
            to={"/create-listing"}
          >

            <button

              type="button"

              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-4 rounded-xl transition duration-300 uppercase tracking-wider"

            >

              Create Listing

            </button>

          </Link>

        </form>

        {/* ACTIONS */}

        <div className="flex justify-between mt-8 text-sm">

          <span

            onClick={
              handleDeleteUser
            }

            className="text-red-500 cursor-pointer hover:underline"

          >

            Delete Account

          </span>

          <span

            onClick={
              handleSignOut
            }

            className="text-red-400 cursor-pointer hover:underline"

          >

            Sign Out

          </span>

        </div>

        {/* SUCCESS */}

        {updateSuccess && (

          <p className="text-green-500 mt-5 text-center">

            Profile updated successfully!

          </p>

        )}

        {/* SHOW LISTINGS */}

        <button

          onClick={
            handleShowListings
          }

          className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-bold p-4 rounded-xl transition duration-300 uppercase tracking-wider"

        >

          Show Listings

        </button>

        {showListingsError && (

          <p className="text-red-500 mt-4 text-center">

            Error showing listings

          </p>

        )}

        {/* USER LISTINGS */}

        {userListings &&
          userListings.length > 0 && (

          <div className="mt-10 flex flex-col gap-5">

            <h2 className="text-3xl font-bold text-center">

              Your Listings

            </h2>

            {userListings.map(
              (listing) => (

                <div

                  key={listing._id}

                  className="bg-[#111827] border border-slate-700 rounded-2xl p-4 flex items-center justify-between gap-4"

                >

                  <Link
                    to={`/listing/${listing._id}`}
                  >

                    <img

                      src={
                        listing
                          .imageUrls[0]
                      }

                      alt="listing"

                      className="h-20 w-20 rounded-xl object-cover"

                    />

                  </Link>

                  <Link

                    to={`/listing/${listing._id}`}

                    className="flex-1"

                  >

                    <p className="text-lg font-semibold hover:text-yellow-400 transition truncate">

                      {listing.name}

                    </p>

                  </Link>

                  <div className="flex flex-col gap-3">

                    <button

                      onClick={() =>

                        handleListingDelete(
                          listing._id
                        )

                      }

                      className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-sm uppercase font-bold"

                    >

                      Delete

                    </button>

                    <Link
                      to={`/update-listing/${listing._id}`}
                    >

                      <button

                        className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg text-sm uppercase font-bold w-full"

                      >

                        Edit

                      </button>

                    </Link>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );

}