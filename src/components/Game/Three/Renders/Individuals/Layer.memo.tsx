import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as THREE from "three";
import { ThreeEvent, useThree } from "@react-three/fiber";

import { AppDispatch, RootState } from "../../../../../redux/types/Store.types";
import {
  setDisplayedLayer,
  setHoveredObject,
} from "../../../../../redux/reducers/game/UI.reducer";


interface LayerMemoProps {
  position: { y: number };
  properties: {
    dimensions: { size: number; height: number };
    isTransparent?: boolean;
  };
  texture: { map: THREE.Texture; color: THREE.Color };
}

const LayerMemo: React.FC<LayerMemoProps> = memo(
  ({
    texture,
    position: { y },
    properties: { dimensions, isTransparent = false },
  }: LayerMemoProps) => {
    const { opacity }: { opacity: number } = useSelector(
      (state: RootState) => state.ui.layers
    );
    const {
      hoveredObject,
      isCtrlModifierPressed,
    }: { hoveredObject: string; isCtrlModifierPressed: boolean } = useSelector(
      (state: RootState) => state.ui
    );
    const dispatch = useDispatch<AppDispatch>();
    const meshRef = useRef<THREE.Mesh>(null);
    const { scene, camera } = useThree();
    const [color, setColor] = useState(texture.color);

    const handleClick = (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersectedObjects = raycaster.intersectObjects(scene.children);

      if (
        intersectedObjects.length > 0 &&
        meshRef.current === intersectedObjects[0].object &&
        isCtrlModifierPressed
      ) {
        dispatch(setDisplayedLayer(y));
      }
    };

    const handleMouseOn = (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersectedObjects = raycaster.intersectObjects(scene.children);

      if (
        intersectedObjects.length > 0 &&
        meshRef.current === intersectedObjects[0].object &&
        isCtrlModifierPressed
      ) {
        dispatch(setHoveredObject("layer#" + y));
      }
    };

    useEffect(() => {
      if (hoveredObject === "layer#" + y) {
        setColor(new THREE.Color(0x0000ff));
      } else {
        setColor(texture.color);
      }
    }, [hoveredObject]);

    useEffect(() => {
      if (meshRef.current) {
        const material = meshRef.current.material as THREE.MeshStandardMaterial;
        material.transparent = isTransparent;
        material.opacity = isTransparent ? opacity / 100 : 1;
        material.needsUpdate = true;
      }
    }, [isTransparent, opacity]);

    return (
      <mesh
        ref={meshRef}
        position={[
          dimensions.size / 2 - 64,
          y * dimensions.height,
          dimensions.size / 2 - 64,
        ]}
        scale={[1, 1, 1]}
        onClick={handleClick}
        onPointerEnter={handleMouseOn}
      >
        <boxGeometry
          args={[dimensions.size, dimensions.height, dimensions.size]}
        />
        <meshStandardMaterial
          // map={texture.map} //TODO: Fix texture
          color={color}
          transparent={isTransparent}
          opacity={isTransparent ? opacity / 100 : 1}
        />
      </mesh>
    );
  },
  (prevProps, nextProps) =>
    prevProps.properties.isTransparent === nextProps.properties.isTransparent
);

export default LayerMemo;
