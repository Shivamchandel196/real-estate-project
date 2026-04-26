import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useSelector,
} from "react-redux";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

const UpdateListing = () => {

  const { listingId } =
    useParams();

  const navigate =
    useNavigate();

  const { currentUser } =
    useSelector(
      (state) => state.user
    );

  const [
    files,
    setFiles,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    uploading,
    setUploading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    imageUploadError,
    setImageUploadError,
  ] = useState("");

  const [
    formData,
    setFormData,
  ] = useState({

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

  useEffect(() => {

    const fetchListing =
      async () => {

        try {

          const res =
            await fetch(

              `http://localhost:8000/api/listing/get/${listingId}`

            );

          const data =
            await res.json();

          if (
            data.success ===
            false
          ) {

            setError(
              data.message
            );

            return;

          }

          setFormData(
            data
          );

        } catch {

          setError(
            "Failed to fetch listing"
          );

        }

      };

    if (
      listingId
    ) {

      fetchListing();

    }

  }, [listingId]);

  const handleChange = (
    e
  ) => {

    if (

      [
        "sale",
        "rent",
      ].includes(
        e.target.id
      )

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

  };

  const handleImageSubmit =
    async () => {

      if (
        files.length ===
        0
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

        setUploading(
          true
        );

        setImageUploadError(
          ""
        );

        const urls =
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

          urls.push(
            res.data.imageUrl
          );

        }

        setFormData(
          (prev) => ({

            ...prev,

            imageUrls: [

              ...prev.imageUrls,

              ...urls,

            ],

          })
        );

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

        setLoading(
          true
        );

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

      } catch {

        setLoading(
          false
        );

        setError(
          "Something went wrong"
        );

      }

    };

  return (

    <main className="min-h-screen bg-black text-white px-4 py-10">

      <div className="max-w-5xl mx-auto bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-[2rem] p-8 md:p-10 shadow-2xl">

        <div className="mb-10 text-center">

          <p className="uppercase tracking-[0.3em] text-yellow-500 text-xs font-semibold mb-4">

            Edit Property

          </p>

          <h1 className="text-5xl font-black mb-3">

            Update{" "}

            <span className="text-yellow-500">

              Listing

            </span>

          </h1>

          <p className="text-zinc-500">

            Update your property information

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
              className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-500"
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
              className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 min-h-[140px] outline-none focus:border-yellow-500"
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
              className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-500"
            />

            <div className="grid grid-cols-2 gap-4">

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
                className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-500"
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
                className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-500"
              />

            </div>

            <div className="grid grid-cols-2 gap-4">

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
                className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-500"
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
                  className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-500"
                />

              )}

            </div>

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

                  className={`flex-1 p-4 rounded-2xl border font-semibold uppercase transition ${
                    formData.type ===
                    type

                      ? "bg-yellow-500 text-black border-yellow-500"

                      : "bg-zinc-800 border-zinc-700"

                  }`}

                >

                  {type}

                </button>

              ))}

            </div>

            <div className="flex flex-wrap gap-4">

              {[
                "offer",
                "parking",
                "furnished",
              ].map((item) => (

                <label

                  key={item}

                  className={`px-5 py-3 rounded-2xl border capitalize cursor-pointer transition ${
                    formData[item]

                      ? "bg-yellow-500 text-black border-yellow-500"

                      : "bg-zinc-800 border-zinc-700"

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

            <div className="bg-zinc-800 border-2 border-dashed border-zinc-700 rounded-3xl p-8 text-center">

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

              className="bg-blue-600 hover:bg-blue-500 rounded-2xl p-4 font-bold transition"

            >

              {uploading

                ? "Uploading..."

                : "Upload Images"}

            </button>

            <div className="flex flex-col gap-4">

              {formData.imageUrls?.map(

                (
                  url,
                  index
                ) => (

                  <div

                    key={index}

                    className="flex items-center justify-between bg-zinc-800 border border-zinc-700 rounded-2xl p-4"

                  >

                    <img
                      src={url}
                      alt="listing"
                      className="w-24 h-24 rounded-xl object-cover"
                    />

                    <button

                      type="button"

                      onClick={() =>

                        handleRemoveImage(
                          index
                        )

                      }

                      className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl transition"

                    >

                      Remove

                    </button>

                  </div>

                )

              )}

            </div>

            {imageUploadError && (

              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl">

                {
                  imageUploadError
                }

              </div>

            )}

            {error && (

              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl">

                {error}

              </div>

            )}

            <button

              disabled={
                loading ||
                uploading
              }

              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-[0.2em] rounded-2xl p-5 transition"

            >

              {loading

                ? "Updating..."

                : "Update Listing"}

            </button>

          </div>

        </form>

      </div>

    </main>

  );

};

export default UpdateListing;