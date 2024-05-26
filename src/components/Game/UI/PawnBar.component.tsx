import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../redux/types/Store.types";

import { Pawn } from "../../../types/Pawn.types";


export const PawnBarUI: React.FC = () => {
  const { pawns }: { pawns: Pawn[] } = useSelector(
    (state: RootState) => state.pawn
  );

  return (
    <div id="ui-pawnBar" className="UI--pawnBar">
      {pawns.map((pawn) => (
        <div key={pawn.entity.id} className="UI--pawnBar__item">
          <img
            src="https://placehold.co/60x60"
            alt="Pawn avatar"
            className="UI--pawnBar__item-avatar"
          />
          <p className="UI--pawnBar__item-name">
            {pawn.infos.firstName} {pawn.infos.lastName}
          </p>
          <progress
            value={Math.random() * 100}
            max="100"
            className="UI--pawnBar__item-progress"
          ></progress>
        </div>
      ))}
    </div>
  );
};
