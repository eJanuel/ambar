import React from "react";
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

  const nextStep = () => {
    if (step === 4) {
      // TODO: dispatch new game
    } else {
      dispatch({ type: "menu/setStep", payload: step + 1 });
    }
  };

  const previousStep = () => {
    if (step === 1) {
      returnToMenu();
    } else {
      dispatch({ type: "menu/setStep", payload: step - 1 });
    }
  };

  return (
    <div className="new-game-form">
      <div onClick={previousStep} className="new-game-form__return-button">
        <ReturnArrowIcon />
      </div>

      <h2 className="new-game-form__title">New Game</h2>

      {step === 1 && <MapSettingsForm />}
      {step === 2 && <NarratorSettingsForm nextStep={nextStep} />}
      {step === 3 && <PawnSettingsForm nextStep={nextStep} />}
      {step === 4 && <GearSettingsForm nextStep={nextStep} />}
    </div>
  );
};

export default NewGameForm;
