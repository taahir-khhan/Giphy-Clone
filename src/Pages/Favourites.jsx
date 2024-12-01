import React, { useEffect, useState } from "react";
import { Gif } from "../Components";
import { useGifState } from "../context/GifContext";

function Favourites() {
  const [favouriteGifs, setFavouriteGifs] = useState([]);
  const { gf, favourites } = useGifState();

  const fecthFavouriteGifs = async () => {
    const { data: gifs } = await gf.gifs(favourites);
    setFavouriteGifs(gifs);
  };

  useEffect(() => {
    fecthFavouriteGifs();
  }, []);

  console.log(favouriteGifs);

  return (
    <div className="mt-2">
      <span className="font-extrabold py-4">Favourite GIFs</span>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 mt-4">
        {favouriteGifs.map((gif) => (
          <Gif gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
}

export default Favourites;
