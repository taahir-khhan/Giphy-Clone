import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favourites, setFavourites] = useState([]);
  const [message, setMessage] = useState("");

  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

  // Initialize favourites from localStorage on component mount
  useEffect(() => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favouriteGifs")) || [];
    console.log("Favourites loaded from localStorage:", storedFavourites);
    setFavourites(storedFavourites);
  }, []);

  const addToFavourites = (id) => {
    if (favourites.includes(id)) {
      // If the item is already present, remove it
      const updatedFavourites = favourites.filter((itemId) => itemId !== id);
      localStorage.setItem("favouriteGifs", JSON.stringify(updatedFavourites));
      setFavourites(updatedFavourites);

      setMessage("Gif is removed from Favourites");
      setTimeout(() => {
        setMessage("");
      }, 800);
    } else {
      // If item is not in favourites, add it
      const updatedFavourites = [...favourites, id];
      localStorage.setItem("favouriteGifs", JSON.stringify(updatedFavourites));
      setFavourites(updatedFavourites);

      setMessage("Gif is added to Favourites");
      setTimeout(() => {
        setMessage("");
      }, 800);
    }
  };

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
        setMessage,
        message,
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
