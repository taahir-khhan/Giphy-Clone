import React from "react";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

function FollowOn() {
  return (
    <div className=" pt-2">
      <span>Follow on:</span>
      <div className="flex gap-4 pt-3">
        <a href="https://x.com/Taahirkhhan" target="_blank">
          <FaXTwitter size={20} />
        </a>
        <a href="https://www.instagram.com/taahir_khhan/" target="_blank">
          <FaInstagram size={20} />
        </a>
        <a href="https://www.youtube.com/@taahir_khhan" target="_blank">
          <FaYoutube size={20} />
        </a>
      </div>
    </div>
  );
}

export default FollowOn;
