import { OrbitControls } from "@react-three/drei";
import { Robo1 } from "./11";


export const Experience = () => {
  return (
    <>
       <OrbitControls />
      <group position-y={-1}>
        <axesHelper args={[10]}/>
        <perspectiveCamera makeDefault position={[0, 0, 10]} fov={60} near={1} far={1000} />
        {/* Adjust the position and scale of Robo1 based on your requirements */}
        <Robo1 position={[0, 0, 5]} scale={[0.5, 0.5, 0.5]} />
      </group>
      <ambientLight intensity={1} />
    </>
  );
};
