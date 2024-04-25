import React, { FC } from "react";

import NewGameMenu from "./NewGameMenu.component";
import { NewGameIcon } from "../Icons/NewGame.icon";
import { LoadGameIcon } from "../Icons/LoadGame.icon";
import { SettingsIcon } from "../Icons/Settings.icon";
import { AmbarLogoIcon } from "../Icons/AmbarLogo.icon";
import LoadGameMenu from "./LoadGameMenu.component";

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

const MainMenu: React.FC = () => {
  const [step, setStep] = React.useState(0);

  return (
    <>
      {step === 0 && (
        <div className="menu-container__options">
          <MenuButton
            buttonText="New Game"
            Icon={NewGameIcon}
            onClick={() => setStep(1)}
          />
          <MenuButton
            buttonText="Load Game"
            Icon={LoadGameIcon}
            onClick={() => setStep(2)}
          />
          <MenuButton
            buttonText="Settings"
            Icon={SettingsIcon}
            onClick={() => setStep(3)}
          />
        </div>
      )}

      {step === 1 && <NewGameMenu returnToMenu={() => setStep(0)} />}

      {step === 2 && <LoadGameMenu returnToMenu={() => setStep(0)} />}

      {step === 3 && <div>Settings</div>}

      <AmbarLogoIcon hover={false} />
    </>
  );
};

export default MainMenu;