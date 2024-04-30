import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/types/Store.types";
import { setClock } from "../../../../redux/reducers/game/Clock.reducer";

import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

import { MapRender } from "../Renders/Map.render";
import { PawnsRender } from "../Renders/Pawn.render";
import { SkyRender } from "../Renders/Sky.render";


const MainScene: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
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
        far: 524288,
        position: [4096, 4096, 4096],
      }}
      style={{ height: "100vh" }}
    >
      <color attach="background" args={["black"]} />
      <CameraControls />

      <SkyRender />
      <MapRender />
      <PawnsRender />
    </Canvas>
  );
};

export default MainScene;
