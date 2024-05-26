import { ThreeEvent, useThree } from "@react-three/fiber";
import { FC, memo, useRef } from "react";
import * as THREE from "three";

interface BlockMemoProps {
  position: { x: number; y: number; z: number };
  properties: {
    size: number;
    // texture?: THREE.Texture;
    color?: THREE.Color;
    isTransparent?: boolean;
  };
}

const BlockMemo: FC<BlockMemoProps> = memo(
  ({
    position: { x, y, z },
    properties: { size, color, isTransparent },
  }: BlockMemoProps) => {
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
        console.log(x * size, z * size, y * size);
      }
    };

    return (
      <mesh
        ref={meshRef}
        position={[x * size, y * size * 2, z * size]}
        scale={[1, 1, 1]}
        onClick={handleBlockClick}
      >
        <boxGeometry args={[size, size * 2, size]} />
        <meshStandardMaterial
          // map={texture}
          color={color}
          transparent={isTransparent}
          opacity={isTransparent ? 0 : 1}
        />
      </mesh>
    );
  }
);

export default BlockMemo;
