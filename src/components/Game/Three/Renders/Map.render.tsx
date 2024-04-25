import React from "react";
import { useSelector } from "react-redux";
import { groundTextures } from "../../../../game/helpers/Textures.helper";
import { Map } from "../../../../game/types/Map.types";
import { VOID_TYPES_ENUM } from "../../../../game/types/enums/Cells.enum";
import { RootState } from "../../../../redux/types/Store.types";
import BlockMemo from "../Geometry/Block.geometry";

export const MapRender: React.FC = () => {
  const map: Map | null = useSelector((state: RootState) => state.map.gridMap);
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
