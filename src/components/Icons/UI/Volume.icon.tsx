import { useState } from "react";

export const VolumeIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [isHovered, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      className="icon-container"
    >
      <svg
        id="icon-volume"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill={isHovered ? "#b0b3b8" : "#e8eaed"}
      >
        <path d="M160-160v-320h160v320H160Zm240 0v-640h160v640H400Zm240 0v-440h160v440H640Z" />
      </svg>
    </div>
  );
};
