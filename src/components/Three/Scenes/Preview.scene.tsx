import { Canvas, useFrame } from "@react-three/fiber";
import React from "react";
import { groundTextures } from "../../../utils/helpers/Textures.helper";
import { Map } from "../../../utils/types/Map.types";
import PreviewCamera from "../Cameras/Preview.camera";
import BlockMemo from "../Geometry/Block.geometry";
import { VOID_TYPES_ENUM } from "../../../utils/types/enums/Cells.enum";

interface PreviewSceneProps {
  map: Map | null;
}

const PreviewScene: React.FC<PreviewSceneProps> = ({ map }) => {
  const ThreeGridMap: React.FC = () => {
    const ref = React.useRef<THREE.Group | null>(null);
    const mapSize = map ? map.dimensions.size : 0;
    const speed = 0.5;

    useFrame(({ clock }) => {
      if (ref.current) {
        ref.current.rotation.y = ref.current.rotation.y =
          clock.getElapsedTime() * speed;
      }
    });

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
                        (neighbor) => neighbor && !(neighbor.surface.type == VOID_TYPES_ENUM.AIR)
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
          style={{ height: "30vh", width: "30vh", background: "#ffffff64" }}
        >
          <PreviewCamera
            size={map.dimensions.size}
            height={map.dimensions.height}
          />

          <ambientLight intensity={0.2} />
          <directionalLight position={[1, 1, 1]} intensity={1} />

          <ThreeGridMap />
        </Canvas>
      )}
    </>
  );
};

export default PreviewScene;
