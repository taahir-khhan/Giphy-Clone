import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FilterGif, Gif } from "../Components";
import { useGifState } from "../context/GifContext";

function SearchPage() {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const { gf, filter } = useGifState();

  const fetchSearchResults = async () => {
    const { data } = await gf.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 20,
    });
    console.log(data);

    setSearchResults(data);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [filter, query]);

  return (
    <div className="my-4">
      <h2 className="text-5xl font-extrabold pb-3 ">{query}</h2>
      <FilterGif alignLeft />
      {searchResults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 ">
          {searchResults.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <span>
          No GIFs found for {query}. Try searching for Stickers instead?
        </span>
      )}
    </div>
  );
}

export default SearchPage;
