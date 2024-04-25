import { useSelector } from "react-redux";
import { Pawn } from "../../../../game/types/Pawn.types";
import { RootState } from "../../../../redux/types/Store.types";
import { Vector3 } from "three";
import { useRef, useState } from "react";
import { Map } from "../../../../game/types/Map.types";
import { Box } from "@react-three/drei";
import * as THREE from "three";
import { ThreeEvent, useThree } from "@react-three/fiber";

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
  const map: Map = useSelector((state: RootState) => state.map.gridMap); //TODO: Fix this to geet the correct pawn y position at generation
  const [selected, setSelected] = useState(false);

  const meshRef = useRef<THREE.Mesh>(null);

  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);

  const handlePawnClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation(); // Prevents the event from bubbling up to other objects

    // Create a raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Translate page coords to element coords
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Set the picking ray from the camera position and mouse coordinates
    raycaster.setFromCamera(mouse, camera);

    // Get the list of objects the ray intersected
    const intersectedObjects = raycaster.intersectObjects(scene.children);

    // If the closest object is the pawn, handle the click
    if (
      intersectedObjects.length > 0 &&
      intersectedObjects[0].object === meshRef.current
    ) {
      setSelected(true);
      console.log(pawn);
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={
        new Vector3(
          pawn.entity.position.x,
          (256 * map.dimensions.height) / 2,
          pawn.entity.position.z
        )
      }
      onClick={(event) => handlePawnClick(event)}
    >
      <boxGeometry attach="geometry" args={[128, 256, 128]} />
      <meshBasicMaterial attach="material" color={selected ? "red" : "blue"} />
    </mesh>
  );
};
