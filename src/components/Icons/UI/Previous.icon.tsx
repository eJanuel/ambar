import { useState } from "react";

export const PreviousIcon: React.FC = () => {
  const [isHovered, setHover] = useState(false);

  return (
    <svg
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      id="icon-previous"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill={isHovered ? "#e8eaed" : "#b0b3b8"}
    >
      <path d="M360-200 80-480l280-280 56 56-183 184h647v80H233l184 184-57 56Z" />
    </svg>
  );
};
