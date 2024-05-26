import React, { memo, useRef } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";

import { RootState } from "../../../../../redux/types/Store.types";

import HorizontalLayer from "./HorizontalLayer.render";

import { Map } from "../../../../../types/Map.types";


export const MapRender: React.FC<{ map: Map }> = memo(
  ({ map }) => {
    const ref = useRef<THREE.Group | null>(null);

    const { size } = useSelector(
      (state: RootState) => state.map.gridMap.dimensions
    );

    return (
      <group ref={ref}>
        <group position={[-(size * 128) / 2, 0, -(size * 128) / 2]}>
          {map.cells.getVerticalLayers().map((layer, index) => (
            <HorizontalLayer key={index} index={index} cells={layer} />
          ))}
        </group>
      </group>
    );
  },
  (prevProps, nextProps) => prevProps.map === nextProps.map
);
