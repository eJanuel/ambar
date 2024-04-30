import React from "react";
import { useSelector } from "react-redux";
import { groundTextures } from "../../../../game/helpers/Textures.helper";
import { Map } from "../../../../game/types/Map.types";
import { VOID_TYPES_ENUM } from "../../../../game/types/enums/Cells.enum";
import { RootState } from "../../../../redux/types/Store.types";
import BlockMemo from "../Geometry/Block.geometry";
import RectangularMemo from "../Geometry/Rectangular";
import * as THREE from "three";


const renderBedrock: React.FC<Map | null> = (map) => {
  if (!map) {
    return null;
  }

  const color = new THREE.Color("#2e2a2a");
  const size = map.dimensions.size * 128;
  const height = map.dimensions.height * 128;
  const depth = 128 * 3;

  return (
    <>
      <RectangularMemo
        color={color}
        width={size + depth * 2}
        height={height}
        depth={depth}
        position={[size / 2 - 64, size / 2 - 64, -(depth - 128)]} // Back Pane
      />
      <RectangularMemo
        color={color}
        width={size + depth * 2}
        height={height}
        depth={depth}
        position={[size / 2 - 64, size / 2 - 64, size + 128]} // Front Pane
      />
      <RectangularMemo
        color={color}
        width={depth}
        height={height}
        depth={size}
        position={[-(depth - 128), size / 2 - 64, size / 2 - 64]} // Left Pane
      />
      <RectangularMemo
        color={color}
        width={depth}
        height={height}
        depth={size}
        position={[size + 128, size / 2 - 64, size / 2 - 64]} // Right Pane
      />
      <RectangularMemo
        color={color}
        width={size + depth * 2}
        height={depth}
        depth={height + depth * 2}
        position={[size / 2 - 64, -(depth - 128), size / 2 - 64]} // Bottom Pane
      />
    </>
  );
};
export const MapRender: React.FC = () => {
  const map: Map | null = useSelector((state: RootState) => state.map.gridMap);
  const ref = React.useRef<THREE.Group | null>(null);
  const { size } = useSelector(
    (state: RootState) => state.map.gridMap.dimensions
  );

  return (
    <group ref={ref}>
      <group position={[-(size * 128) / 2, 0, -(size * 128) / 2]}>
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
        {renderBedrock(map)}
      </group>
    </group>
  );
};
