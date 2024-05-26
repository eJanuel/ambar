import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../redux/types/Store.types";
import {
  MenuDisplayablePages,
  NewGameFormSteps,
  setDisplayedPage,
  setGameFormStep,
} from "../../redux/reducers/app/Menu.reducer";

import MapSettingsForm from "./Forms/NewGame/MapSettings.form";
import NarratorSettingsForm from "./Forms/NewGame/NarratorSettings.form";
import PawnSettingsForm from "./Forms/NewGame/PawnSettings.form";
import GearSettingsForm from "./Forms/NewGame/GearSettings.form";
import { Summary } from "./Forms/NewGame/Summary";
import { ReturnArrowIcon } from "../Icons/ReturnArrow.icon";


const NewGameMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentStep }: { currentStep: NewGameFormSteps } = useSelector(
    (state: RootState) => state.menu.newGameForm
  );

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
          {currentStep === NewGameFormSteps.SUMMARY && <Summary />}
        </div>
      </div>
    </>
  );
};

export default NewGameMenu;
