import { useEffect, useRef, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "./react-medium-image-zoom.css";

export const ImageZoomer = ({ src }) => {
  return (
    <Zoom>
      <img style={{ width: "100%" }} src={src} />
    </Zoom>
  );
};
