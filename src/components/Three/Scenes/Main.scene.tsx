import { Canvas } from "@react-three/fiber";
import React from "react";
import { useSelector } from "react-redux";
import { groundTextures } from "../../../game/logic/helpers/Textures.helper";
import { Map } from "../../../game/logic/types/Map.types";
import { RootState } from "../../../redux/types/Store.types";
import TopDownCameraControls from "../Cameras/TopDown.camera.controls";
import BlockMemo from "../Geometry/Block.geometry";
import { VOID_TYPES_ENUM } from "../../../game/logic/types/enums/Cells.enum";
import * as THREE from "three";

const MainScene: React.FC = () => {
  const map: Map | null = useSelector(
    (state: RootState) => state.menu.newGameForm.mapForm.currentMap
  );
  const mapSize = map ? map.dimensions.size : 0;
  const halfMapSize = mapSize / 2;

  const ThreeGridMap: React.FC = () => {
    const ref = React.useRef<THREE.Group | null>(null);
    const mapSize = map ? map.dimensions.size : 0;

    return (
      <group ref={ref}>
        <group position={[-(mapSize * 128) / 2, 0, -(mapSize * 128) / 2]}>
          {map !== null &&
            map.cells.map((layer, xi) => (
              <React.Fragment key={xi}>
                {layer.map((row, zi) => (
                  <React.Fragment key={zi}>
                    {row.map(({ coordinates, surface }) => {
                      if (surface.type === VOID_TYPES_ENUM.AIR) {
                        return null;
                      }
                      const { texture, color } = groundTextures[surface.type];
                      const isSurrounded = [
                        map.cells[coordinates.y - 1]?.[coordinates.x]?.[
                          coordinates.z
                        ],
                        map.cells[coordinates.y + 1]?.[coordinates.x]?.[
                          coordinates.z
                        ],
                        map.cells[coordinates.y]?.[coordinates.x - 1]?.[
                          coordinates.z
                        ],
                        map.cells[coordinates.y]?.[coordinates.x + 1]?.[
                          coordinates.z
                        ],
                        map.cells[coordinates.y]?.[coordinates.x]?.[
                          coordinates.z - 1
                        ],
                        map.cells[coordinates.y]?.[coordinates.x]?.[
                          coordinates.z + 1
                        ],
                      ].every(
                        (neighbor) =>
                          neighbor &&
                          !(neighbor.surface.type == VOID_TYPES_ENUM.AIR)
                      );

                      // Only render the block if it's not surrounded
                      return (
                        !isSurrounded && (
                          <BlockMemo
                            x={coordinates.x * 128}
                            z={coordinates.z * 128}
                            y={coordinates.y * 128}
                            texture={texture}
                            color={color}
                            key={`${coordinates.x}-${coordinates.z}-${coordinates.y}`}
                          />
                        )
                      );
                    })}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
        </group>
      </group>
    );
  };

  return (
    <>
      {map !== null && (
        <Canvas
          camera={{
            fov: 90,
            near: 0.1,
            far: 100000,
          }}
          style={{ height: "100vh" }}
        >
          <primitive object={new THREE.AxesHelper(10)} />
          <mesh>
            <boxGeometry attach="geometry" args={[5, 5, 5]} />
            <meshBasicMaterial attach="material" color="lightblue" />
          </mesh>
          <TopDownCameraControls
            zoomSpeed={0.5}
            moveSpeed={10}
            size={map.dimensions.size}
            height={map.dimensions.height}
          />

          <ambientLight intensity={2} />
          <directionalLight position={[1, 1, 1]} intensity={1} />

          <ThreeGridMap />
        </Canvas>
      )}
    </>
  );
};

export default MainScene;
