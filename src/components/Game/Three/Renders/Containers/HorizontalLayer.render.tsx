import { Fragment } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../../../redux/types/Store.types";

import BlockMemo from "../Individuals/Block.memo";
import LayerMemo from "../Individuals/Layer.memo";

import { MapCell } from "../../../../../types/Map.types";
import { VOID_TYPES_ENUM } from "../../../../../types/enums/Cells.enum";
import { groundTextures } from "../../../../../helpers/game/Textures.helper";

const HorizontalLayer: React.FC<{ index: number; cells: MapCell[] }> = ({
  index,
  cells,
}) => {
  const { displayed }: { displayed: number } = useSelector(
    (state: RootState) => state.ui.layers
  );
  const { size }: { size: number } = useSelector(
    (state: RootState) => state.map.gridMap.dimensions
  );
  const { hoveredObject }: { hoveredObject: string } = useSelector(
    (state: RootState) => state.ui
  );

  return (
    <Fragment key={index}>
      {displayed === index + 1 ? (
        cells.map(({ coordinates, surface }) => {
          if (surface.type === VOID_TYPES_ENUM.AIR) {
            return (
              <BlockMemo
                hovered={
                  hoveredObject ===
                  `block#${coordinates.x}-${coordinates.y}-${coordinates.z}`
                }
                key={`${coordinates.x}-${coordinates.y}-${coordinates.z}`}
                position={{
                  x: coordinates.x,
                  y: coordinates.y,
                  z: coordinates.z,
                }}
                properties={{
                  size: 128,
                  isTransparent: true,
                }}
              />
            );
          }
          const { color } = groundTextures[surface.type];

          return (
            <BlockMemo
              key={`${coordinates.x}-${coordinates.y}-${coordinates.z}`}
              hovered={
                hoveredObject ===
                `block#${coordinates.x}-${coordinates.y}-${coordinates.z}`
              }
              position={{
                x: coordinates.x,
                y: coordinates.y,
                z: coordinates.z,
              }}
              properties={{ size: 128, color }}
            />
          );
        })
      ) : (
        <LayerMemo
          texture={{
            map: groundTextures[cells[0].surface.type].texture,
            color: groundTextures[cells[0].surface.type].color,
          }}
          position={{ y: index }}
          properties={{
            dimensions: {
              size: 128 * size,
              height: 256,
            },
            isTransparent: displayed < index + 1,
          }}
        />
      )}
    </Fragment>
  );
};

export default HorizontalLayer;
