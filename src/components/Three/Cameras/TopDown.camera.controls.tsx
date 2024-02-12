import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

interface TopDownCameraControlsProps {
  zoomSpeed: number;
  moveSpeed: number;
  size: number;
  height: number;
}

const TopDownCameraControls: React.FC<TopDownCameraControlsProps> = ({
  zoomSpeed,
  moveSpeed,
  size,
  height,
}) => {
  const { camera, gl } = useThree();
  const controls = useRef<OrbitControls>();

  useEffect(() => {
    camera.position.set(size * 64, height * 64, size * 64);
    camera.rotation.set(-Math.PI / 2, 0, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(size * 32, height * 32, size * 32);

    controls.current = new OrbitControls(camera, gl.domElement);
    controls.current.enableRotate = true;
    controls.current.enablePan = true;
    controls.current.enableZoom = true;
    controls.current.zoomSpeed = zoomSpeed;
    controls.current.enableDamping = true;

    const cleanup = () => {
      controls.current?.dispose();
    };

    return cleanup;
  }, [camera, gl, moveSpeed, size, height]);

  useFrame(() => {
    if (controls.current) {
      controls.current.update();
    }
  });

  return null;
};

export default TopDownCameraControls;