import { useState } from "react";

export const PauseIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      {!hover ? (
        <svg
          id="icon-pause_fill"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z" />
        </svg>
      ) : (
        <svg
          id="icon-pause_outline"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" />
        </svg>
      )}
    </div>
  );
};
