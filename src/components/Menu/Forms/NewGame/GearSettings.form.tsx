import React from "react";

type GearSettingsFormProps = {
  nextStep: () => void;
};
const GearSettingsForm: React.FC<GearSettingsFormProps> = ({ nextStep }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    nextStep();
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
