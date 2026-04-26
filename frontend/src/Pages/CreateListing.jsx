import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {

  const [files, setFiles] =
    useState([]);

  const [formData, setFormData] =
    useState({

      imageUrls: [],

      name: "",

      description: "",

      address: "",

      contactNumber: "",

      contactEmail: "",

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

  const handleImageSubmit =
    async () => {

      if (
        files.length === 0
      ) {

        return setImageUploadError(
          "Please select images"
        );

      }

      if (

        files.length +
          formData.imageUrls
            .length >
        6

      ) {

        return setImageUploadError(
          "Maximum 6 images allowed"
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

              "http://localhost:8000/post",

              imageData,

              {

                headers: {

                  "Content-Type":
                    "multipart/form-data",

                },

              }

            );

          uploadedUrls.push(
            res.data.imageUrl
          );

        }

        setFormData(
          (prev) => ({

            ...prev,

            imageUrls: [

              ...prev.imageUrls,

              ...uploadedUrls,

            ],

          })
        );

        setUploading(false);

      } catch {

        setImageUploadError(
          "Image upload failed"
        );

        setUploading(false);

      }

    };

  const handleRemoveImage =
    (index) => {

      setFormData(
        (prev) => ({

          ...prev,

          imageUrls:
            prev.imageUrls.filter(

              (_, i) =>
                i !== index

            ),

        })
      );

    };

  const handleChange = (e) => {

    if (
      e.target.id === "sale" ||
      e.target.id === "rent"
    ) {

      return setFormData(
        (prev) => ({

          ...prev,

          type:
            e.target.id,

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

      return setFormData(
        (prev) => ({

          ...prev,

          [e.target.id]:
            e.target.checked,

        })
      );

    }

    if (

      [
        "number",
        "text",
        "email",
      ].includes(
        e.target.type
      ) ||

      e.target.tagName ===
        "TEXTAREA"

    ) {

      setFormData(
        (prev) => ({

          ...prev,

          [e.target.id]:

            e.target.type ===
            "number"

              ? Number(
                  e.target.value
                )

              : e.target.value,

        })
      );

    }

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (

        formData.imageUrls
          .length < 1

      ) {

        return setError(
          "Upload at least one image"
        );

      }

      if (

        formData.offer &&

        formData.discountPrice >=
          formData.regularPrice

      ) {

        return setError(

          "Discount price must be less than regular price"

        );

      }

      try {

        setLoading(true);

        setError("");

        const res =
          await fetch(

            "http://localhost:8000/api/listing/create",

            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

              },

              credentials:
                "include",

              body:
                JSON.stringify({

                  ...formData,

                  userRef:
                    currentUser.id,

                }),

            }

          );

        const data =
          await res.json();

        setLoading(false);

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

        setLoading(false);

        setError(
          err.message
        );

      }

    };

  return (

    <main className="min-h-screen bg-black text-white px-4 py-10">

      <div className="max-w-6xl mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

        <div className="mb-10">

          <p className="uppercase tracking-[0.3em] text-yellow-500 text-xs font-semibold mb-4">

            New Property

          </p>

          <h1 className="text-5xl font-black mb-3">

            Create{" "}

            <span className="text-yellow-500">

              Listing

            </span>

          </h1>

          <p className="text-zinc-500">

            Fill in the property details to publish your listing

          </p>

        </div>

        <form

          onSubmit={
            handleSubmit
          }

          className="grid lg:grid-cols-2 gap-10"

        >

          <div className="flex flex-col gap-5">

            <input
              type="text"
              id="name"
              placeholder="Property Name"
              required
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              className="bg-zinc-800 border border-zinc-700 p-4 rounded-2xl outline-none focus:border-yellow-500"
            />

            <textarea
              id="description"
              placeholder="Description"
              required
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              className="bg-zinc-800 border border-zinc-700 p-4 rounded-2xl outline-none focus:border-yellow-500 min-h-[140px]"
            />

            <input
              type="text"
              id="address"
              placeholder="Address"
              required
              value={
                formData.address
              }
              onChange={
                handleChange
              }
              className="bg-zinc-800 border border-zinc-700 p-4 rounded-2xl outline-none focus:border-yellow-500"
            />

            <input
              type="text"
              id="contactNumber"
              placeholder="Contact Number"
              required
              value={
                formData.contactNumber
              }
              onChange={
                handleChange
              }
              className="bg-zinc-800 border border-zinc-700 p-4 rounded-2xl outline-none focus:border-yellow-500"
            />

            <input
              type="email"
              id="contactEmail"
              placeholder="Contact Email"
              required
              value={
                formData.contactEmail
              }
              onChange={
                handleChange
              }
              className="bg-zinc-800 border border-zinc-700 p-4 rounded-2xl outline-none focus:border-yellow-500"
            />

            <div className="grid grid-cols-2 gap-4">

              <input
                type="number"
                id="bedrooms"
                placeholder="Bedrooms"
                required
                value={
                  formData.bedrooms
                }
                onChange={
                  handleChange
                }
                className="bg-zinc-800 border border-zinc-700 p-4 rounded-2xl outline-none focus:border-yellow-500"
              />

              <input
                type="number"
                id="bathrooms"
                placeholder="Bathrooms"
                required
                value={
                  formData.bathrooms
                }
                onChange={
                  handleChange
                }
                className="bg-zinc-800 border border-zinc-700 p-4 rounded-2xl outline-none focus:border-yellow-500"
              />

            </div>

            <input
              type="number"
              id="regularPrice"
              placeholder="Regular Price"
              required
              value={
                formData.regularPrice
              }
              onChange={
                handleChange
              }
              className="bg-zinc-800 border border-zinc-700 p-4 rounded-2xl outline-none focus:border-yellow-500"
            />

            {formData.offer && (

              <input
                type="number"
                id="discountPrice"
                placeholder="Discount Price"
                value={
                  formData.discountPrice
                }
                onChange={
                  handleChange
                }
                className="bg-zinc-800 border border-zinc-700 p-4 rounded-2xl outline-none focus:border-yellow-500"
              />

            )}

          </div>

          <div className="flex flex-col gap-6">

            <div className="flex gap-4">

              {[
                "sale",
                "rent",
              ].map((type) => (

                <button

                  key={type}

                  type="button"

                  onClick={() =>

                    setFormData({
                      ...formData,
                      type,
                    })

                  }

                  className={`flex-1 p-4 rounded-2xl border transition font-semibold uppercase ${
                    formData.type ===
                    type

                      ? "bg-yellow-500 text-black border-yellow-500"

                      : "bg-zinc-800 border-zinc-700 text-white"

                  }`}

                >

                  {type}

                </button>

              ))}

            </div>

            <div className="flex flex-wrap gap-4">

              {[
                "parking",
                "furnished",
                "offer",
              ].map((item) => (

                <label

                  key={item}

                  className={`px-5 py-3 rounded-2xl border cursor-pointer capitalize transition ${
                    formData[item]

                      ? "bg-yellow-500 text-black border-yellow-500"

                      : "bg-zinc-800 border-zinc-700 text-white"

                  }`}

                >

                  <input
                    type="checkbox"
                    id={item}
                    checked={
                      formData[item]
                    }
                    onChange={
                      handleChange
                    }
                    className="hidden"
                  />

                  {item}

                </label>

              ))}

            </div>

            <div className="border-2 border-dashed border-zinc-700 rounded-3xl p-8 text-center bg-zinc-800">

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>

                  setFiles(
                    e.target.files
                  )

                }

                className="w-full"

              />

              <p className="text-zinc-500 mt-4">

                Upload up to 6 images

              </p>

            </div>

            <button

              type="button"

              onClick={
                handleImageSubmit
              }

              disabled={
                uploading
              }

              className="bg-blue-600 hover:bg-blue-500 p-4 rounded-2xl font-bold transition"

            >

              {uploading

                ? "Uploading..."

                : "Upload Images"}

            </button>

            {imageUploadError && (

              <p className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl">

                {
                  imageUploadError
                }

              </p>

            )}

            <div className="flex flex-col gap-4">

              {formData.imageUrls.map(

                (
                  url,
                  index
                ) => (

                  <div

                    key={index}

                    className="flex items-center justify-between bg-zinc-800 border border-zinc-700 p-4 rounded-2xl"

                  >

                    <img
                      src={url}
                      alt="listing"
                      className="w-24 h-24 object-cover rounded-xl"
                    />

                    <button

                      type="button"

                      onClick={() =>

                        handleRemoveImage(
                          index
                        )

                      }

                      className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl"

                    >

                      Remove

                    </button>

                  </div>

                )

              )}

            </div>

            {error && (

              <p className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl">

                {error}

              </p>

            )}

            <button

              type="submit"

              disabled={
                loading
              }

              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold p-5 rounded-2xl uppercase tracking-wider transition"

            >

              {loading

                ? "Creating..."

                : "Publish Listing"}

            </button>

          </div>

        </form>

      </div>

    </main>

  );

};

export default CreateListing;