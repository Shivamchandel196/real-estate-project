import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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

const API_URL =
  import.meta.env.VITE_API_URL;

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

  const [
    filePerc,
    setFilePerc,
  ] = useState(0);

  const [
    fileUploadError,
    setFileUploadError,
  ] = useState(false);

  const [
    formData,
    setFormData,
  ] = useState({});

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

  const userId =
    currentUser?._id ||
    currentUser?.id ||
    currentUser?.user?._id;

  /* IMAGE UPLOAD */

  const handleFileUpload =
    async (file) => {

      try {

        setFileUploadError(
          false
        );

        setFilePerc(20);

        const imageData =
          new FormData();

        imageData.append(
          "image",
          file
        );

        const res =
          await axios.post(
            `${API_URL}/post`,
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

  /* HANDLE CHANGE */

  const handleChange =
    (e) => {

      setFormData({
        ...formData,

        [e.target.id]:
          e.target.value,
      });

    };

  /* UPDATE USER */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        dispatch(
          updateUserStart()
        );

        const res =
          await fetch(
            `${API_URL}/api/user/update/${userId}`,
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

  /* DELETE USER */

  const handleDeleteUser =
    async () => {

      try {

        dispatch(
          deleteUserStart()
        );

        const res =
          await fetch(
            `${API_URL}/api/user/delete/${userId}`,
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

  /* SIGN OUT */

  const handleSignOut =
    async () => {

      try {

        dispatch(
          signOutUserStart()
        );

        const res =
          await fetch(
            `${API_URL}/api/auth/signout`,
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

  /* SHOW LISTINGS */

  const handleShowListings =
    async () => {

      try {

        setShowListingsError(
          false
        );

        const res =
          await fetch(
            `${API_URL}/api/user/listings/${userId}`,
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

      } catch {

        setShowListingsError(
          true
        );

      }

    };

  /* DELETE LISTING */

  const handleListingDelete =
    async (
      listingId
    ) => {

      try {

        const res =
          await fetch(
            `${API_URL}/api/listing/delete/${listingId}`,
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

          return;

        }

        setUserListings(
          (prev) =>
            prev.filter(
              (
                listing
              ) =>
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

      <div className="max-w-4xl mx-auto bg-[#08122b] border border-yellow-500/10 rounded-[35px] p-8 md:p-10 shadow-[0_0_40px_rgba(255,196,0,0.08)]">

        <h1 className="text-5xl font-black text-center mb-10">

          My Profile

        </h1>

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
                currentUser?.avatar ||
                "/profile.png"
              }
              alt="profile"
              className="rounded-full h-36 w-36 object-cover cursor-pointer border-4 border-yellow-400 shadow-lg hover:scale-105 transition duration-300"
            />

          </div>

          <p className="text-center text-sm">

            {fileUploadError ? (

              <span className="text-red-500">

                Error uploading image

              </span>

            ) : filePerc > 0 &&
              filePerc < 100 ? (

              <span className="text-yellow-400">

                Uploading {filePerc}%

              </span>

            ) : filePerc ===
              100 ? (

              <span className="text-green-500">

                Image uploaded successfully

              </span>

            ) : (
              ""
            )}

          </p>

          <input
            type="text"
            placeholder="Username"
            defaultValue={
              currentUser?.username
            }
            id="username"
            className="bg-black/40 border border-zinc-700 focus:border-yellow-400 outline-none p-4 rounded-2xl"
            onChange={
              handleChange
            }
          />

          <input
            type="email"
            placeholder="Email"
            id="email"
            defaultValue={
              currentUser?.email
            }
            className="bg-black/40 border border-zinc-700 focus:border-yellow-400 outline-none p-4 rounded-2xl"
            onChange={
              handleChange
            }
          />

          <input
            type="password"
            placeholder="New Password"
            id="password"
            className="bg-black/40 border border-zinc-700 focus:border-yellow-400 outline-none p-4 rounded-2xl"
            onChange={
              handleChange
            }
          />

          <button
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-black p-4 rounded-2xl transition-all duration-300 uppercase tracking-wider"
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
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black p-4 rounded-2xl transition-all duration-300 uppercase tracking-wider"
            >

              Create Listing

            </button>

          </Link>

        </form>

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

        {updateSuccess && (

          <p className="text-green-500 mt-5 text-center">

            Profile updated successfully!

          </p>

        )}

        <button
          onClick={
            handleShowListings
          }
          className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-black p-4 rounded-2xl transition-all duration-300 uppercase tracking-wider"
        >

          Show Listings

        </button>

        {showListingsError && (

          <p className="text-red-500 mt-4 text-center">

            Error showing listings

          </p>

        )}

        {userListings &&
          userListings.length >
            0 && (

            <div className="mt-10 flex flex-col gap-5">

              <h2 className="text-3xl font-black text-center">

                Your Listings

              </h2>

              {userListings.map(
                (
                  listing
                ) => (

                  <div
                    key={
                      listing._id
                    }
                    className="bg-black/40 border border-zinc-700 rounded-3xl p-4 flex items-center justify-between gap-4 hover:border-yellow-400 transition-all"
                  >

                    <Link
                      to={`/listing/${listing._id}`}
                    >

                      <img
                        src={
                          listing
                            ?.imageUrls?.[0]
                        }
                        alt="listing"
                        className="h-24 w-24 rounded-2xl object-cover"
                      />

                    </Link>

                    <Link
                      to={`/listing/${listing._id}`}
                      className="flex-1"
                    >

                      <p className="text-lg font-bold hover:text-yellow-400 truncate transition-all">

                        {
                          listing.name
                        }

                      </p>

                    </Link>

                    <div className="flex flex-col gap-3">

                      <button
                        onClick={() =>
                          handleListingDelete(
                            listing._id
                          )
                        }
                        className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl text-sm uppercase font-bold"
                      >

                        Delete

                      </button>

                      <Link
                        to={`/update-listing/${listing._id}`}
                      >

                        <button
                          className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-xl text-sm uppercase font-bold w-full"
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