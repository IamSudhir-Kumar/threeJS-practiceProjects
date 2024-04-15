import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';

export const Model = () => {
  const gltf = useLoader(GLTFLoader, '/models/room.glb');
  const texture = useLoader(TextureLoader, '/models/room.png');
  // return <primitive object={gltf.scene} />;
  return (
    <primitive object={gltf.scene}>
      <meshStandardMaterial map={texture} />
      
    </primitive>
  );

};