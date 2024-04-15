import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";


function App() {
  return (
   
    <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
     
      <axesHelper args={[5]} />
      <color attach="background" args={["grey"]} />
      <Experience />
     
    </Canvas>
  );
}

export default App;
