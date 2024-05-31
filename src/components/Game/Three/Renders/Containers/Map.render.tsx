import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as THREE from "three";

import { AppDispatch, RootState } from "../../../../../redux/types/Store.types";

import HorizontalLayer from "./HorizontalLayer.render";

import { Map } from "../../../../../types/Map.types";
import { setDisplayedLayer } from "../../../../../redux/reducers/game/UI.reducer";

export const MapRender: React.FC<{ map: Map }> = memo(
  ({ map }) => {
    const dispatch = useDispatch<AppDispatch>();
    const ref = useRef<THREE.Group | null>(null);

    const { size, height } = useSelector(
      (state: RootState) => state.map.gridMap.dimensions
    );

    useEffect(() => {
      dispatch(setDisplayedLayer(height));
    }, [dispatch]);

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
