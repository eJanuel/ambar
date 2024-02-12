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

const BlockMemo: React.FC<BlockProps> = memo(({ x, z, y, texture, color }: BlockProps) => {
  return (
    <mesh position={[x, y, z]} scale={[1, 1, 1]}>
      <boxGeometry args={[128, 128, 128]} />
      <meshStandardMaterial map={texture} color={color} />
    </mesh>
  );
});

export default BlockMemo;
