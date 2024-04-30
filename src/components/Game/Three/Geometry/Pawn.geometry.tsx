import { useEffect, useRef, useState } from "react";

import * as THREE from "three";
import { memo } from "react";
import { GLTFLoader, GLTF } from "three/examples/jsm/Addons.js";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";

import { Pawn } from "../../../../game/types/Pawn.types";

interface PawnProps {
  pawn: Pawn;
}

const isParentShared = (object: THREE.Object3D, ref: THREE.Object3D) => {
  while (ref) {
    if (ref.parent === null) break;
    ref = ref.parent;
  }
  while (object) {
    if (object === ref) {
      return true;
    }
    if (object.parent === null) return false;
    object = object.parent;
  }
  return false;
};

const PawnMemo: React.FC<PawnProps> = memo(({ pawn }: PawnProps) => {
  const [selected, setSelected] = useState(false);
  const meshRef = useRef<THREE.Mesh>();
  const mixerRef = useRef<THREE.AnimationMixer>();

  // Create a state to store the GLTF model data
  const [model, setModel] = useState<GLTF>();

  // Load the GLTF model
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("src/game/models/RobotExpressive.glb", setModel);
  }, []);

  useEffect(() => {
    if (model) {
      model.scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          meshRef.current = object;
        }
      });
      mixerRef.current = new THREE.AnimationMixer(model.scene);
      const action = mixerRef.current.clipAction(model.animations[0]);
      action.play();
    }
  }, [model]);

  useFrame((_state, delta) => mixerRef.current?.update(delta));

  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);

  const handlePawnClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersectedObjects = raycaster.intersectObjects(scene.children);

    if (
      intersectedObjects.length > 0 &&
      meshRef.current?.parent &&
      isParentShared(intersectedObjects[0].object, meshRef.current.parent)
    ) {
      setSelected(true);
      console.log(pawn);
    }
  };

  return model ? (
    <primitive
      object={model.scene}
      scale={[20, 20, 20]}
      position={pawn.entity.position}
      onClick={(event: ThreeEvent<MouseEvent>) => handlePawnClick(event)}
    />
  ) : null;
});

export default PawnMemo;
