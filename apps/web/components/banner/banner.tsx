import React from "react";
import { BannerImage } from "./banner.image";

export function Banner() {
  return (
    <React.Fragment>
      <div className="bg-gradient-to-l from-purple-x11 to-blueberry-90 dark:from-fandango dark:to-interdimensional-blue absolute top-0 left-0 w-full h-[200px] md:h-[300px] z-0" />
      <BannerImage />
    </React.Fragment>
  );
}
