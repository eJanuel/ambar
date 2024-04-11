import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/types/Store.types";


const GearSettingsForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({ type: "menu/setStep", payload: 5 });
  };

  return (
    <>
      <form className="new-game-form__form" onSubmit={handleSubmit}>
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
