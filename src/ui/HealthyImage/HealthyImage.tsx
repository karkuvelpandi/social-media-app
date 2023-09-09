import React, { useState } from "react";
import defaultImg from "./default.png";
type HealthyImageProps = {
  src: string;
  className?: string;
  onError?: () => void;
};
export const HealthyImage: React.FC<HealthyImageProps> = ({
  src,
  className,
  onError,
}) => {
  const [url, setUrl] = useState<string>(src);
  return (
    <img
      className={className}
      src={url}
      alt=""
      onError={() => setUrl(defaultImg)}
    />
  );
};
