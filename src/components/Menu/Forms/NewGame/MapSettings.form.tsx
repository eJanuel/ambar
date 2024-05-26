import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../../redux/types/Store.types";
import {
  NewGameFormSteps,
  generateNewMap,
  setGameFormStep,
} from "../../../../redux/reducers/app/Menu.reducer";

import PreviewScene from "../../../Game/Three/Scenes/Preview.scene";

import { Map } from "../../../../types/Map.types";

const SIZE_MIN = 16;
const SIZE_MAX = 128;
const SIZE_STEP = 16;

const HEIGHT_MIN = 16;
const HEIGHT_MAX = 64;
const HEIGHT_STEP = 16;


const MapSettingsForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { inputs }: { inputs: { [key: string]: string | number | boolean } } =
    useSelector((state: RootState) => state.menu.newGameForm.mapForm);
  const { currentMap }: { currentMap: Map | null } = useSelector(
    (state: RootState) => state.menu.newGameForm.mapForm
  );
  const { isMapPreviewToggled }: { isMapPreviewToggled: boolean } = useSelector(
    (state: RootState) => state.menu.newGameForm.mapForm
  );

  const handleGenerateMap = () => {
    const mapSettings = {
      seed: inputs.seed as string,
      size: inputs.size as number,
      height: inputs.height as number,
    };

    dispatch(generateNewMap(mapSettings));
  };

  const handlePreviewToggle = () => {
    if (currentMap === null) {
      handleGenerateMap();
    }
    dispatch({ type: "menu/toggleMapPreview" });
  };

  useEffect(() => {
    handleGenerateMap();
  }, [inputs]);

  return (
    <>
      {isMapPreviewToggled && (
        <div className="new-game-form__preview">
          <div className="new-game-form__preview-content">
            <PreviewScene />
          </div>
          <button onClick={handleGenerateMap} className="new-game-form__button">
            Generate
          </button>
        </div>
      )}
      <form
        className="new-game-form__form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(setGameFormStep(NewGameFormSteps.NARRATOR));
        }}
      >
        <div className="new-game-form__input-group">
          <div className="new-game-form__input-group-item">
            <label className="new-game-form__label">Seed</label>
            <input
              className="new-game-form__input"
              type="text"
              value={inputs.seed as string}
              onChange={(e) =>
                dispatch({
                  type: "menu/setMapFormInputs",
                  payload: { key: "seed", value: String(e.target.value) },
                })
              }
            />
          </div>
          <div className="new-game-form__input-group-item">
            <label className="new-game-form__label">Name</label>
            <input
              className="new-game-form__input"
              type="text"
              value={inputs.name as string}
              onChange={(e) =>
                dispatch({
                  type: "menu/setMapFormInputs",
                  payload: { key: "name", value: String(e.target.value) },
                })
              }
            />
          </div>
        </div>

        <div className="new-game-form__input-group">
          <div className="new-game-form__input-group-item">
            <div className="new-game-form__input-group-item-label">
              <label className="new-game-form__label">Size </label>
              <span className="new-game-form__value">
                {inputs.size as string}
              </span>
            </div>
            <input
              className="new-game-form__input-range"
              type="range"
              min={SIZE_MIN}
              max={SIZE_MAX}
              step={SIZE_STEP}
              value={inputs.size as number}
              onChange={(e) =>
                dispatch({
                  type: "menu/setMapFormInputs",
                  payload: { key: "size", value: Number(e.target.value) },
                })
              }
            />
          </div>
          <div className="new-game-form__input-group-item">
            <div className="new-game-form__input-group-item-label">
              <label className="new-game-form__label">Height </label>
              <span className="new-game-form__value">
                {inputs.height as string}
              </span>
            </div>
            <input
              className="new-game-form__input-range"
              type="range"
              min={HEIGHT_MIN}
              max={HEIGHT_MAX}
              step={HEIGHT_STEP}
              value={inputs.height as number}
              onChange={(e) =>
                dispatch({
                  type: "menu/setMapFormInputs",
                  payload: { key: "height", value: Number(e.target.value) },
                })
              }
            />
          </div>
        </div>

        <div className="new-game-form__input-group">
          <div className="new-game-form__input-group-item">
            <label className="new-game-form__label">Preview</label>
            <input
              className="new-game-form__checkbox"
              type="checkbox"
              checked={isMapPreviewToggled}
              onChange={handlePreviewToggle}
            />
          </div>
          <input className="new-game-form__submit" type="submit" value="Next" />
        </div>
      </form>
    </>
  );
};

export default MapSettingsForm;
