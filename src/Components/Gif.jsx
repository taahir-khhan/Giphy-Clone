import React, { useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { HiMiniHeart } from "react-icons/hi2";
import { IoMdDownload } from "react-icons/io";
import { Link } from "react-router-dom";
import { useGifState } from "../context/GifContext";

function Gif({ gif, hover = true }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToFavourites, favourites } = useGifState();

  return (
    <Link to={`/${gif.type}s/${gif.slug}`}>
      <div
        className="w-full mb-2 relative cursor-pointer group aspect-video"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
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
        {isHovered && hover && (
          <div className="absolute top-1 right-1 flex gap-4 items-center bg-gradient-to-tr from-gray-900 via-gray-700 to-black p-2 rounded">
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
          </div>
        )}
      </div>
    </Link>
  );
}

export default Gif;
