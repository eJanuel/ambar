import { ThreeEvent, useThree } from "@react-three/fiber";
import { memo } from "react";
import React from "react";
import * as THREE from "three";

interface BlockProps {
  x: number;
  z: number;
  y: number;
  texture: THREE.Texture;
  color: THREE.Color;
}

const BlockMemo: React.FC<BlockProps> = memo(
  ({ x, z, y, texture, color }: BlockProps) => {
    const meshRef = React.useRef<THREE.Mesh>(null);
    const scene = useThree((state) => state.scene);
    const camera = useThree((state) => state.camera);

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
        console.log(x, z, y, texture);
      }
    };

    return (
      <mesh
        ref={meshRef}
        position={[x, y, z]}
        scale={[1, 1, 1]}
        onClick={(event: ThreeEvent<MouseEvent>) => handleBlockClick(event)}
      >
        <boxGeometry args={[128, 128, 128]} />
        <meshStandardMaterial map={texture} color={color} />
      </mesh>
    );
  }
);

export default BlockMemo;
