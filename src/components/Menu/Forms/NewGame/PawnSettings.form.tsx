import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/types/Store.types";
import { generateNewPawn } from "../../../../redux/reducers/app/Menu.reducer";
import { Pawn } from "../../../../game/logic/types/Pawn.types";

type PawnSettingsFormProps = {
  nextStep: () => void;
}

const PawnSettingsForm: React.FC<PawnSettingsFormProps> = ({ nextStep }) => {
  const pawns: Pawn[] = useSelector((state: RootState) => state.menu.newGameForm.pawnForm.pawns);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedPawn, setSelectedPawn] = useState<Pawn | null>(null);

  const handlePawnClick = (pawn: Pawn) => {
    setSelectedPawn(pawn);
  };

  useEffect(() => {
    if (pawns.length < 5) {
      dispatch(generateNewPawn());
    } else {
      setSelectedPawn(pawns[0]);
    }
  }, [pawns]);

  // useEffect(() => {
  //   if (selectedPawn !== null) {
  //     console.log(selectedPawn);

  //     for (let trait of selectedPawn.traits) {
  //       console.log(trait);
  //     }
      
  //   }
  // }, [selectedPawn])


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    nextStep();
  };

  return (
    <form className="new-game-form__form" onSubmit={handleSubmit}>
      <div className="new-game-form__pawns">
        {selectedPawn != null ? (
          <>
            <div className="new-game-form__pawns-list">
              <ul className="new-game-form__pawns-list-items">
                {pawns.map((pawn) => (
                  <li
                    key={pawn.entity.id}
                    className={`new-game-form__pawns-list-item ${
                      selectedPawn?.entity.id === pawn.entity.id ? "active" : ""
                    }`}
                    onClick={() => handlePawnClick(pawn)}
                  >
                    {pawn.infos.firstName} {pawn.infos.lastName}
                  </li>
                ))}
              </ul>
            </div>

            <div className="new-game-form__pawn-details">
              <h4 className="new-game-form__pawn-details-name">
                {selectedPawn.infos.firstName} {selectedPawn.infos.lastName}
              </h4>
              <div className="new-game-form__pawn-details--container">
                <div className="new-game-form__pawn-details-age">
                  <div className="new-game-form__pawn-details-age--item">
                    <span className="new-game-form__pawn-details-age--label">
                      Biological Age
                    </span>
                    <span className="new-game-form__pawn-details-age--value">
                      {selectedPawn.infos.biologicalAge}
                    </span>
                  </div>
                  <div className="new-game-form__pawn-details-age--item">
                    <span className="new-game-form__pawn-details-age--label">
                      Chronological Age
                    </span>
                    <span className="new-game-form__pawn-details-age--value">
                      {selectedPawn.infos.chronologicalAge}
                    </span>
                  </div>
                </div>

                <div className="new-game-form__pawn-details-skills">
                  <h5 className="new-game-form__pawn-details-subtitle">
                    Skills
                  </h5>
                  <ul className="new-game-form__pawn-details-list">
                    {Object.entries(selectedPawn.skills).map(([key, skill], index) => (
                      <li
                        key={index}
                        className="new-game-form__pawn-details-list-item"
                      >
                        <span className="new-game-form__pawn-details-list-item--label">
                          {key}:
                        </span>
                        <span className="new-game-form__pawn-details-list-item--value">
                          {skill.level}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="new-game-form__pawn-details-traits">
                  <h5 className="new-game-form__pawn-details-subtitle">
                    Traits
                  </h5>
                  <ul className="new-game-form__pawn-details-list">
                    {selectedPawn.traits.map((trait) => (
                      <li
                        key={trait.id}
                        className="new-game-form__pawn-details-list-item"
                      >
                        {trait.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="new-game-form__pawns-generating">Generating pawns...</p>
        )}
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
  );
};

export default PawnSettingsForm;
