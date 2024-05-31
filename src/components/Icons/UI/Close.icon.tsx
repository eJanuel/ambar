import { useState } from "react";

export const CloseIcon: React.FC = () => {
  const [isHovered, setHover] = useState(false);

  return (
    <svg
      id="icon-close"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill={isHovered ? "#e8eaed" : "#b0b3b8"}
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
};
