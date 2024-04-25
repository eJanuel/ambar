import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/types/Store.types";
import { GameCreatePayload } from "../../redux/actions/Game.actions";

import { ReturnArrowIcon } from "../Icons/ReturnArrow.icon";
import MapSettingsForm from "./Forms/NewGame/MapSettings.form";
import NarratorSettingsForm from "./Forms/NewGame/NarratorSettings.form";
import PawnSettingsForm from "./Forms/NewGame/PawnSettings.form";
import GearSettingsForm from "./Forms/NewGame/GearSettings.form";



interface NewGameMenuProps {
  returnToMenu: () => void;
}

const NewGameMenu: React.FC<NewGameMenuProps> = ({ returnToMenu }) => {
  const dispatch = useDispatch<AppDispatch>();
  const step: number = useSelector((state: RootState) => state.menu.step);
  const formInputs = useSelector((state: RootState) => state.menu.newGameForm);

  const setStep = (newStep: number) => {
    if (newStep === 0) {
      returnToMenu();
    } else if (newStep === 5) {
      handleCreateGame();
    } else {
      dispatch({ type: "menu/setStep", payload: newStep });
    }
  };

  const handleCreateGame = () => {
    if (
      formInputs.mapForm.currentMap &&
      formInputs.pawnForm.pawns.length === 5
    ) {
      let gameSettings: GameCreatePayload = {
        name: formInputs.mapForm.inputs.name,
        map: formInputs.mapForm.currentMap,
        pawns: formInputs.pawnForm.pawns,
        settings: {
          narrator: formInputs.narratorForm.inputs.type,
          difficulty: formInputs.narratorForm.inputs.difficulty,
        }
      };

      dispatch({ type: "game/createGame", payload: gameSettings });
    } else {
      console.log('missing pawns or map');
    }
  };

  return (
    <>
      <div
        onClick={() => setStep(step - 1)}
        className="new-game-form__return-button"
      >
        <ReturnArrowIcon />
      </div>

      <div className="new-game-form">
        <h2 className="new-game-form__title">New Game</h2>

        <div className="new-game-form__container">
          <div className="new-game-form__arial-line">
            <span
              onClick={() => setStep(1)}
              className={step === 1 ? "active" : ""}
            >
              Map Settings
            </span>
            <span
              onClick={() => setStep(2)}
              className={step === 2 ? "active" : ""}
            >
              Narrator Settings
            </span>
            <span
              onClick={() => setStep(3)}
              className={step === 3 ? "active" : ""}
            >
              Pawn Settings
            </span>
            <span
              onClick={() => setStep(4)}
              className={step === 4 ? "active" : ""}
            >
              Gear Settings
            </span>
          </div>

          {step === 1 && <MapSettingsForm nextStep={() => setStep(2)} />}
          {step === 2 && <NarratorSettingsForm nextStep={() => setStep(3)} />}
          {step === 3 && <PawnSettingsForm nextStep={() => setStep(4)} />}
          {step === 4 && <GearSettingsForm nextStep={() => setStep(5)} />}
        </div>
      </div>
    </>
  );
};

export default NewGameMenu;
