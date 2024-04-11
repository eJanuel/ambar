import React, { useEffect } from "react";
import { ReturnArrowIcon } from "../Icons/ReturnArrow.icon";
import MapSettingsForm from "./Forms/NewGame/MapSettings.form";
import NarratorSettingsForm from "./Forms/NewGame/NarratorSettings.form";
import PawnSettingsForm from "./Forms/NewGame/PawnSettings.form";
import GearSettingsForm from "./Forms/NewGame/GearSettings.form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/types/Store.types";

interface NewGameFormProps {
  returnToMenu: () => void;
}

const NewGameForm: React.FC<NewGameFormProps> = ({ returnToMenu }) => {
  const dispatch = useDispatch<AppDispatch>();
  const step: number = useSelector((state: RootState) => state.menu.step);

  useEffect(() => {
    if (step === 0) {
    }
  });

  const setStep = (newStep: number) => {
    if (newStep === 0) {
      returnToMenu();
    } else {
      dispatch({ type: "menu/setStep", payload: newStep });
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

          {step === 1 && <MapSettingsForm />}
          {step === 2 && <NarratorSettingsForm />}
          {step === 3 && <PawnSettingsForm />}
          {step === 4 && <GearSettingsForm />}
        </div>
      </div>
    </>
  );
};

export default NewGameForm;
