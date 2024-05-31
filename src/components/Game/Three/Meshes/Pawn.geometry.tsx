import { useEffect, useRef, useState } from "react";

import * as THREE from "three";
import { memo } from "react";
import { GLTFLoader, GLTF } from "three/examples/jsm/Addons.js";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";

import { Pawn } from "../../../../types/Pawn.types";
import { AppDispatch, RootState } from "../../../../redux/types/Store.types";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedObject,
  removeSelectedObject,
  setSelectedObjects,
} from "../../../../redux/reducers/game/UI.reducer";
import {
  setAction,
  setTargetPosition,
  updatePawn,
} from "../../../../redux/reducers/game/Pawn.reducer";
import { ACTIONS_ENUM } from "../../../../types/enums/Actions.enums";

interface PawnProps {
  pawn: Pawn;
}

const PawnMemo: React.FC<PawnProps> = memo(({ pawn }: PawnProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    selectedObjects,
    isShiftModifierPressed,
  }: { selectedObjects: string[]; isShiftModifierPressed: boolean } =
    useSelector((state: RootState) => state.ui);
  const { gameClock, speed }: { gameClock: number; speed: number } =
    useSelector((state: RootState) => state.clock);
  const [selected, setSelected] = useState(false);
  const [distance, setDistance] = useState(0);
  const [animations, setAnimations] =
    useState<{ key: string; clip: THREE.AnimationClip }[]>();
  const mixerRef = useRef<THREE.AnimationMixer>();
  const [model, setModel] = useState<GLTF>();
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const assetLoader = new GLTFLoader();
    assetLoader.load("src/models/pawn_animated.glb", setModel);
  }, []);

  useEffect(() => {
    if (model) {
      setAnimations(model.animations.map((clip) => ({ key: clip.name, clip })));
    }
  }, [model]);

  useEffect(() => {
    if (animations && model) {
      mixerRef.current = new THREE.AnimationMixer(model.scene);
    }
  }, [animations]);

  useEffect(() => {
    if (pawn.entity.targetPosition) {
      if (meshRef.current) {
        console.log("pawn.entity.position", pawn.entity.position);
        console.log("pawn.entity.targetPosition", pawn.entity.targetPosition);
        dispatch(
          updatePawn({
            ...pawn,
            entity: { ...pawn.entity, action: ACTIONS_ENUM.IDLE, position: pawn.entity.targetPosition, targetPosition: undefined},
          })
        );
        // const dx = pawn.entity.targetPosition.x * 128 - pawn.entity.position.x;
        // const dy =
        //   pawn.entity.targetPosition.y * 256 - meshRef.current.position.y;
        // const dz =
        //   pawn.entity.targetPosition.z * 128 - meshRef.current.position.z;
        // const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        // if (distance > 1) {
        //   dispatch(setAction({ pawnId: pawn.entity.id, action: ACTIONS_ENUM.MOVING }));
        //   meshRef.current.position.x += (dx / distance) * speed;
        //   meshRef.current.position.y += (dy / distance) * speed;
        //   meshRef.current.position.z += (dz / distance) * speed;
        // } else {
        //   dispatch(
        //     setTargetPosition({ pawnId: pawn.entity.id, position: undefined })
        //   );
        //   dispatch(
        //     updatePawn({
        //       ...pawn,
        //       entity: { ...pawn.entity, action: ACTIONS_ENUM.IDLE, position: pawn.entity.targetPosition },
        //     })
        //   );
        // }
      }
    }
  }, [gameClock]);

  useEffect(() => {
    console.log("action", pawn.entity.action);
    console.log(animations);
    if (mixerRef.current && animations) {
      let action;
      switch (pawn.entity.action) {
        case ACTIONS_ENUM.IDLE:
          action = animations.find(
            (animation) => animation.key === "Idle"
          )?.clip;
          break;
        case ACTIONS_ENUM.MOVING:
          action = animations.find(
            (animation) => animation.key === "Running"
          )?.clip;
          break;
        case ACTIONS_ENUM.SLEEPING:
          action = animations.find(
            (animation) => animation.key === "Idle-Sleeping"
          )?.clip;
          break;
        default:
          action = animations.find(
            (animation) => animation.key === "Idle"
          )?.clip;
          break;
      }

      action && mixerRef.current.clipAction(action).play();
    }
  }, [mixerRef.current, pawn.entity.action]);

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

    if (intersectedObjects.length > 0) {
      if (isShiftModifierPressed) {
        if (selected) {
          dispatch(removeSelectedObject(pawn.entity.id));
        } else {
          dispatch(addSelectedObject(pawn.entity.id));
        }
      } else {
        dispatch(setSelectedObjects([pawn.entity.id]));
      }
    }
  };

  useEffect(() => {
    if (selectedObjects.includes(pawn.entity.id) && !selected) {
      setSelected(true);
    } else if (!selectedObjects.includes(pawn.entity.id) && selected) {
      setSelected(false);
    }
  }, [selectedObjects]);

  useFrame(({ camera }) => {
    const dx = camera.position.x - pawn.entity.position.x * 128;
    const dy = camera.position.y - pawn.entity.position.y * 256;
    const dz = camera.position.z - pawn.entity.position.z * 128;
    setDistance(Math.sqrt(dx * dx + dy * dy + dz * dz));
  });

  return model ? (
    <>
      <primitive
        ref={meshRef}
        object={model.scene}
        scale={[10, 10, 10]}
        position={[
          pawn.entity.position.x * 128,
          pawn.entity.position.y * 256 - 128,
          pawn.entity.position.z * 128,
        ]}
        onClick={(event: ThreeEvent<MouseEvent>) => handlePawnClick(event)}
      />
      {(distance <= 1000 || selected) && (
        <Html
          position={[
            pawn.entity.position.x * 128,
            pawn.entity.position.y * 256,
            pawn.entity.position.z * 128,
          ]}
        >
          <div className={`rendered--pawn-infos ${selected && "selected"}`}>
            <span className="rendered--pawn-name">{pawn.infos.firstName}</span>
            <div className="rendered--pawn-bars">
              <div className="rendered--stamina-bar">
                <div style={{ width: Math.floor(Math.random() * 100) }}></div>
              </div>
              <div className="rendered--health-bar">
                <div style={{ width: Math.floor(Math.random() * 100) }}></div>
              </div>
            </div>
          </div>
        </Html>
      )}
    </>
  ) : null;
});

export default PawnMemo;
