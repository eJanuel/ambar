import { useSelector } from "react-redux";
import { RootState } from "../../../redux/types/Store.types";

import { Sky, Stars } from "@react-three/drei";

export const SkyRender: React.FC = () => {
  const { size } = useSelector(
    (state: RootState) => state.map.worldmap.dimensions
  );

  return (
    <>
      <Sky distance={450000} inclination={0.6} azimuth={0.25} rayleigh={0.1} />
      <Stars
        radius={(size * 256) * 2}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
    </>
  );
};
