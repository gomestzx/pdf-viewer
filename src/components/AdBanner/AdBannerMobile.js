"use client";

import React, { useEffect } from "react";

const AdBannerMobile = ({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
  fixed,
  customClassName,
}) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div
      id={`ad-banner-${dataAdSlot}`}
      className={`${customClassName} w-full justify-center items-center flex md:hidden ${
        fixed ? "fixed bottom-0 left-0 z-50" : ""
      }`}
    >
      <ins
        className=" adsbygoogle bg-gray-300 rounded-lg"
        style={{ display: "inline-block", width: 350, height: 50 }}
        data-ad-client="ca-pub-2529229033686497"
        data-ad-slot={dataAdSlot}
        // data-ad-format={dataAdFormat}
        // data-full-width-responsive={dataFullWidthResponsive.toString()}
      ></ins>
    </div>
  );
};

export default AdBannerMobile;
