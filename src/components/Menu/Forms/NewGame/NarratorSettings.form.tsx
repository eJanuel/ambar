import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/types/Store.types";

enum NARRATOR {
  MERCHANT = "merchant",
  IDEOLOGY = "ideologist",
  WARRIOR = "warrior",
  VARIED = "varied",
}

enum DIFFICULTY {
  PEACEFUL = "peaceful",
  EASY = "easy",
  NORMAL = "normal",
  HARD = "hard",
}

const narratorDescMap: { [key: string]: string } = {
  [NARRATOR.MERCHANT]:
    "The merchant narrator will most trigger events like trade caravans, pillagers attacks, trade opportunities, etc.",
  [NARRATOR.IDEOLOGY]:
    "The ideologist narrator will most trigger events like ideological conflicts, religious conversions, etc.",
  [NARRATOR.WARRIOR]:
    "The warrior narrator will most trigger events like wars, raids, etc.",
  [NARRATOR.VARIED]:
    "The varied narrator will trigger events from all other narrators.",
};

const difficultyDescMap: { [key: string]: string } = {
  [DIFFICULTY.PEACEFUL]: "Only triggers unharmful events.",
  [DIFFICULTY.EASY]: "Triggers easier and less frequent events.",
  [DIFFICULTY.NORMAL]: "You will have time between events to recover.",
  [DIFFICULTY.HARD]:
    "Events will trigger more often and the game will be harder.",
};

type NarratorSettingsFormProps = {
  nextStep: () => void;
}

const NarratorSettingsForm: React.FC<NarratorSettingsFormProps> = ({ nextStep }) => {
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
              <option value={NARRATOR.IDEOLOGY}>Ideologist</option>
              <option value={NARRATOR.WARRIOR}>Warrior</option>
              <option value={NARRATOR.VARIED}>Varied</option>
            </select>
          </div>

          <p className="new-game-form__select-description">
            {narratorDescMap[inputs.type]}
          </p>
        </div>

        <div className="new-game-form__input-group">
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
          <p className="new-game-form__select-description">
            {difficultyDescMap[inputs.difficulty]}
          </p>
        </div>

        <div className="new-game-form__input-group">
          <div className="new-game-form__input-group-item">
            <input
              className="new-game-form__submit"
              type="submit"
              value="Next"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default NarratorSettingsForm;
