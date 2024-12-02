import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa6";
import { HiMiniHeart } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useGifState } from "../context/GifContext";

function Gif({ gif, hover = true }) {
  const { addToFavourites, favourites, setMessage } = useGifState();

  const shareGif = (e) => {
    e.preventDefault();
    e.stopPropagation();

    navigator.clipboard
      .writeText(
        `https://media.giphy.com/media/${gif.id}/giphy.gif
`
      )
      .then(() => setMessage("Link is Copied to clipboard!"))
      .catch(() => setMessage("Failed to copy!"));

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <Link to={`/${gif.type}s/${gif.slug}`}>
      <div className="w-full mb-2 relative cursor-pointer group aspect-video">
        <img
          src={gif?.images?.fixed_width.webp}
          alt={gif?.title}
          className="w-full object-cover rounded transition-all duration-300"
        />

        {hover && (
          <div className="absolute inset-0 opacity-0 rounded group-hover:opacity-100 bg-gradient-to-b from-transparent via-transparent to-black font-bold flex items-end gap-2 p-2">
            <img
              src={gif?.user?.avatar_url}
              alt={gif?.user?.display_name}
              className="h-8"
            />
            <span>{gif?.user?.display_name}</span>
          </div>
        )}

        {hover && (
          <div className="absolute top-1 right-1 flex gap-4 items-center opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-gray-900 via-gray-700 to-black p-2 rounded">
            <HiMiniHeart
              size={20}
              onClick={(e) => {
                addToFavourites(gif.id);
                e.stopPropagation();
                e.preventDefault();
              }}
              className={`${
                favourites.includes(gif.id)
                  ? "text-red-600 font-extralight"
                  : ""
              }`}
            />

            <FaPaperPlane size={15} onClick={shareGif} />
          </div>
        )}
      </div>
    </Link>
  );
}

export default Gif;
