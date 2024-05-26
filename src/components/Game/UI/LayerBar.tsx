import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../redux/types/Store.types";
import {
  setDisplayedLayer,
  setLayerOpacity,
} from "../../../redux/reducers/game/UI.reducer";


export const LayerBarUI: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { opacity, displayed }: { opacity: number; displayed: number } =
    useSelector((state: RootState) => state.ui.layers);

  const handleLayerChange = (layer: number) => {
    dispatch(setDisplayedLayer(layer));
  };

  const handleOpacityChange = (opacity: number) => {
    dispatch(setLayerOpacity(opacity));
  };

  return (
    <div id="ui-layerBar" className="UI--layerBar">
      <div className="UI--layerBar--title">Displayed Layer</div>
      <div className="UI--layerBar--layer">{displayed}</div>

      <button
        className="UI--layerBar--button"
        onClick={() => handleLayerChange(displayed + 1)}
      >
        +
      </button>
      <button
        className="UI--layerBar--button"
        onClick={() => handleLayerChange(displayed - 1)}
      >
        -
      </button>
      <input
        type="range"
        min={0}
        max={100}
        value={opacity}
        onChange={(e) => handleOpacityChange(Number(e.target.value))}
      />
    </div>
  );
};
