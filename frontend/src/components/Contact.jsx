import { useState } from "react";

import {
  FaEnvelope,
  FaPaperPlane,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

const Contact = ({ listing }) => {

  const [message, setMessage] =
    useState("");

  return (

    <div className="mt-8">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl">

        <div className="mb-6">

          <p className="text-yellow-500 uppercase tracking-[0.3em] text-xs font-semibold mb-3">

            Get In Touch

          </p>

          <h2 className="text-3xl font-bold text-white">

            Contact{" "}

            <span className="text-yellow-500">
              Owner
            </span>

          </h2>

          <p className="text-zinc-400 mt-2">

            Connect directly with the property owner

          </p>

        </div>

        <div className="bg-zinc-800 rounded-2xl p-5 flex flex-col gap-4 mb-6">

          <div className="flex items-center gap-4">

            <div className="bg-blue-500/20 text-blue-400 p-3 rounded-xl">

              <FaEnvelope />

            </div>

            <p className="text-zinc-200 break-all">

              {listing.contactEmail}

            </p>

          </div>

          <div className="border-t border-zinc-700"></div>

          <div className="flex items-center gap-4">

            <div className="bg-green-500/20 text-green-400 p-3 rounded-xl">

              <FaPhoneAlt />

            </div>

            <p className="text-zinc-200">

              {listing.contactNumber}

            </p>

          </div>

        </div>

        <div className="mb-6">

          <p className="text-yellow-500 uppercase tracking-[0.3em] text-xs font-semibold mb-3">

            Your Message

          </p>

          <textarea

            rows="5"

            value={message}

            onChange={(e) =>

              setMessage(
                e.target.value
              )

            }

            placeholder="Hi, I'm interested in this property..."

            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white outline-none focus:border-yellow-500 resize-none"

          />

        </div>

        <div className="grid sm:grid-cols-2 gap-4">

          <a

            href={`mailto:${listing.contactEmail}?subject=Regarding ${listing.name}&body=${message}`}

            className="flex items-center justify-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold p-4 rounded-2xl transition duration-300"

          >

            <FaPaperPlane />

            Send Email

          </a>

          <a

            href={`https://wa.me/${listing.contactNumber}?text=${encodeURIComponent(

              message ||

              `Hi, I'm interested in ${listing.name}`

            )}`}

            target="_blank"

            rel="noopener noreferrer"

            className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold p-4 rounded-2xl transition duration-300"

          >

            <FaWhatsapp />

            WhatsApp

          </a>

        </div>

      </div>

    </div>

  );

};

export default Contact;