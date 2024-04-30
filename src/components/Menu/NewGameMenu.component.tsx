import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/types/Store.types";
import {
  GameCreatePayload,
  createGame,
} from "../../redux/actions/Game.actions";

import MapSettingsForm from "./Forms/NewGame/MapSettings.form";
import NarratorSettingsForm from "./Forms/NewGame/NarratorSettings.form";
import PawnSettingsForm from "./Forms/NewGame/PawnSettings.form";
import GearSettingsForm from "./Forms/NewGame/GearSettings.form";
import { ReturnArrowIcon } from "../Icons/ReturnArrow.icon";
import {
  MenuDisplayablePages,
  NewGameFormSteps,
  setDisplayedPage,
  setGameFormStep,
} from "../../redux/reducers/app/Menu.reducer";

const NewGameMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentStep }: { currentStep: NewGameFormSteps } = useSelector(
    (state: RootState) => state.menu.newGameForm
  );
  const formInputs = useSelector((state: RootState) => state.menu.newGameForm);

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
        },
      };

      dispatch(createGame(gameSettings));
    } else {
      console.log("missing pawns or map");
    }
  };

  return (
    <>
      <div
        onClick={() => dispatch(setDisplayedPage(MenuDisplayablePages.MENU))}
        className="new-game-form__return-button"
      >
        <ReturnArrowIcon />
      </div>

      <div className="new-game-form">
        <h2 className="new-game-form__title">New Game</h2>

        <div className="new-game-form__container">
          <div className="new-game-form__arial-line">
            <span
              onClick={() => dispatch(setGameFormStep(NewGameFormSteps.MAP))}
              className={currentStep === NewGameFormSteps.MAP ? "active" : ""}
            >
              Map Settings
            </span>
            <span
              onClick={() =>
                dispatch(setGameFormStep(NewGameFormSteps.NARRATOR))
              }
              className={
                currentStep === NewGameFormSteps.NARRATOR ? "active" : ""
              }
            >
              Narrator Settings
            </span>
            <span
              onClick={() => dispatch(setGameFormStep(NewGameFormSteps.PAWN))}
              className={currentStep === NewGameFormSteps.PAWN ? "active" : ""}
            >
              Pawn Settings
            </span>
            <span
              onClick={() => dispatch(setGameFormStep(NewGameFormSteps.GEAR))}
              className={currentStep === NewGameFormSteps.GEAR ? "active" : ""}
            >
              Gear Settings
            </span>
          </div>

          {currentStep === NewGameFormSteps.MAP && <MapSettingsForm />}
          {currentStep === NewGameFormSteps.NARRATOR && (
            <NarratorSettingsForm />
          )}
          {currentStep === NewGameFormSteps.PAWN && <PawnSettingsForm />}
          {currentStep === NewGameFormSteps.GEAR && <GearSettingsForm />}
          {currentStep === NewGameFormSteps.SUMMARY && (
            <div className="new-game-form__summary">
              <h3>Summary</h3>
              <div className="new-game-form__summary-item">
                <span>Map:</span>
                <span>{formInputs.mapForm.inputs.name}</span>
              </div>
              <div className="new-game-form__summary-item">
                <span>Narrator:</span>
                <span>{formInputs.narratorForm.inputs.type}</span>
              </div>
              <div className="new-game-form__summary-item">
                <span>Difficulty:</span>
                <span>{formInputs.narratorForm.inputs.difficulty}</span>
              </div>
              <div className="new-game-form__summary-item">
                <span>Pawns:</span>
                <span>{formInputs.pawnForm.pawns.length}</span>
              </div>
              <button
                className="new-game-form__submit"
                onClick={handleCreateGame}
              >
                Create Game
              </button>
            </div>
          )}
          
        </div>
      </div>
    </>
  );
};

export default NewGameMenu;
