import { ThreeEvent, useThree } from "@react-three/fiber";
import { FC, memo, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { AppDispatch, RootState } from "../../../../../redux/types/Store.types";
import { useDispatch, useSelector } from "react-redux";
import { setTargetPosition } from "../../../../../redux/reducers/game/Pawn.reducer";
import { setHoveredObject } from "../../../../../redux/reducers/game/UI.reducer";
import { Outlines } from "@react-three/drei";

interface BlockMemoProps {
  position: { x: number; y: number; z: number };
  properties: {
    size: number;
    // texture?: THREE.Texture;
    color?: THREE.Color;
    isTransparent?: boolean;
  };
  hovered: boolean;
}

const BlockMemo: FC<BlockMemoProps> = memo(
  ({
    position: { x, y, z },
    properties: { size, color, isTransparent },
    hovered,
  }: BlockMemoProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const {
      selectedObjects
    }: { selectedObjects: string[] } = useSelector(
      (state: RootState) => state.ui
    );
    // const { width, height, depth } = { width: 128, height: 256, depth: 128 };
    const meshRef = useRef<THREE.Mesh>(null);
    const { scene, camera } = useThree();

    const handleBlockClick = (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersectedObjects = raycaster.intersectObjects(scene.children);

      if (
        intersectedObjects.length > 0 &&
        meshRef.current === intersectedObjects[0].object
      ) {
        if (event.button === 2 && selectedObjects.length > 0) {
          selectedObjects.forEach((id) => {
            dispatch(setTargetPosition({ pawnId: id, position: { x, y, z } }));
          });
        }
      }
    };

    const handleMouseOn = () => {
      dispatch(setHoveredObject(`block#${x}-${y}-${z}`));
    };

    useEffect(() => {
      console.log("rendered");
    }, []);

    return (
      <mesh
        onPointerEnter={handleMouseOn}
        ref={meshRef}
        position={[x * size, y * size * 2, z * size]}
        scale={[1, 1, 1]}
        onClick={handleBlockClick}
        onContextMenu={handleBlockClick}
      >
        <boxGeometry args={[size, size * 2, size]} />
        <meshStandardMaterial
          color={color}
          transparent={isTransparent}
          opacity={isTransparent ? 0 : 1}
        />
        <Outlines visible={hovered} color="#ffffff" thickness={10} />
      </mesh>
    );
  }
);

export default BlockMemo;
