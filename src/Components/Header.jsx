import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import "../App.css";
import { useGifState } from "../context/GifContext";
import GifSearch from "./GifSearch";

function Header() {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const { gf, favourites } = useGifState();

  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  };

  useEffect(() => {
    fetchGifCategories();
  }, []);

  return (
    <nav>
      <div className="relative flex gap-4 items-center justify-between mb-2">
        <Link to="/" className="flex gap-2">
          <img src="/logo.svg" alt="Giphy Logo" className="w-8" />
          <h1 className="text-5xl font-bold tracking-tighter cursor-pointer">
            GIPHY
          </h1>
        </Link>

        <div className="flex gap-4 justify-center items-center text-md font-bold">
          {/* Top 5 Categories */}
          {categories?.slice(0, 5)?.map((category) => (
            <Link
              key={category.name}
              to={`/${category.name_encoded}`}
              className=" px-4 py-1 hover:gradient border-b-4 hidden lg:block"
            >
              {category.name}
            </Link>
          ))}

          {/* Show Categories Icon */}
          <button onClick={() => setShowCategories(!showCategories)}>
            <HiOutlineDotsVertical
              size={35}
              className={`py-0.5 hover:gradient border-b-4 hidden lg:block ${
                showCategories ? "gradient" : ""
              }`}
            />
          </button>

          {/* Favourites Button */}
          {favourites.length > 0 && (
            <div className="bg-gray-700 px-6 cursor-pointer rounded h-10 flex items-center">
              <Link to="/favourites" className="">
                Favourite GIFs
              </Link>
            </div>
          )}

          {/* Burger Menu Icon for Mobile screen */}
          <button>
            <HiMiniBars3BottomRight
              size={30}
              className="text-sky-500 block lg:hidden"
            />
          </button>
        </div>

        {/* More Categories */}
        {showCategories && (
          <div className="absolute right-0 top-14 px-10 pt-6 w-full gradient z-20 pb-5 rounded-lg">
            <span className="text-3xl font-extrabold ">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories?.map((category) => (
                <Link
                  onClick={() => setShowCategories(false)}
                  className="transition ease-in-out font-bold"
                  key={category.name}
                  to={`/${category.name_encoded}`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <GifSearch />
    </nav>
  );
}

export default Header;
