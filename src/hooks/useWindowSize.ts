import { useLayoutEffect, useState } from "react";

type Size = [number, number];
export const useWindowSize = () => {
  const [size, setSize] = useState<Size>([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};
