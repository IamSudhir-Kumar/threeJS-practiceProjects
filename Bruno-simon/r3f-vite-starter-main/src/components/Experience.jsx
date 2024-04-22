import { OrbitControls } from "@react-three/drei";
import { Model } from "./object";
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'


studio.initialize()
studio.extend(extension)

export const Experience = () => {
  return (
    <>
  
      <OrbitControls />
      <mesh >
        <Model />
        <ambientLight intensity={0.8} />
        <meshNormalMaterial />
      </mesh>
    
    </>
  );
};
