import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/types/Store.types";
import { setClock } from "../../../redux/reducers/game/Clock.reducer";

import { Canvas } from "@react-three/fiber";
import TopDownCameraControls from "../Cameras/TopDown.camera.controls";
import { MapRender } from "../Renders/Map.render";
import { PawnsRender } from "../Renders/Pawn.render";
import { SkyRender } from "../Renders/Sky.render";

import { Map } from "../../../game/logic/types/Map.types";

const MainScene: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const map: Map = useSelector((state: RootState) => state.map.worldmap);
  const { gameClock, speed, isPaused } = useSelector(
    (state: RootState) => state.clock
  );

  useEffect(() => {
    let animationFrameId: number;

    const updateClock = () => {
      if (!isPaused) {
        dispatch(setClock(gameClock + speed));
      }
      animationFrameId = requestAnimationFrame(updateClock);
    };

    animationFrameId = requestAnimationFrame(updateClock);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameClock, speed, isPaused]);

  return (
    <Canvas
      camera={{
        fov: 90,
        near: 0.1,
        far: 100000,
      }}
      style={{ height: "100vh" }}
    >
      <TopDownCameraControls
        zoomSpeed={0.5}
        moveSpeed={10}
        size={map.dimensions.size}
        height={map.dimensions.height}
      />

      <SkyRender />
      <MapRender />
      <PawnsRender />
    </Canvas>
  );
};

export default MainScene;
