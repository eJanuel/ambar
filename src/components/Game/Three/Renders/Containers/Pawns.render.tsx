import { useSelector } from "react-redux";

import { RootState } from "../../../../../redux/types/Store.types";

import PawnMemo from "../../Meshes/Pawn.geometry";

import { Pawn } from "../../../../../types/Pawn.types";

export const PawnsRender: React.FC = () => {
  const { pawns }: { pawns: Pawn[] } = useSelector(
    (state: RootState) => state.pawn
  );

  return (
    <>
      {pawns.map((pawn) => (
        <PawnMemo key={pawn.entity.id} pawn={pawn} />
      ))}
    </>
  );
};
