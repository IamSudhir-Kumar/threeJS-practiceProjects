import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function App() {
  return (
    <Canvas shadows camera={{ fov: 35, zoom: 1.3, near: 1, far: 1000 }}>
      <color attach="background" args={["#FFC470"]} />
      <Experience />
    </Canvas>
  );
}

export default App;
