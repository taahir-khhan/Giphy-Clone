import React, { useEffect, useState } from "react";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { Gif } from "../Components";
import { useGifState } from "../context/GifContext";

const contentType = ["gifs", "stickers", "texts"];

function SingleGif() {
  const { type, slug } = useParams();
  const { gf } = useGifState();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1], {
      limit: 10,
    });
    setGif(data);
    setRelatedGifs(related);
  };

  console.log(gif);

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content type");
    }
    fetchGif();
  }, []);

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        <>
          <div className="flex gap-1">
            <img
              src={gif?.user?.avatar_url}
              alt={gif?.user?.display_name}
              className="h-14"
            />
            <div className="px-2">
              <div className="font-extrabold">{gif?.user?.display_name}</div>
              <div className="text-gray-500">
                {gif?.user ? `@${gif?.user?.username}` : "User not Available"}
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
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="text-gray-500 truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false} />

            {/* Mobile UI */}
          </div>
          favourites / share / embed
        </div>
      </div>
    </div>
  );
}

export default SingleGif;
