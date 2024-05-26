import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

interface PreviewCameraProps {
  size: number;
  height: number;
}

const PreviewCamera: React.FC<PreviewCameraProps> = ({ size, height }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(size * height, height * 128 / 2 + 256, size * height);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.updateProjectionMatrix();
  }, [size, height, camera]);
  return null;
};

export default PreviewCamera;
