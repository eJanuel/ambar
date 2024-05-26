import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/types/Store.types";
import { createSave } from "../../../redux/actions/Game.actions";
import { SettingsIcon } from "../../Icons/UI/SettingsIcon";

export const MenuButtonUI: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loadGameOpen, setLoadGameOpen] = useState(false);

  const handleExit = () => {
    window.location.reload();
  };

  const handleMenu = () => {
    setMenuOpen(true);
  };

  const handleLoadGame = () => {
    setLoadGameOpen(true);
  };

  const handleSaveGame = () => {
    dispatch(createSave(""));
  };

  const handleClose = () => {
    setMenuOpen(false);
    setLoadGameOpen(false);
  };

  return (
    <div className="UI--item">
      <div id="menu-button" onClick={handleMenu}>
        <SettingsIcon />
      </div>
      {menuOpen && (
        <div id="menu">
          <button onClick={handleExit}>Exit Game</button>
          <button onClick={handleSaveGame}>Save Game</button>
          <button onClick={handleLoadGame}>Load Game</button>
          <button onClick={handleClose}>Close Menu</button>
        </div>
      )}
      {loadGameOpen && <div id="load-game">Load Game</div>}
    </div>
  );
};
