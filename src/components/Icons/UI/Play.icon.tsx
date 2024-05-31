import { useState } from "react";

export const PlayIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      {!hover ? (
        <svg
          id="icon-play_fill"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M320-200v-560l440 280-440 280Z" />
        </svg>
      ) : (
        <svg
          id="icon-play_outline"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
        </svg>
      )}
    </div>
  );
};
