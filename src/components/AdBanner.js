"use client";

import React, { useEffect } from "react";

const AdBanner = ({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
  fixed,
  vertical,
  customClassName,
}) => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("Adsbygoogle error:", error.message);
    }
  }, []);

  return (
    <div
      id={`ad-banner-${dataAdSlot}`}
      className={`${customClassName} w-full justify-center items-center hidden md:flex ${
        fixed ? "fixed bottom-0 left-0 z-50 my-0" : ""
      }`}
      style={fixed ? { backgroundColor: "#000" } : {}}
    >
      <ins
        className={`adsbygoogle ${!vertical && 'bg-gray-300'} rounded-lg`}
        style={{ display: "inline-block", width: vertical? 120 : 728, height: vertical ? 728 : 90 }}
        data-ad-client="ca-pub-2529229033686497"
        data-ad-slot={dataAdSlot}
        // data-ad-format={dataAdFormat}
        // data-full-width-responsive={dataFullWidthResponsive?.toString()}
      ></ins>
    </div>
  );
};

export default AdBanner;
