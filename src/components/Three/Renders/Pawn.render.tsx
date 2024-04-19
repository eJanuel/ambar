import { useSelector } from "react-redux";
import { Pawn } from "../../../game/logic/types/Pawn.types";
import { RootState } from "../../../redux/types/Store.types";
import { Vector3 } from "three";
import { useState } from "react";
import { Map } from "../../../game/logic/types/Map.types";

export const PawnsRender: React.FC = () => {
  const pawns: Pawn[] = useSelector((state: RootState) => state.pawn.pawns);

  return (
    <>
      {pawns.map((pawn) => (
        <PawnRender key={pawn.entity.id} pawn={pawn} />
      ))}
    </>
  );
};

interface PawnProps {
  pawn: Pawn;
}

const PawnRender: React.FC<PawnProps> = ({ pawn }) => {
	const map: Map = useSelector((state: RootState) => state.map.worldmap); //TODO: Fix this to geet the correct pawn y position at generation
  const [selected, setSelected] = useState(false);

  const handlePawnClick = () => {
    setSelected(true);
  };

  return (
    <mesh
      position={
        new Vector3(
          pawn.entity.position.x,
          128 * map.dimensions.height,
          pawn.entity.position.z
        )
      }
      onClick={() => handlePawnClick()}
    >
      <sphereGeometry attach="geometry" args={[256, 512, 512]} />
      <meshBasicMaterial attach="material" color={selected ? "red" : "blue"} />
    </mesh>
  );
};
