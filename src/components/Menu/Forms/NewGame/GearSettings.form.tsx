import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/types/Store.types";
import {
  NewGameFormSteps,
  setGameFormStep,
} from "../../../../redux/reducers/app/Menu.reducer";

const GearSettingsForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <form
        className="new-game-form__form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(setGameFormStep(NewGameFormSteps.SUMMARY));
        }}
      >
        <div className="new-game-form__input-group">
          <div className="new-game-form__input-group-item">
            <input
              className="new-game-form__submit"
              type="submit"
              value="Create World"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default GearSettingsForm;
