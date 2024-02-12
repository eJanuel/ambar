import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../utils/types/Store.types";
import { generateNewPawn } from "../../../../reducers/Pawn.reducer";
import { Pawn, Skills } from "../../../../utils/types/Pawn.types";

const PawnSettingsForm: React.FC<{ nextStep: () => void }> = ({ nextStep }) => {
  const pawns: Pawn[] = useSelector((state: RootState) => state.pawn.pawns);
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    nextStep();
  };

  return (
    <form className="new-game-form__form" onSubmit={handleSubmit}>
      <h3 className="new-game-form__section-title">Pawn Settings</h3>

      <div className="new-game-form__pawns">
        {selectedPawn != null ? (
          <>
            <div className="new-game-form__pawns-list">
              <ul className="new-game-form__pawns-list-items">
                {pawns.map((pawn) => (
                  <li
                    key={pawn.entity.id}
                    className="new-game-form__pawns-list-item"
                    onClick={() => handlePawnClick(pawn)}
                  >
                    {pawn.infos.firstName} {pawn.infos.lastName}
                  </li>
                ))}
              </ul>
            </div>

            <div className="new-game-form__pawn-details">
              <h4 className="new-game-form__pawn-details-title">
                {selectedPawn.infos.firstName} {selectedPawn.infos.lastName}
              </h4>
              <div className="new-game-form__pawn-details-info-group">
                <div className="new-game-form__pawn-details-info-item">
                  <span className="new-game-form__pawn-details-info">
                    Biological Age: {selectedPawn.infos.biologicalAge}
                  </span>
                  <span className="new-game-form__pawn-details-info">
                    Chronological Age: {selectedPawn.infos.chronologicalAge}
                  </span>
                </div>

                <div>
                  <h5 className="new-game-form__pawn-details-subtitle">
                    Skills
                  </h5>
                  <ul className="new-game-form__pawn-details-list">
                    {Object.keys(selectedPawn.skills).map((skill) => (
                      <li
                        key={skill}
                        className="new-game-form__pawn-details-list-item"
                      >
                        {skill}: {selectedPawn.skills[skill as keyof Skills]}
                      </li>
                    ))}
                  </ul>

                  <h5 className="new-game-form__pawn-details-subtitle">
                    Traits
                  </h5>
                  <ul className="new-game-form__pawn-details-list">
                    {selectedPawn.traits.map((trait) => (
                      <li
                        key={trait}
                        className="new-game-form__pawn-details-list-item"
                      >
                        {trait}
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
            value="To Gear Settings"
          />
        </div>
      </div>
    </form>
  );
};

export default PawnSettingsForm;
