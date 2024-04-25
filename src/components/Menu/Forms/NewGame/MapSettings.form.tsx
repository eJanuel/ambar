import { Map } from "../../../../game/types/Map.types";
import PreviewScene from "../../../Game/Three/Scenes/Preview.scene";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/types/Store.types";
import { generateNewMap } from "../../../../redux/reducers/app/Menu.reducer";

const SIZE_MIN = 16;
const SIZE_MAX = 256;
const SIZE_STEP = 16;

const HEIGHT_MIN = 16;
const HEIGHT_MAX = 128;
const HEIGHT_STEP = 16;

enum BIOME {
  SWAMP = "swamp",
  FOREST = "forest",
  PLAINS = "plains",
  VALLEY = "valley",
}

type MapSettingsFormProps = {
  nextStep: () => void;
};

const MapSettingsForm: React.FC<MapSettingsFormProps> = ({ nextStep }) => {
  const dispatch = useDispatch<AppDispatch>();
  const inputs: { [key: string]: string | number | boolean } = useSelector(
    (state: RootState) => state.menu.newGameForm.mapForm.inputs
  );
  const map: Map | null = useSelector(
    (state: RootState) => state.menu.newGameForm.mapForm.currentMap
  );
  const preview: boolean = useSelector(
    (state: RootState) => state.menu.newGameForm.mapForm.isMapPreviewToggled
  );

  const handleGenerateMap = () => {
    const mapSettings = {
      seed: inputs.seed as string,
      name: inputs.name as string,
      size: inputs.size as number,
      height: inputs.height as number,
      biome: inputs.biome as string,
      caves: inputs.caves as boolean,
      structures: inputs.structures as boolean,
    };

    dispatch(generateNewMap(mapSettings));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    nextStep();
  };

  const handlePreviewToggle = () => {
    if (map === null) {
      handleGenerateMap();
    }
    dispatch({ type: "menu/toggleMapPreview" });
  };

  return (
    <>
      {preview && (
        <div className="new-game-form__preview">
          <div className="new-game-form__preview-content">
            <PreviewScene map={map} />
          </div>
          <button
            onClick={handleGenerateMap}
            className="new-game-form__button"
          >
            Generate
          </button>
        </div>
      )}
      <form className="new-game-form__form" onSubmit={handleSubmit}>
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
            <label className="new-game-form__label">Biome</label>
            <select
              className="new-game-form__select"
              value={inputs.biome as string}
              onChange={(e) =>
                dispatch({
                  type: "menu/setMapFormInputs",
                  payload: { key: "biome", value: String(e.target.value) },
                })
              }
            >
              <option value={BIOME.SWAMP}>Swamp</option>
              <option value={BIOME.FOREST}>Forest</option>
              <option value={BIOME.PLAINS}>Plains</option>
              <option value={BIOME.VALLEY}>Valley</option>
            </select>
          </div>
          <div className="new-game-form__input-group-item">
            <label className="new-game-form__label">Caves</label>
            <input
              className="new-game-form__checkbox"
              type="checkbox"
              checked={inputs.caves as boolean}
              onChange={(e) =>
                dispatch({
                  type: "menu/setMapFormInputs",
                  payload: { key: "caves", value: Boolean(e.target.checked) },
                })
              }
            />
          </div>
          <div className="new-game-form__input-group-item">
            <label className="new-game-form__label">Structures</label>
            <input
              className="new-game-form__checkbox"
              type="checkbox"
              checked={inputs.structures as boolean}
              onChange={(e) =>
                dispatch({
                  type: "menu/setMapFormInputs",
                  payload: {
                    key: "structures",
                    value: Boolean(e.target.checked),
                  },
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
              checked={preview}
              onChange={handlePreviewToggle}
            />
          </div>
          <input
            className="new-game-form__submit"
            type="submit"
            value="Next"
          />
        </div>
      </form>
    </>
  );
};

export default MapSettingsForm;
