import React from "react";
import Link  from "next/link";
import LogoDark from "../../../assets/images/logos/prl.jpg";

const LogoIcon = () => {
  return (
    <Link href="/">
      <img className="h-5 rounded-xl" src="../../../assets/images/logos/prl.jpg" alt={"logi"} />
    </Link>
  );
};

export default LogoIcon;
