import React from "react";
import { useSelector } from "react-redux";
import { Canvas } from "@react-three/fiber";

import { PreviewMapRender } from "../Renders/Containers/PreviewMap.render";
import PreviewCamera from "../Cameras/Preview.camera";

import { RootState } from "../../../../redux/types/Store.types";
import { Map } from "../../../../types/Map.types";


const PreviewScene: React.FC = () => {
  const { currentMap }: { currentMap: Map | null } = useSelector(
    (state: RootState) => state.menu.newGameForm.mapForm
  );

  return (
    <>
      {currentMap !== null && (
        <Canvas
          camera={{
            fov: 90,
            far: 524288,
          }}
          style={{ height: "30vh", width: "30vh", background: "#ffffff64" }}
        >
          <color attach="background" args={["black"]} />
          <PreviewCamera
            size={currentMap.dimensions.size}
            height={currentMap.dimensions.height * 2}
          />

          <ambientLight intensity={0.2} />
          <directionalLight position={[1, 1, 1]} intensity={1} />

          <PreviewMapRender />
        </Canvas>
      )}
    </>
  );
};

export default PreviewScene;
