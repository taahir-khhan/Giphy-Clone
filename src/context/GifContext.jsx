import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favourites, setFavourites] = useState([]);

  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

  const addToFavourites = (id) => {
    if (favourites.includes(id)) {
      // If the item is already present remove it
      const updatedFavourites = favourites.filter((itemId) => itemId !== id);
      localStorage.setItem("favouriteGifs", JSON.stringify(updatedFavourites));
      setFavourites(updatedFavourites);
    } else {
      // If item is not there in favourite then add it.
      const updatedFavourites = [...favourites];
      updatedFavourites.push(id);
      localStorage.setItem("favouriteGifs", JSON.stringify(updatedFavourites));
      setFavourites(updatedFavourites);
    }
  };

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("favouriteGifs")) || [];
    setFavourites(favourites);
  }, []);

  return (
    <GifContext.Provider
      value={{
        gf,
        gifs,
        setGifs,
        filter,
        setFilter,
        favourites,
        setFavourites,
        addToFavourites,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const useGifState = () => {
  return useContext(GifContext);
};

export default GifProvider;
