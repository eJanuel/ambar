import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../../redux/types/Store.types";
import {
  GameCreatePayload,
  createGame,
} from "../../../../redux/actions/Game.actions";

export const Summary: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const formInputs = useSelector((state: RootState) => state.menu.newGameForm); // TODO ALL FILE TO REVIEW

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
      <button className="new-game-form__submit" onClick={handleCreateGame}>
        Create Game
      </button>
    </div>
  );
};
