import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/types/Store.types";

enum NARRATOR {
  MERCHANT = "merchant",
  ECONOMIST = "economist",
  WARRIOR = "warrior",
  VARIED = "varied",
}

enum DIFFICULTY {
  PEACEFUL = "peaceful",
  EASY = "easy",
  NORMAL = "normal",
  HARD = "hard",
}

const NarratorSettingsForm: React.FC<{ nextStep: () => void }> = ({
  nextStep,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const inputs: { [key: string]: string } = useSelector(
    (state: RootState) => state.menu.newGameForm.narratorForm.inputs
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    nextStep();
  };

  return (
    <>
      <form className="new-game-form__form" onSubmit={handleSubmit}>
        <h3 className="new-game-form__section-title">Narrator Settings</h3>
        <div className="new-game-form__input-group">
          <div className="new-game-form__input-group-item">
            <label className="new-game-form__label">Narrator Type</label>
            <select
              className="new-game-form__select"
              value={inputs.type as string}
              onChange={(e) =>
                dispatch({
                  type: "menu/setNarratorFormInputs",
                  payload: { key: "type", value: String(e.target.value) },
                })
              }
            >
              <option value={NARRATOR.MERCHANT}>Merchant</option>
              <option value={NARRATOR.ECONOMIST}>Economist</option>
              <option value={NARRATOR.WARRIOR}>Warrior</option>
              <option value={NARRATOR.VARIED}>Varied</option>
            </select>
          </div>
          <div className="new-game-form__input-group-item">
            <label className="new-game-form__label">Difficulty</label>
            <select
              className="new-game-form__select"
              value={inputs.difficulty}
              onChange={(e) =>
                dispatch({
                  type: "menu/setNarratorFormInputs",
                  payload: { key: "difficulty", value: String(e.target.value) },
                })
              }
            >
              <option value={DIFFICULTY.PEACEFUL}>Peaceful</option>
              <option value={DIFFICULTY.EASY}>Easy</option>
              <option value={DIFFICULTY.NORMAL}>Normal</option>
              <option value={DIFFICULTY.HARD}>Hard</option>
            </select>
          </div>
        </div>
        <div className="new-game-form__input-group">
          <div className="new-game-form__input-group-item">
            <input
              className="new-game-form__submit"
              type="submit"
              value="To Pawn Settings"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default NarratorSettingsForm;
