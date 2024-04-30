import React, { memo } from "react";
import * as THREE from "three";

type RectangularProps = {
  color: THREE.Color;
  width: number;
  height: number;
  depth: number;
  position: [number, number, number];
  rotation?: [number, number, number];
};

const RectangularMemo: React.FC<RectangularProps> = memo(
  ({ color, width, height, depth, position, rotation = [0, 0, 0] }) => {
    const euler = new THREE.Euler(rotation[0], rotation[1], rotation[2], "XYZ");

    return (
      <mesh position={position} rotation={euler}>
        <boxGeometry args={[width, height, depth]} />
        <meshBasicMaterial color={color} />
      </mesh>
    );
  }
);

export default RectangularMemo;
