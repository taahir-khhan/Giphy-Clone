import React, { useState } from "react";
import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function GifSearch() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchGifs = async () => {
    if (query.trim() === "") {
      return;
    }
    navigate(`/search/${query}`);
  };

  const enterKeySearchGifs = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="flex relative my-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={enterKeySearchGifs}
        placeholder="Search all the Gifs and Stickers"
        className="w-full pl-4 pr-14 py-4 text-xl text-black rounded-tl-lg rounded-bl-lg border border-gray-300 outline-none"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute bg-gray-300 opacity-90 rounded-full right-20 mr-2 top-6"
        >
          <HiMiniXMark size={22} />
        </button>
      )}
      <button
        onClick={searchGifs}
        className="bg-gradient-to-tr from-indigo-600 to-sky-600 text-white px-4 py-2 rounded-tr rounded-br"
      >
        <HiOutlineMagnifyingGlass size={35} className="scale-x-100" />
      </button>
    </div>
  );
}

export default GifSearch;
