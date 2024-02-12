import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../utils/types/Store.types";


const GearSettingsForm: React.FC<{ nextStep: () => void }> = ({
  nextStep,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    nextStep();
  };

  return (
    <>
      <form className="new-game-form__form" onSubmit={handleSubmit}>
        <h3 className="new-game-form__section-title">Gear Settings</h3>

        <div className="new-game-form__input-group">
          <div className="new-game-form__input-group-item">
          <input
              className="new-game-form__submit"
              type="submit"
              value="Create Game"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default GearSettingsForm;
