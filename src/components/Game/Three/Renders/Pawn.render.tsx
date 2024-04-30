import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/types/Store.types";

import { Pawn } from "../../../../game/types/Pawn.types";
import PawnMemo from "../Geometry/Pawn.geometry";

export const PawnsRender: React.FC = () => {
  const pawns: Pawn[] = useSelector((state: RootState) => state.pawn.pawns);
  return (
    <>
      {pawns.map((pawn) => (
        <PawnMemo key={pawn.entity.id} pawn={pawn} />
      ))}
    </>
  );
};
