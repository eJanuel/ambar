import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../redux/types/Store.types";

import { Pawn } from "../../../types/Pawn.types";

export const PawnBarUI: React.FC<{ display: "row" | "column" }> = ({
  display,
}) => {
  const { pawns }: { pawns: Pawn[] } = useSelector(
    (state: RootState) => state.pawn
  );

  return (
    <div id="ui-pawnBar" className={`ui--item__container item__${display}`}>
      {pawns.map((pawn) => (
        <div key={pawn.entity.id} className="pawnBar__item">
          <img
            src="https://placehold.co/30x60"
            alt="Pawn avatar"
            className="item-avatar"
          />
          <span className="ui--pawnBar__item-name">{pawn.infos.firstName}</span>
          <progress
            value={Math.random() * 100}
            max="100"
            className="item-healthBar"
          ></progress>
        </div>
      ))}
    </div>
  );
};
