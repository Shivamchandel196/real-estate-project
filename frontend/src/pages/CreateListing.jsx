import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const CreateListing = () => {
  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
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

  const [imageUploadError, setImageUploadError] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const { currentUser } =
    useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:
        e.target.value,
    });
  };

  const handleImageSubmit =
    async () => {
      if (files.length === 0) {
        return setImageUploadError(
          "Please select images"
        );
      }

      try {
        setUploading(true);
        setImageUploadError("");

        const uploadedUrls = [];

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

        setFormData((prev) => ({
          ...prev,
          imageUrls: [
            ...prev.imageUrls,
            ...uploadedUrls,
          ],
        }));

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
        setError("");

        const res = await fetch(
          `${API_URL}/api/listing/create`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            credentials:
              "include",

            body: JSON.stringify({
              ...formData,
              userRef:
                currentUser._id,
            }),
          }
        );

        const data =
          await res.json();

        setLoading(false);

        if (
          data.success === false
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
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white px-4 py-10">

      <div className="max-w-5xl mx-auto bg-[#0f172a]/90 border border-yellow-500/10 backdrop-blur-md rounded-[35px] p-6 md:p-10 shadow-[0_0_40px_rgba(255,196,0,0.08)]">

        <div className="mb-10">

          <h1 className="text-4xl md:text-5xl font-black text-white">
            Create Listing
          </h1>

          <p className="text-zinc-400 mt-3">
            Add your property details.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-7"
        >

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                Property Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter property name"
                value={formData.name}
                onChange={
                  handleChange
                }
                className="w-full bg-black/40 border border-zinc-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none px-5 py-4 rounded-2xl transition-all"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                Address
              </label>

              <input
                id="address"
                type="text"
                placeholder="Enter property address"
                value={
                  formData.address
                }
                onChange={
                  handleChange
                }
                className="w-full bg-black/40 border border-zinc-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none px-5 py-4 rounded-2xl transition-all"
              />
            </div>

          </div>

          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              Description
            </label>

            <textarea
              id="description"
              rows="5"
              placeholder="Describe your property..."
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              className="w-full bg-black/40 border border-zinc-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none px-5 py-4 rounded-2xl transition-all resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                Contact Email
              </label>

              <input
                id="contactEmail"
                type="email"
                placeholder="Enter email"
                value={
                  formData.contactEmail
                }
                onChange={
                  handleChange
                }
                className="w-full bg-black/40 border border-zinc-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none px-5 py-4 rounded-2xl transition-all"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                Phone Number
              </label>

              <input
                id="contactNumber"
                type="tel"
                placeholder="Enter phone number"
                value={
                  formData.contactNumber
                }
                onChange={
                  handleChange
                }
                className="w-full bg-black/40 border border-zinc-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none px-5 py-4 rounded-2xl transition-all"
              />
            </div>

          </div>

          <div className="border border-dashed border-zinc-700 bg-black/30 rounded-3xl p-6">

            <h2 className="text-xl font-semibold mb-5">
              Upload Property Images
            </h2>

            <input
              type="file"
              multiple
              onChange={(e) =>
                setFiles(
                  Array.from(
                    e.target.files
                  )
                )
              }
              className="w-full bg-zinc-900 border border-zinc-700 p-4 rounded-2xl text-zinc-300"
            />

            <button
              type="button"
              onClick={
                handleImageSubmit
              }
              className="w-full mt-5 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:scale-[1.01] text-black font-bold py-4 rounded-2xl transition-all duration-300"
            >

              {uploading
                ? "Uploading..."
                : "Upload Images"}

            </button>

          </div>

          <button
            type="submit"
            className="w-full bg-white text-black hover:bg-yellow-400 font-black text-lg py-4 rounded-2xl transition-all duration-300"
          >

            {loading
              ? "Creating..."
              : "Create Listing"}

          </button>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-2xl">
              {error}
            </div>
          )}

          {imageUploadError && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-2xl">
              {imageUploadError}
            </div>
          )}

        </form>

      </div>

    </main>
  );
};

export default CreateListing;