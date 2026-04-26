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

  const API_URL =
    import.meta.env
      .VITE_API_URL;

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

        setUploading(false);

        setImageUploadError(
          "Image upload failed"
        );

      }

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await fetch(

            `${API_URL}/api/listing/create`,

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

      <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <h1 className="text-4xl font-black mb-8">

          Create Listing

        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="flex flex-col gap-5"
        >

          <input
            type="text"
            placeholder="Property Name"
            value={
              formData.name
            }
            onChange={(e) =>

              setFormData({

                ...formData,

                name:
                  e.target.value,

              })

            }
            className="bg-zinc-800 p-4 rounded-2xl"
          />

          <textarea
            placeholder="Description"
            value={
              formData.description
            }
            onChange={(e) =>

              setFormData({

                ...formData,

                description:
                  e.target.value,

              })

            }
            className="bg-zinc-800 p-4 rounded-2xl"
          />

          <input
            type="file"
            multiple
            onChange={(e) =>

              setFiles(
                e.target.files
              )

            }
            className="bg-zinc-800 p-4 rounded-2xl"
          />

          <button
            type="button"
            onClick={
              handleImageSubmit
            }
            className="bg-blue-600 p-4 rounded-2xl"
          >

            {uploading

              ? "Uploading..."

              : "Upload Images"}

          </button>

          <button
            type="submit"
            className="bg-yellow-500 text-black p-4 rounded-2xl font-bold"
          >

            {loading

              ? "Creating..."

              : "Create Listing"}

          </button>

          {error && (

            <p className="text-red-500">

              {error}

            </p>

          )}

          {imageUploadError && (

            <p className="text-red-500">

              {
                imageUploadError
              }

            </p>

          )}

        </form>

      </div>

    </main>

  );

};

export default CreateListing;