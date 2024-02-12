import { useState } from "react";

const BlockVisibility: React.FC = () => {
  const [visibility, setVisibility] = useState<
    Record<string, boolean>
  >({
    grass: true,
    dirt: true,
    stone: true,
    granite: true,
    andesite: true,
    diorite: true,
    marble: true,
    limestone: true,
    coal: true,
    iron: true,
    copper: true,
    gold: true,
    air: true,
  });

  const handleCheckboxChange = (type: string) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [type]: !prevVisibility[type],
    }));
  };

  return(
    <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 1000,
          background: "black",
          color: "white",
          padding: "12px",
        }}
      >
        {Object.keys(visibility).map((type) => (
          <div key={type}>
            <label>
              {type}
              <input
                type="checkbox"
                checked={visibility[type]}
                onChange={() => handleCheckboxChange(type)}
              />
            </label>
          </div>
        ))}
      </div>
  )
};

export default BlockVisibility;