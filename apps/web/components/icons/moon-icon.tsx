"use client";

import { memo } from "react";

interface MoonIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const MoonIcon = memo(function MoonIcon(props: Readonly<MoonIconProps>) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.3717 0.215831C10.5931 1.19962 7 5.4302 7 10.5C7 16.299 11.701 21 17.5 21C20.4958 21 23.1986 19.7454 25.1116 17.7328C23.2191 22.5722 18.5098 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C13.81 0 14.6027 0.0740788 15.3717 0.215831Z"
        fill="currentColor"
      />
    </svg>
  );
});

MoonIcon.displayName = "MoonIcon";

export { MoonIcon };
