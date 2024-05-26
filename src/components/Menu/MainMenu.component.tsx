import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../redux/types/Store.types";
import { MenuDisplayablePages, setDisplayedPage } from "../../redux/reducers/app/Menu.reducer";

import NewGameMenu from "./NewGameMenu.component";
import LoadGameMenu from "./LoadGameMenu.component";
import { NewGameIcon } from "../Icons/NewGame.icon";
import { LoadGameIcon } from "../Icons/LoadGame.icon";
import { SettingsIcon } from "../Icons/Settings.icon";
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

const MainMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { displayedPage }: { displayedPage: MenuDisplayablePages } =
    useSelector((state: RootState) => state.menu);



  return (
    <>
      {displayedPage === MenuDisplayablePages.MENU && (
        <div className="menu-container__options">
          <MenuButton
            buttonText="New Game"
            Icon={NewGameIcon}
            onClick={() => dispatch(setDisplayedPage(MenuDisplayablePages.NEW_GAME))}
          />
          <MenuButton
            buttonText="Load Game"
            Icon={LoadGameIcon}
            onClick={() => dispatch(setDisplayedPage(MenuDisplayablePages.LOAD_GAME))}
          />
          <MenuButton
            buttonText="Settings"
            Icon={SettingsIcon}
            onClick={() => dispatch(setDisplayedPage(MenuDisplayablePages.SETTINGS))}
          />
        </div>
      )}

      {displayedPage === MenuDisplayablePages.NEW_GAME && <NewGameMenu />}

      {displayedPage === MenuDisplayablePages.LOAD_GAME && <LoadGameMenu />}

      {displayedPage === MenuDisplayablePages.SETTINGS && <div>Settings</div>}

      <AmbarLogoIcon hover={false} />
    </>
  );
};

export default MainMenu;
