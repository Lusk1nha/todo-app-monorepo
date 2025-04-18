import React from "react";
import { BannerImage } from "./banner-image";

import { BannerColor } from "@todo-app/design-system/banner";

export function Banner() {
  return (
    <React.Fragment>
      <BannerColor />
      <BannerImage />
    </React.Fragment>
  );
}
