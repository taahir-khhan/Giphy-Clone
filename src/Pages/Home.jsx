import React, { useEffect } from "react";
import { FilterGif, Gif } from "../Components";
import { useGifState } from "../context/GifContext";

function Home() {
  const { gf, gifs, setGifs, filter } = useGifState();

  const fetchTrendingGifs = async () => {
    const { data } = await gf.trending({
      limit: 20,
      type: filter,
      rating: "g",
    });
    setGifs(data);
  };

  useEffect(() => {
    fetchTrendingGifs();
  }, [filter]);

  return (
    <div>
      <img
        src="/banner.gif"
        alt="page banner"
        className="w-full mt-4 rounded"
      />

      <FilterGif showTrending />

      <div className="mt-4 columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-x-3 gap-y-3">
        {gifs.map((gif) => (
          <Gif gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
