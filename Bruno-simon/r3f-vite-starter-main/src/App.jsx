import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { SheetProvider } from '@theatre/r3f'
import * as core from '@theatre/core'
import { getProject } from '@theatre/core'
import { PerspectiveCamera } from '@theatre/r3f'


const demoSheet = getProject('Demo Project').sheet('Demo Sheet')


function App() {
  return (
   
    <Canvas 
    shadows 
    camera={{ position: [7.05, 2.89, -6.68], fov: 75 }}>
       <SheetProvider sheet={demoSheet}>
       <PerspectiveCamera theatreKey="Camera" makeDefault position={[5, 5, -5]} fov={75} />
      <axesHelper args={[5]} />
      <color attach="background" args={["grey"]} />
      <Experience />
     </SheetProvider>
    </Canvas>
  );
}

export default App;
