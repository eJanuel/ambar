import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/types/Store.types";
import {
  createSave,
  deleteSave,
  loadSave,
} from "../../../redux/actions/Game.actions";
import { SettingsIcon } from "../../Icons/UI/SettingsIcon";
import { CloseIcon } from "../../Icons/UI/Close.icon";
import { PreviousIcon } from "../../Icons/UI/Previous.icon";
import { IndexedDBHelper } from "../../../helpers/IndexDB.helper";
import { GameSave } from "../../../types/Game.types";
import { setRefreshDB } from "../../../redux/reducers/app/Menu.reducer";
import { togglePause } from "../../../redux/reducers/game/Clock.reducer";
import { GameplayIcon } from "../../Icons/UI/Gameplay.icon";
import { GraphicsIcon } from "../../Icons/UI/Graphics.icon";
import { VolumeIcon } from "../../Icons/UI/Volume.icon";
import { ControlsIcon } from "../../Icons/UI/Controls.icon";

export const MenuButtonUI: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loadGameOpen, setLoadGameOpen] = useState(false);
  const [saveGameOpen, setSaveGameOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [wasPaused, setWasPaused] = useState(false);
  const { isPaused }: { isPaused: boolean } = useSelector(
    (state: RootState) => state.clock
  );

  const handleExit = () => {
    window.location.reload();
  };

  const handleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
      setLoadGameOpen(false);
      !wasPaused && dispatch(togglePause());
    } else {
      setMenuOpen(true);
      setWasPaused(isPaused);
      !isPaused && dispatch(togglePause());
    }
  };

  const handleLoadGame = () => {
    setLoadGameOpen(true);
  };

  const handleSaveGame = () => {
    setSaveGameOpen(true);
  };

  const handleSettings = () => {
    setSettingsOpen(true);
  };

  return (
    <>
      <div id="ui--menu-button" onClick={handleMenu}>
        <SettingsIcon />
      </div>
      {menuOpen && (
        <>
          <div id="menu--background" onClick={handleMenu}></div>
          <div className="ui--menu-container">
            <button className="menu-button__close" onClick={handleMenu}>
              <CloseIcon />
            </button>
            {menuOpen && !settingsOpen && !loadGameOpen && !saveGameOpen && (
              <>
                <button className="menu-button" onClick={handleSaveGame}>
                  Save Game
                </button>
                <button className="menu-button" onClick={handleLoadGame}>
                  Load Game
                </button>
                <button className="menu-button" onClick={handleSettings}>
                  Settings
                </button>
                <button className="menu-button" onClick={handleExit}>
                  Exit Game
                </button>
              </>
            )}
            {settingsOpen && (
              <Settings closeSection={() => setSettingsOpen(false)} />
            )}
            {loadGameOpen && (
              <LoadGame closeSection={() => setLoadGameOpen(false)} />
            )}
            {saveGameOpen && (
              <SaveGame closeSection={() => setSaveGameOpen(false)} />
            )}
          </div>
        </>
      )}
    </>
  );
};

interface MenuSectionProps {
  closeSection: () => void;
}

const Settings: React.FC<MenuSectionProps> = ({ closeSection }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="menu-section section--settings">
      <button className="menu--button__previous" onClick={closeSection}>
        <PreviousIcon />
      </button>

      <div className="section--container">
        <div className="settings--categories">
          <GameplayIcon onClick={() => setActiveCategory(0)} />
          <GraphicsIcon onClick={() => setActiveCategory(1)} />
          <VolumeIcon onClick={() => setActiveCategory(2)} />
          <ControlsIcon onClick={() => setActiveCategory(3)} />
        </div>
        <div className="settings--container">
          {activeCategory === 0 && <GameplaySettings />}
          {activeCategory === 1 && <GraphicsSettings />}
          {activeCategory === 2 && <VolumeSettings />}
          {activeCategory === 3 && <ControlsSettings />}
        </div>
      </div>
    </div>
  );
};

const GameplaySettings: React.FC = () => {
  return (
    <div>
      <h2>Gameplay Settings</h2>
    </div>
  );
};

const GraphicsSettings: React.FC = () => {
  return (
    <div>
      <h2>Graphics Settings</h2>
    </div>
  );
};

const VolumeSettings: React.FC = () => {
  return (
    <div>
      <h2>Volume Settings</h2>
    </div>
  );
};

