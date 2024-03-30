import React, { FC } from "react";

import NewGameForm from "./NewGame.component";
import { NewGameIcon } from "../Icons/NewGame.icon";
import { LoadGameIcon } from "../Icons/LoadGame.icon";
import { SettingsIcon } from "../Icons/Settings.icon";
// import ambarLogo from "/src/logo.svg"
import { AmbarLogoIcon } from "../Icons/AmbarLogo.icon";

interface MenuButtonProps {
  buttonText: string;
  Icon: FC<{ hover: boolean }>;
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  buttonText,
  Icon,
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
      <Icon hover={hovered} />
      <span className="menu-container__button">{buttonText}</span>
    </div>
  );
};

export const MainMenu: React.FC = () => {
  const [clicked, setClicked] = React.useState(0);

  return (
    <>
      <AmbarLogoIcon hover={false} />

      {clicked === 0 && (
        <div className="menu-container__options">
          <MenuButton
            buttonText="Create New Game"
            Icon={NewGameIcon}
            onClick={() => setClicked(1)}
          />
          <MenuButton
            buttonText="Load Existing Game"
            Icon={LoadGameIcon}
            onClick={() => setClicked(2)}
          />
          <MenuButton
            buttonText="Settings"
            Icon={SettingsIcon}
            onClick={() => setClicked(3)}
          />
        </div>
      )}

      {clicked === 1 && <NewGameForm returnToMenu={() => setClicked(0)} />}

      {clicked === 2 && <div>Load Game</div>}
    </>
  );
};
