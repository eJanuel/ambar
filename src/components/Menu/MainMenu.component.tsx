import React, { FC } from "react";

import NewGameForm from "./NewGame.component";
import { NewGameIcon } from "../Icons/NewGame.icon";
import { LoadGameIcon } from "../Icons/LoadGame.icon";
import { SettingsIcon } from "../Icons/Settings.icon";
import ambarLogo from "../../../public/logo.svg"

interface MenuButtonProps {
  buttonText: string;
  icon: FC<{ hover: boolean }>;
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  buttonText,
  icon,
  onClick,
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="menu-container__option"
    >
      {icon({ hover: hovered })}
      <span className="menu-container__button">{buttonText}</span>
    </div>
  );
};

export const MainMenu: React.FC = () => {
  const [clicked, setClicked] = React.useState(0);

  return (
    <>
      <img src={ambarLogo} alt="Game Logo" />

      {clicked === 0 && (
        <div className="menu-container__options">
          <MenuButton
            buttonText="Create New Game"
            icon={NewGameIcon}
            onClick={() => setClicked(1)}
          />
          <MenuButton
            buttonText="Load Existing Game"
            icon={LoadGameIcon}
            onClick={() => setClicked(2)}
          />
          <MenuButton
            buttonText="Settings"
            icon={SettingsIcon}
            onClick={() => setClicked(3)}
          />
        </div>
      )}

      {clicked === 1 && <NewGameForm returnToMenu={() => setClicked(0)} />}

      {clicked === 2 && <div>Load Game</div>}
    </>
  );
};
