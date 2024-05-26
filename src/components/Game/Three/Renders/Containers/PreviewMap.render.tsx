import { FC, useRef } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import { RootState } from "../../../../../redux/types/Store.types";

import { Map } from "../../../../../types/Map.types";
import { groundTextures } from "../../../../../helpers/game/Textures.helper";

export const PreviewMapRender: FC = () => {
  const { currentMap }: { currentMap: Map | null } = useSelector(
    (state: RootState) => state.menu.newGameForm.mapForm
  );

  const ref = useRef<THREE.Group | null>(null);
  const mapSize = currentMap ? currentMap.dimensions.size : 0;
  const mapHeight = currentMap ? currentMap.dimensions.height : 0;
  const speed = 0.5;

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = ref.current.rotation.y =
        clock.getElapsedTime() * speed;
    }
  });

  const PreviewLayers: FC = () => {
    return currentMap !== null
      ? currentMap?.cells.getVerticalLayers().map((layer, y) => (
          <mesh key={y} position={[0, y * 256, 0]}>
            <boxGeometry
              args={[
                currentMap.dimensions.size * 128,
                256,
                currentMap.dimensions.size * 128,
              ]}
            />
            <meshStandardMaterial
              color={groundTextures[layer[0].surface.type].color}
            />
          </mesh>
        ))
      : null;
  };

  return (
    <group>
      <group
        ref={ref}
        position={[
          -((mapSize * 128) / 2),
          -((mapHeight * 256) / 2),
          -((mapSize * 128) / 2),
        ]}
      >
        <PreviewLayers />
      </group>
    </group>
  );
};
