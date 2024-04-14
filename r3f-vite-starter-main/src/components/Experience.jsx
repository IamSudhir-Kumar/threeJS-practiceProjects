import { OrbitControls } from "@react-three/drei";
import { Model } from "./object";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <mesh>
        <Model />
        <meshNormalMaterial />
      </mesh>
    </>
  );
};
