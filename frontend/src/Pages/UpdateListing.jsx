import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateListing = () => {

  const { listingId } = useParams();

  const navigate = useNavigate();

  const { currentUser } = useSelector(
    (state) => state.user
  );

  const [files, setFiles] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    imageUploadError,
    setImageUploadError,
  ] = useState("");

  const [formData, setFormData] =
    useState({

      imageUrls: [],

      name: "",

      description: "",

      address: "",

      type: "rent",

      bedrooms: 1,

      bathrooms: 1,

      regularPrice: 0,

      discountPrice: 0,

      offer: false,

      parking: false,

      furnished: false,

    });

  /* FETCH LISTING */

  useEffect(() => {

    const fetchListing = async () => {

      try {

        const res = await fetch(
          `http://localhost:8000/api/listing/get/${listingId}`
        );

        const data =
          await res.json();

        if (
          data.success === false
        ) {

          setError(
            data.message
          );

          return;

        }

        setFormData(data);

      } catch (error) {

        console.log(error);

        setError(
          "Failed to fetch listing"
        );

      }

    };

    if (listingId)
      fetchListing();

  }, [listingId]);

  /* HANDLE CHANGE */

  const handleChange = (e) => {

    if (
      e.target.id === "sale" ||
      e.target.id === "rent"
    ) {

      setFormData({

        ...formData,

        type: e.target.id,

      });

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

      setFormData({

        ...formData,

        [e.target.id]:
          e.target.checked,

      });

    }

    if (
      e.target.type ===
        "number" ||
      e.target.type ===
        "text" ||
      e.target.tagName ===
        "TEXTAREA"
    ) {

      setFormData({

        ...formData,

        [e.target.id]:

          e.target.type ===
          "number"

            ? Number(
                e.target.value
              )

            : e.target.value,

      });

    }

  };

  /* IMAGE UPLOAD */

  const handleImageSubmit =
    async () => {

      if (
        files.length === 0
      ) {

        return setImageUploadError(
          "Select images first"
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

        const urls = [];

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

          urls.push(
            res.data.imageUrl
          );

        }

        setFormData({

          ...formData,

          imageUrls: [

            ...formData.imageUrls,

            ...urls,

          ],

        });

        setUploading(false);

      } catch (error) {

        console.log(error);

        setUploading(false);

        setImageUploadError(
          "Image upload failed"
        );

      }

    };

  /* REMOVE IMAGE */

  const handleRemoveImage =
    (index) => {

      setFormData({

        ...formData,

        imageUrls:
          formData.imageUrls.filter(

            (_, i) =>
              i !== index

          ),

      });

    };

  /* SUBMIT */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

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

        setLoading(true);

        setError("");

        const res =
          await fetch(

            `http://localhost:8000/api/listing/update/${listingId}`,

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

      } catch (error) {

        console.log(error);

        setLoading(false);

        setError(
          "Something went wrong"
        );

      }

    };

  return (

    <main className="min-h-screen bg-black text-white px-4 py-10">

      <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-center mb-2">

          Update{" "}

          <span className="text-yellow-500">
            Listing
          </span>

        </h1>

        <p className="text-center text-zinc-400 mb-10">

          Edit your property details

        </p>

        <form
          onSubmit={
            handleSubmit
          }
          className="flex flex-col gap-6"
        >

          <input
            type="text"
            id="name"
            placeholder="Property Name"
            required
            value={formData.name}
            onChange={
              handleChange
            }
            className="w-full bg-zinc-800 border border-zinc-700 p-4 rounded-xl outline-none focus:border-yellow-500"
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
            className="w-full bg-zinc-800 border border-zinc-700 p-4 rounded-xl outline-none focus:border-yellow-500 min-h-[120px]"
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
            className="w-full bg-zinc-800 border border-zinc-700 p-4 rounded-xl outline-none focus:border-yellow-500"
          />

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="number"
              id="bedrooms"
              placeholder="Bedrooms"
              value={
                formData.bedrooms
              }
              onChange={
                handleChange
              }
              className="bg-zinc-800 border border-zinc-700 p-4 rounded-xl outline-none focus:border-yellow-500"
            />

            <input
              type="number"
              id="bathrooms"
              placeholder="Bathrooms"
              value={
                formData.bathrooms
              }
              onChange={
                handleChange
              }
              className="bg-zinc-800 border border-zinc-700 p-4 rounded-xl outline-none focus:border-yellow-500"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="number"
              id="regularPrice"
              placeholder="Regular Price"
              value={
                formData.regularPrice
              }
              onChange={
                handleChange
              }
              className="bg-zinc-800 border border-zinc-700 p-4 rounded-xl outline-none focus:border-yellow-500"
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
                className="bg-zinc-800 border border-zinc-700 p-4 rounded-xl outline-none focus:border-yellow-500"
              />

            )}

          </div>

          <div className="flex flex-wrap gap-4">

            <label className="flex items-center gap-2 bg-zinc-800 px-4 py-3 rounded-xl border border-zinc-700">

              <input
                type="radio"
                id="sale"
                name="type"
                checked={
                  formData.type ===
                  "sale"
                }
                onChange={
                  handleChange
                }
              />

              Sale

            </label>

            <label className="flex items-center gap-2 bg-zinc-800 px-4 py-3 rounded-xl border border-zinc-700">

              <input
                type="radio"
                id="rent"
                name="type"
                checked={
                  formData.type ===
                  "rent"
                }
                onChange={
                  handleChange
                }
              />

              Rent

            </label>

          </div>

          <div className="flex flex-wrap gap-4">

            {[
              "offer",
              "parking",
              "furnished",
            ].map((item) => (

              <label
                key={item}
                className="flex items-center gap-2 bg-zinc-800 px-4 py-3 rounded-xl border border-zinc-700 capitalize"
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
                />

                {item}

              </label>

            ))}

          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>

              setFiles(
                Array.from(
                  e.target.files
                )
              )

            }

            className="bg-zinc-800 border border-zinc-700 p-4 rounded-xl"
          />

          <button
            type="button"
            onClick={
              handleImageSubmit
            }
            disabled={
              uploading
            }
            className="bg-blue-600 hover:bg-blue-500 p-4 rounded-xl font-semibold"
          >

            {uploading

              ? "Uploading..."

              : "Upload Images"}

          </button>

          {formData.imageUrls?.map(

            (
              url,
              index
            ) => (

              <div
                key={index}
                className="flex items-center justify-between bg-zinc-800 p-4 rounded-xl"
              >

                <img
                  src={url}
                  alt="listing"
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <button
                  type="button"
                  onClick={() =>

                    handleRemoveImage(
                      index
                    )

                  }

                  className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg"
                >

                  Remove

                </button>

              </div>

            )

          )}

          {imageUploadError && (

            <p className="text-red-500">

              {
                imageUploadError
              }

            </p>

          )}

          {error && (

            <p className="text-red-500">

              {error}

            </p>

          )}

          <button
            disabled={
              loading ||
              uploading
            }
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold p-4 rounded-xl uppercase tracking-wider"
          >

            {loading

              ? "Updating..."

              : "Update Listing"}

          </button>

        </form>

      </div>

    </main>

  );

};

export default UpdateListing;