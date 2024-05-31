import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../redux/types/Store.types";
import {
  setDisplayedLayer,
  setLayerOpacity,
} from "../../../redux/reducers/game/UI.reducer";
import { KbArrowDoubleUpIcon } from "../../Icons/UI/KbArrowDoubleUp.icon";
import { KbArrowUpIcon } from "../../Icons/UI/KbArrowUp.icon";
import { KbArrowDownIcon } from "../../Icons/UI/KbArrowDown.icon";
import { KbArrowDoubleDownIcon } from "../../Icons/UI/KbArrowDoubleDown.icon";

export const LayerBarUI: React.FC<{ display: "row" | "column" }> = ({
  display,
}) => {
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
    <div id="ui-layerBar" className={`ui--item__container item__${display}`}>
      <div className="layerBar--displayed">
        <KbArrowDoubleUpIcon
          onClick={() => handleLayerChange(displayed + 10)}
        />
        <KbArrowUpIcon onClick={() => handleLayerChange(displayed + 1)} />
        <span>{displayed}</span>
        <KbArrowDownIcon onClick={() => handleLayerChange(displayed - 1)} />
        <KbArrowDoubleDownIcon
          onClick={() => handleLayerChange(displayed - 10)}
        />
      </div>

      <div className="layerBar--opacity">
        <input
          type="range"
          min={0}
          max={100}
          value={opacity}
          onChange={(e) => handleOpacityChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
};
