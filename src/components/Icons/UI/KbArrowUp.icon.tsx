import React, { useState } from "react";

export const KbArrowUpIcon: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  const [isHovered, setHover] = useState(false);

  return (
    <svg
      id="icon-kb-arrow_up"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill={isHovered ? "#e8eaed" : "#b0b3b8"}
    >
      <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
    </svg>
  );
};
