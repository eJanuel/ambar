import { useSelector } from "react-redux";
import { Sky, Sphere, Stars } from "@react-three/drei";
import { Vector3 } from "three";

import { RootState } from "../../../../../redux/types/Store.types";

export const SkyRender: React.FC = () => {
  const { gameClock }: { gameClock: number } = useSelector(
    (state: RootState) => state.clock
  );
  const { size }: { size: number } = useSelector(
    (state: RootState) => state.map.gridMap.dimensions
  );

  // Calculate the angle of rotation based on the current time
  const angle = (gameClock / 72000) * 360 - 105;
  const distance = 16000 + size * 256;

  // Calculate the positions of the sun and the moon
  const sunPosition = calculatePosition(angle, distance);
  const moonPosition = calculatePosition(angle + 180, distance);
  const sunVector = new Vector3(sunPosition.x, sunPosition.y, 0);
  return (
    <>
      <ambientLight intensity={0.1} />
      <Sun position={sunPosition} distance={distance} />
      <Moon position={moonPosition} distance={distance} />
      <Sky
        distance={distance * 8}
        sunPosition={sunVector}
        turbidity={45}
        rayleigh={0}
        mieCoefficient={0.005}
      />
      <Stars
        radius={distance}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
    </>
  );
};

function calculatePosition(angle: number, distance: number) {
  const radians = (angle / 360) * 2 * Math.PI;
  return {
    x: distance * Math.cos(radians),
    y: distance * Math.sin(radians),
  };
}

const Sun: React.FC<{
  position: { x: number; y: number };
  distance: number;
}> = ({ position, distance }) => {
  const intensity = position.y > 0 ? distance * 10000 : 5;
  return (
    <>
      <Sphere position={[position.x, position.y, 0]} args={[2048]}>
        <meshStandardMaterial
          color={"red"}
          emissive="red"
          emissiveIntensity={intensity}
        />
      </Sphere>
      <spotLight
        color="white"
        position={[position.x, position.y, 0]}
        intensity={intensity}
      />
    </>
  );
};

const Moon: React.FC<{
  position: { x: number; y: number };
  distance: number;
}> = ({ position, distance }) => {
  const intensity = position.y > 0 ? distance * 10000 : 1;
  return (
    <>
      <Sphere position={[position.x, position.y, 0]} args={[1024]}>
        <meshStandardMaterial
          color={"lightgray"}
          emissive="lightgray"
          emissiveIntensity={intensity}
        />
      </Sphere>
      <spotLight
        color="lightgray"
        position={[position.x, position.y, 0]}
        intensity={intensity}
      />
    </>
  );
};
