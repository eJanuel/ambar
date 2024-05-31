import React, { useState } from "react";

export const KbArrowDoubleDownIcon: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  const [isHovered, setHover] = useState(false);

  return (
    <svg
      id="icon-kb-arrow-double_down"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill={isHovered ? "#e8eaed" : "#b0b3b8"}
    >
      <path d="M480-200 240-440l56-56 184 183 184-183 56 56-240 240Zm0-240L240-680l56-56 184 183 184-183 56 56-240 240Z" />
    </svg>
  );
};
