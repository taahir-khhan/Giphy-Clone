import React, { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa6";
import { HiOutlineExternalLink } from "react-icons/hi";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import { IoCodeSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { FollowOn, Gif } from "../Components";
import { useGifState } from "../context/GifContext";

const contentType = ["gifs", "stickers", "texts"];

function SingleGif() {
  const { type, slug } = useParams();
  const { gf, favourites, addToFavourites, setMessage } = useGifState();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const shareGif = () => {
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

  const embedGif = () => {
    if (!gif.embed_url) {
      setMessage("Embed URL is not available!");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const embedCode = `<iframe 
      src="${gif.embed_url}" 
      width="480" 
      height="269" 
      style="border: none;" 
      class="giphy-embed" 
      allowFullScreen>
    </iframe>`;

    navigator.clipboard
      .writeText(embedCode)
      .then(() => setMessage("Embed element is Copied to clipboard!"))
      .catch(() => setMessage("Failed to copy!"));

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1], {
      limit: 10,
    });
    setGif(data);
    setRelatedGifs(related);
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content type");
    }
    fetchGif();
  }, []);

  // console.log(gif);

  return (
    <div className="grid grid-cols-4 my-10 gap-4 relative">
      <div className="hidden sm:block">
        <>
          <div className="flex gap-1 items-center">
            <img
              src={gif?.user?.avatar_url}
              alt={gif?.user?.display_name}
              className="h-14"
            />
            <div className="px-2">
              <div className="font-extrabold text-xl">
                {gif?.user?.display_name}
              </div>
              <div className="text-gray-500">
                {gif?.user ? `@${gif?.user?.username}` : "@User not Available"}
              </div>
            </div>
          </div>
          {gif?.user && (
            <p className="py-4 whitespace-pre-line text-sm text-gray-400">
              {gif?.user?.description && (
                <div>
                  {readMore
                    ? gif?.user?.description
                    : gif?.user?.description.length > 100
                    ? gif?.user?.description.slice(0, 100) + " . . ."
                    : gif?.user?.description}
                  <div
                    className="flex items-center text-gray-500 cursor-pointer"
                    onClick={() => setReadMore(!readMore)}
                  >
                    {gif?.user?.description.length > 100 &&
                      (readMore ? (
                        <>
                          Read less <HiMiniChevronUp size={20} />
                        </>
                      ) : (
                        <>
                          Read more
                          <HiMiniChevronDown size={20} />
                        </>
                      ))}
                  </div>
                </div>
              )}
            </p>
          )}
        </>

        <FollowOn />

        <div className="devider"></div>

        {gif?.source && (
          <div className="flex gap-1 items-center font-bold text-sm">
            <HiOutlineExternalLink size={25} />
            <a href={gif.source} target="_blank" className="truncate">
              {gif.source}
            </a>
          </div>
        )}
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="text-gray-500 truncate mb-2 text-xl font-bold">
              {gif.title}
            </div>
            <Gif gif={gif} hover={false} />

            {/* Mobile UI */}
            <div className="flex gap-1 sm:hidden">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-extrabold text-xl">
                  {gif?.user?.display_name}
                </div>
                <div className="text-gray-500">
                  {gif?.user
                    ? `@${gif?.user?.username}`
                    : "@User not Available"}
                </div>
              </div>

              <button className="ml-auto">
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>

          <div className="hidden sm:flex flex-col gap-5 mt-5">
            <button
              className="flex gap-5 items-center font-bold text-lg hover:scale-110 transition-transform duration-300"
              onClick={() => addToFavourites(gif.id)}
            >
              <HiMiniHeart
                size={30}
                className={`${
                  favourites.includes(gif.id) ? "text-red-600" : ""
                }`}
              />{" "}
              Favourite
            </button>

            <button
              className="flex gap-5 items-center font-bold text-lg hover:scale-110 transition-transform duration-300"
              onClick={shareGif}
            >
              <FaPaperPlane size={25} />
              Share
            </button>

            <button
              className="flex gap-5 items-center font-bold text-lg hover:scale-110 transition-transform duration-300"
              onClick={embedGif}
            >
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>
        </div>

        <div className="mt-4">
          <span className="font-extrabold text-xl">Related Gif's</span>
          <div className="columns-2 md:columns-3 gap-2 mt-4">
            {relatedGifs.map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleGif;
