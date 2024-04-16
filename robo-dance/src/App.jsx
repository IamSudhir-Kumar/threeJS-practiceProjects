import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function App() {
  return (
    <Canvas shadows >
      <color attach="background" args={["#FFC470"]} />
      <Experience />
    </Canvas>
  );
}

export default App;
