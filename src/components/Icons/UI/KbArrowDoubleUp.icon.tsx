import React, { useState } from "react";

export const KbArrowDoubleUpIcon: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  const [isHovered, setHover] = useState(false);

  return (
    <svg
      id="icon-kb-arrow-double_up"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill={isHovered ? "#e8eaed" : "#b0b3b8"}
    >
      <path d="m296-224-56-56 240-240 240 240-56 56-184-183-184 183Zm0-240-56-56 240-240 240 240-56 56-184-183-184 183Z" />
    </svg>
  );
};
