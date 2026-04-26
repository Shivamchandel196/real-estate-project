import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const CreateListing = () => {

  const [files, setFiles] =
    useState([]);

  const [formData, setFormData] =
    useState({
      imageUrls: [],
      name: "",
      description: "",
      address: "",
      contactEmail: "",
      contactNumber: "",
      type: "rent",
      bedrooms: 1,
      bathrooms: 1,
      regularPrice: "",
      discountPrice: "",
      offer: false,
      parking: false,
      furnished: false,
    });

  const [
    imageUploadError,
    setImageUploadError,
  ] = useState("");

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const { currentUser } =
    useSelector(
      (state) => state.user
    );

  const navigate =
    useNavigate();

  const handleChange =
    (e) => {

      const {
        id,
        value,
        type,
        checked,
      } = e.target;

      if (
        type ===
        "checkbox"
      ) {

        if (
          id ===
            "sale" ||
          id ===
            "rent"
        ) {

          setFormData({
            ...formData,

            type: id,
          });

        } else {

          setFormData({
            ...formData,

            [id]:
              checked,
          });

        }

      } else {

        setFormData({
          ...formData,

          [id]:
            value,
        });

      }

    };

  /* IMAGEKIT / BACKEND IMAGE UPLOAD */

  const handleImageSubmit =
    async () => {

      if (
        files.length === 0
      ) {

        return setImageUploadError(
          "Please select images"
        );

      }

      try {

        setUploading(true);

        setImageUploadError(
          ""
        );

        const uploadedUrls =
          [];

        for (
          let i = 0;
          i < files.length;
          i++
        ) {

          const imageData =
            new FormData();

          imageData.append(
            "image",
            files[i]
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

          uploadedUrls.push(
            res.data
              .imageUrl
          );

        }

        setFormData({
          ...formData,

          imageUrls:
            uploadedUrls,
        });

        setUploading(
          false
        );

      } catch {

        setUploading(
          false
        );

        setImageUploadError(
          "Image upload failed"
        );

      }

    };

  const handleRemoveImage =
    (index) => {

      setFormData({
        ...formData,

        imageUrls:
          formData.imageUrls.filter(
            (
              _,
              i
            ) =>
              i !==
              index
          ),
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        if (
          formData
            .imageUrls
            .length < 1
        ) {

          return setError(
            "Upload at least one image"
          );

        }

        setLoading(true);

        setError("");

        const res =
          await fetch(
            `${API_URL}/api/listing/create`,
            {
              method:
                "POST",

              headers:
                {
                  "Content-Type":
                    "application/json",
                },

              credentials:
                "include",

              body:
                JSON.stringify(
                  {
                    ...formData,

                    userRef:
                      currentUser?._id ||
                      currentUser
                        ?.id ||
                      currentUser
                        ?.user
                        ?._id,
                  }
                ),
            }
          );

        const data =
          await res.json();

        setLoading(
          false
        );

        if (
          data.success ===
          false
        ) {

          return setError(
            data.message
          );

        }

        navigate(
          `/listing/${data._id}`
        );

      } catch (err) {

        setLoading(
          false
        );

        setError(
          err.message
        );

      }

    };

  return (

    <main className="min-h-screen bg-gradient-to-b from-black via-[#020617] to-black text-white px-4 py-10">

      <div className="max-w-6xl mx-auto bg-[#08122b] border border-yellow-500/10 rounded-[35px] p-6 md:p-10 shadow-[0_0_40px_rgba(255,196,0,0.08)]">

        <h1 className="text-5xl font-black text-center mb-10">

          Create Listing

        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="grid md:grid-cols-2 gap-10"
        >

          {/* LEFT */}

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Property Name"
              id="name"
              required
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              className="w-full bg-black/40 border border-zinc-700 focus:border-yellow-400 outline-none px-5 py-4 rounded-2xl"
            />

            <textarea
              placeholder="Description"
              id="description"
              required
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              className="w-full h-40 resize-none bg-black/40 border border-zinc-700 focus:border-yellow-400 outline-none px-5 py-4 rounded-2xl"
            />

            <input
              type="text"
              placeholder="Address"
              id="address"
              required
              value={
                formData.address
              }
              onChange={
                handleChange
              }
              className="w-full bg-black/40 border border-zinc-700 focus:border-yellow-400 outline-none px-5 py-4 rounded-2xl"
            />

            <input
              type="email"
              placeholder="Contact Email"
              id="contactEmail"
              required
              value={
                formData.contactEmail
              }
              onChange={
                handleChange
              }
              className="w-full bg-black/40 border border-zinc-700 focus:border-yellow-400 outline-none px-5 py-4 rounded-2xl"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              id="contactNumber"
              required
              value={
                formData.contactNumber
              }
              onChange={
                handleChange
              }
              className="w-full bg-black/40 border border-zinc-700 focus:border-yellow-400 outline-none px-5 py-4 rounded-2xl"
            />

            <div className="grid grid-cols-2 gap-4">

              <input
                type="number"
                placeholder="Bedrooms"
                id="bedrooms"
                min="1"
                value={
                  formData.bedrooms
                }
                onChange={
                  handleChange
                }
                className="bg-black/40 border border-zinc-700 focus:border-yellow-400 outline-none px-5 py-4 rounded-2xl"
              />

              <input
                type="number"
                placeholder="Bathrooms"
                id="bathrooms"
                min="1"
                value={
                  formData.bathrooms
                }
                onChange={
                  handleChange
                }
                className="bg-black/40 border border-zinc-700 focus:border-yellow-400 outline-none px-5 py-4 rounded-2xl"
              />

            </div>

            <div className="grid grid-cols-2 gap-4">

              <input
                type="number"
                placeholder="Regular Price"
                id="regularPrice"
                required
                value={
                  formData.regularPrice
                }
                onChange={
                  handleChange
                }
                className="bg-black/40 border border-zinc-700 focus:border-yellow-400 outline-none px-5 py-4 rounded-2xl"
              />

              <input
                type="number"
                placeholder="Discount Price"
                id="discountPrice"
                value={
                  formData.discountPrice
                }
                onChange={
                  handleChange
                }
                className="bg-black/40 border border-zinc-700 focus:border-yellow-400 outline-none px-5 py-4 rounded-2xl"
              />

            </div>

            <div className="flex flex-wrap gap-5">

              {[
                "sale",
                "rent",
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
                    className="flex items-center gap-2"
                  >

                    <input
                      type="checkbox"
                      id={
                        item
                      }
                      checked={
                        item ===
                          "sale" ||
                        item ===
                          "rent"
                          ? formData.type ===
                            item
                          : formData[
                              item
                            ]
                      }
                      onChange={
                        handleChange
                      }
                      className="w-5 h-5 accent-yellow-400"
                    />

                    <span className="capitalize">
                      {
                        item
                      }
                    </span>

                  </label>

                )
              )}

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <div className="border border-dashed border-zinc-700 bg-black/30 rounded-3xl p-6">

              <h2 className="text-3xl font-black mb-6">

                Upload Images

              </h2>

              <div className="flex gap-4">

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(
                    e
                  ) =>
                    setFiles(
                      Array.from(
                        e.target
                          .files
                      )
                    )
                  }
                  className="w-full bg-zinc-900 border border-zinc-700 p-4 rounded-2xl"
                />

                <button
                  type="button"
                  onClick={
                    handleImageSubmit
                  }
                  disabled={
                    uploading
                  }
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-black px-6 rounded-2xl"
                >

                  {uploading
                    ? "..."
                    : "Upload"}

                </button>

              </div>

              {imageUploadError && (

                <p className="text-red-400 mt-3">

                  {
                    imageUploadError
                  }

                </p>

              )}

              {/* SHOW ONLY AFTER UPLOAD */}

              {
                formData
                  .imageUrls
                  .length >
                  0 && (

                  <div className="grid grid-cols-2 gap-4 mt-6">

                    {formData.imageUrls.map(
                      (
                        url,
                        index
                      ) => (

                        <div
                          key={
                            index
                          }
                          className="relative"
                        >

                          <img
                            src={
                              url
                            }
                            alt="listing"
                            className="h-40 w-full object-cover rounded-2xl"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveImage(
                                index
                              )
                            }
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-xs"
                          >

                            X

                          </button>

                        </div>

                      )
                    )}

                  </div>

                )
              }

            </div>

            <button
              disabled={
                loading ||
                uploading
              }
              className="w-full mt-8 bg-yellow-400 hover:bg-yellow-300 text-black font-black py-5 rounded-2xl text-xl"
            >

              {loading
                ? "Creating..."
                : "Create Listing"}

            </button>

            {error && (

              <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-2xl mt-5">

                {error}

              </div>

            )}

          </div>

        </form>

      </div>

    </main>

  );

};

export default CreateListing;