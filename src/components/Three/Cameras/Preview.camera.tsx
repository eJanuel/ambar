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
    camera.position.set(size * 64 + height * 64, height * 64, size * 64 + height * 64);
    camera.lookAt(new THREE.Vector3(size * 64, height * 64, size * 64));
    camera.far = 40000; // Increase the far clipping plane
    camera.updateProjectionMatrix();
  }, [size, height, camera]);
  return null;
};

export default PreviewCamera;
