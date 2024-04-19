import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, ScrollControls, useScroll, Scroll } from "@react-three/drei"
import Watch from "./modelsComp/Watch"

import { getProject, val } from "@theatre/core"
import {
  editable as e,
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
} from '@theatre/r3f'

function App() {

  const sheet = getProject('product-illustration').sheet('main')

  return (
    <>
      <Canvas gl={{ physicallyCorrectLights: true, preserveDrawingBuffer: true }}>
        <ScrollControls pages={10} distance={0.1} damping={1} >
          <SheetProvider sheet={sheet}>
            <Scene />
          </SheetProvider>
          <Scroll html>
            <div className="bg-sky-500">
              <h1 className="text-3xl font-bold underline">
                Hello world!
              </h1>
            </div>

            <div className="bg-sky-500 w-screen h-screen">
              <h1>Page 2</h1>
            </div>
            <div className="bg-sky-500">
              <h1>Page 3</h1>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  )
}

export default App;

const Scene = () => {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  useFrame(() => {
    const sequenceLength = val(sheet.sequence.pointer.length);
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  return (
    <>
      <color attach="background" args={["lightblue"]} />
      {/* <Environment files={"sky.hdr"} background /> */}
      <Environment preset="city" />
      <PerspectiveCamera theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={70} />
      <ambientLight intensity={1} />
      <directionalLight intensity={3} />
      <Watch />
    </>
  );
}
