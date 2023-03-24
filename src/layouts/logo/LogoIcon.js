import React from "react";
import Link from "next/link";
import LogoDark from "../../../assets/images/logos/prl.jpg";

const LogoIcon = () => {
  return (
    <>
    <style jsx global>{`
      .css-h4y409-MuiList-root{
        padding-top: 0px
      }
      `}</style>
    <Link href="/" className="overflow-hidden h-10">
      <img
        className="h-10 rounded-xl"
        src="https://download.logo.wine/logo/YouTube/YouTube-Logo.wine.png"
        alt={"logi"}
      />
    </Link>
    </>
  );
};

export default LogoIcon;
