import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FollowOn, Gif } from "../Components";
import { useGifState } from "../context/GifContext";

function Categories() {
  const [searchResults, setSeacrhResults] = useState([]);
  const { category } = useParams();
  const { gf } = useGifState();

  const fetchSearchResults = async () => {
    const { data } = await gf.gifs(category, category);
    setSeacrhResults(data);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [category]);

  return (
    <div className="flex justify-around items-start flex-col sm:flex-row gap-5 my-5">
      <div className="w-full sm:w-72">
        {searchResults.length > 0 && <Gif gif={searchResults[0]} />}
        <span className="text-gray-400 text-sm pt-2">
          Don&apos;t tell to me, GIF it to me
        </span>
        <FollowOn />
        <div className="w-full h-0.5 mt-6 bg-gray-800"></div>
      </div>

      <div>
        <h2 className="text-4xl pb-1 font-extrabold capitalize">
          {category.split("-").join(" & ")} GIFs
        </h2>
        <h2 className="text-lg text-gray-400 pb-3 font-bold cursor-pointer hover:text-gray-50">
          @{category}
        </h2>
        {searchResults.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
            {searchResults.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Categories;
