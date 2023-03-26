import React from "react";
import Image from "next/image";
import { CSSProperties } from "react";
import BeatLoader from "react-spinners/BeatLoader";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const DEFAULT_GRAY = "#98D59F";

type LoadingProps = {
  color?: string;
  className?: string;
};
const Loading = ({ color = DEFAULT_GRAY, className }: LoadingProps) => {
  return (
    <BeatLoader
      color={color}
      loading={true}
      cssOverride={override}
      size={10}
      aria-label="Loading Animation"
      data-testid="loading-animation"
    />
  );
};

export default Loading;
