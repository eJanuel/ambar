import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Canvas } from "@react-three/fiber";
import { CameraControls, Stats } from "@react-three/drei";

import { AppDispatch, RootState } from "../../../../redux/types/Store.types";
import { setClock } from "../../../../redux/reducers/game/Clock.reducer";

import { MapRender } from "../Renders/Containers/Map.render";
import { PawnsRender } from "../Renders/Containers/Pawns.render";
import { SkyRender } from "../Renders/Containers/Sky.render";

import { Map } from "../../../../types/Map.types";


const MainScene: React.FC = () => {
  const { gridMap }: { gridMap: Map } = useSelector(
    (state: RootState) => state.map
  );
  const { gameClock, speed, isPaused } = useSelector(
    (state: RootState) => state.clock
  );
  const dispatch = useDispatch<AppDispatch>();

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
        far: 524288,
        position: [4096, 4096, 4096],
      }}
      style={{ height: "100vh" }}
    >
      <color attach="background" args={["black"]} />
      <CameraControls />
      <Stats />

      <SkyRender />
      <MapRender map={gridMap} />
      <PawnsRender />
    </Canvas>
  );
};

export default MainScene;