const ControlsSettings: React.FC = () => {
  return (
    <div>
      <h2>Controls Settings</h2>
    </div>
  );
};

const LoadGame: React.FC<MenuSectionProps> = ({ closeSection }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { indexDB }: { indexDB: IndexedDBHelper } = useSelector(
    (state: RootState) => state.db
  );
  const { refreshDB }: { refreshDB: boolean } = useSelector(
    (state: RootState) => state.menu
  );
  const [savedGames, setSavedGames] = useState<{
    [key: string]: { key: string; data: GameSave }[];
  } | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log(refreshDB);
    if (refreshDB || savedGames === null) {
      indexDB.getAll("games").then((games) => {
        if (games) {
          const groupedGames = games.reduce((acc, game) => {
            const gameID = game.data.gameID;
            if (!acc[gameID]) {
              acc[gameID] = [];
            }
            acc[gameID].push(game);
            return acc;
          }, {} as { [key: string]: { key: string; data: GameSave }[] });
          setSavedGames(groupedGames);
          setLoading(false);
        }
      });
      dispatch(setRefreshDB(false));
    }
  }, [refreshDB]);

  const handleLoad = (saveID: string) => {
    dispatch(loadSave(saveID));
    closeSection();
  };

  const handleDelete = (saveID: string) => {
    dispatch(deleteSave(saveID));
  };

  return (
    <div className="menu-section section--loadGame">
      <button className="menu--button__previous" onClick={closeSection}>
        <PreviousIcon />
      </button>

      <div className="section--container">
        {isLoading ? (
          <p>Loading...</p>
        ) : savedGames === null ? (
          <p>No Saves</p>
        ) : (
          <ul>
            {Object.entries(savedGames).map(([gameID, saves]) => {
              const gameName = saves[0].data.gameName;
              return (
                <div key={gameID} className="game">
                  <h2 className="game__title">{gameName}</h2>
                  <div className="game__save-container">
                    {saves.map((save) => (
                      <div key={save.key} className="game__save">
                        <span className="game__save-name">
                          {save.data.saveName}
                        </span>
                        <div className="game__save-info">
                          <TimeSpentDisplay
                            gameClock={{
                              minutes: save.data.clock.gameMinutes,
                              hours: save.data.clock.gameHours,
                              days: save.data.clock.gameDays,
                              months: save.data.clock.gameMonths,
                              years: save.data.clock.gameYears,
                            }}
                          />
                          <p className="game__pawns-count">
                            Total Pawns: {save.data.pawns.length}
                          </p>
                        </div>
                        <button
                          onClick={() => handleLoad(save.key)}
                          className="game__load-button"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(save.key);
                          }}
                          className="game__delete-button"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

const SaveGame: React.FC<MenuSectionProps> = ({ closeSection }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { gameName }: { gameName: string } = useSelector(
    (state: RootState) => state.game
  );
  const [saveName, setSaveName] = useState(
    gameName + " - " + new Date().toDateString()
  );

  const handleSave = () => {
    dispatch(createSave(saveName));
    closeSection();
  };

  return (
    <div className="menu-section section--saveGame">
      <button className="menu--button__previous" onClick={closeSection}>
        <PreviousIcon />
      </button>

      <div className="section--container">
        <input
          type="text"
          value={saveName}
          onChange={(e) => setSaveName(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

interface ClockProps {
  gameClock: {
    minutes: number;
    hours: number;
    days: number;
    months: number;
    years: number;
  };
}

const TimeSpentDisplay: React.FC<ClockProps> = ({ gameClock }) => {
  const isFreshStart =
    gameClock.minutes === 0 &&
    gameClock.hours === 0 &&
    gameClock.days === 0 &&
    gameClock.months === 0 &&
    gameClock.years === 0;

  return (
    <>
      <span className="game__time-spent">Time Spent: </span>
      {isFreshStart ? (
        <span>Freshly Started</span>
      ) : (
        <span>
          {gameClock.years > 0 && `${gameClock.years}Y `}
          {gameClock.months > 0 && `${gameClock.months}M `}
          {gameClock.days > 0 && `${gameClock.days}d `}
          {gameClock.hours > 0 && `${gameClock.hours}h `}
          {gameClock.minutes > 0 && `${gameClock.minutes}m`}
        </span>
      )}
    </>
  );
};
