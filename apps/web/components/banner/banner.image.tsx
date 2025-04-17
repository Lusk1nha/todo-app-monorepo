"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

const DEFAULT_FOLDER = "/banner";

export function BannerImage() {
  const { theme } = useTheme();

  function getImageByTheme(theme: string | undefined) {
    switch (theme) {
      case "light":
        return `${DEFAULT_FOLDER}/banner-day.jpg`;
      case "dark":
        return `${DEFAULT_FOLDER}/banner-night.jpg`;
      default:
        return `${DEFAULT_FOLDER}/banner-day.jpg`;
    }
  }

  return (
    <div className="absolute h-full top-0 left-0 w-full max-h-[200px] md:max-h-[300px] flex items-center justify-center overflow-hidden z-0 opacity-25">
      <Image
        className="-z-10"
        src={getImageByTheme(theme)}
        alt="Banner Image"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}
