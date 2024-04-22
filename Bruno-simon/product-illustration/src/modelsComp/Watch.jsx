import { useGLTF, useAnimations } from "@react-three/drei";

const Watch = () => {
    const model = useGLTF("./watch.glb");

    return(
        <>
            <mesh>
                <primitive object={model.scene} />
            </mesh>
        </>
    )
}

export default Watch;