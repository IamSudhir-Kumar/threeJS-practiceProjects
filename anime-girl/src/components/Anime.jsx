import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Anime(props) {
  const { nodes, materials } = useGLTF('models/glb.glb')
  return (
    <group {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh name="Collarbaked" geometry={nodes.Collarbaked.geometry} material={materials['Material.004']} skeleton={nodes.Collarbaked.skeleton} morphTargetDictionary={nodes.Collarbaked.morphTargetDictionary} morphTargetInfluences={nodes.Collarbaked.morphTargetInfluences} />
      <skinnedMesh name="Collarbaked_1" geometry={nodes.Collarbaked_1.geometry} material={materials['N00_000_00_FaceMouth_00_FACE (Instance)']} skeleton={nodes.Collarbaked_1.skeleton} morphTargetDictionary={nodes.Collarbaked_1.morphTargetDictionary} morphTargetInfluences={nodes.Collarbaked_1.morphTargetInfluences} />
      <skinnedMesh name="Collarbaked_2" geometry={nodes.Collarbaked_2.geometry} material={materials['N00_000_00_EyeIris_00_EYE (Instance)']} skeleton={nodes.Collarbaked_2.skeleton} morphTargetDictionary={nodes.Collarbaked_2.morphTargetDictionary} morphTargetInfluences={nodes.Collarbaked_2.morphTargetInfluences} />
      <skinnedMesh name="Collarbaked_3" geometry={nodes.Collarbaked_3.geometry} material={materials['N00_000_00_EyeHighlight_00_EYE (Instance)']} skeleton={nodes.Collarbaked_3.skeleton} morphTargetDictionary={nodes.Collarbaked_3.morphTargetDictionary} morphTargetInfluences={nodes.Collarbaked_3.morphTargetInfluences} />
      <skinnedMesh name="Collarbaked_4" geometry={nodes.Collarbaked_4.geometry} material={materials['N00_000_00_Face_00_SKIN (Instance)']} skeleton={nodes.Collarbaked_4.skeleton} morphTargetDictionary={nodes.Collarbaked_4.morphTargetDictionary} morphTargetInfluences={nodes.Collarbaked_4.morphTargetInfluences} />
      <skinnedMesh name="Collarbaked_5" geometry={nodes.Collarbaked_5.geometry} material={materials['N00_000_00_EyeWhite_00_EYE (Instance)']} skeleton={nodes.Collarbaked_5.skeleton} morphTargetDictionary={nodes.Collarbaked_5.morphTargetDictionary} morphTargetInfluences={nodes.Collarbaked_5.morphTargetInfluences} />
      <skinnedMesh name="Collarbaked_6" geometry={nodes.Collarbaked_6.geometry} material={materials['N00_000_00_FaceBrow_00_FACE (Instance)']} skeleton={nodes.Collarbaked_6.skeleton} morphTargetDictionary={nodes.Collarbaked_6.morphTargetDictionary} morphTargetInfluences={nodes.Collarbaked_6.morphTargetInfluences} />
      <skinnedMesh name="Collarbaked_7" geometry={nodes.Collarbaked_7.geometry} material={materials['N00_000_00_FaceEyeline_00_FACE (Instance)']} skeleton={nodes.Collarbaked_7.skeleton} morphTargetDictionary={nodes.Collarbaked_7.morphTargetDictionary} morphTargetInfluences={nodes.Collarbaked_7.morphTargetInfluences} />
      <skinnedMesh name="Collarbaked_8" geometry={nodes.Collarbaked_8.geometry} material={materials['N00_000_00_Body_00_SKIN (Instance)']} skeleton={nodes.Collarbaked_8.skeleton} morphTargetDictionary={nodes.Collarbaked_8.morphTargetDictionary} morphTargetInfluences={nodes.Collarbaked_8.morphTargetInfluences} />
      <skinnedMesh name="Collarbaked_9" geometry={nodes.Collarbaked_9.geometry} material={materials['N00_001_01_Bottoms_01_CLOTH (Instance)']} skeleton={nodes.Collarbaked_9.skeleton} morphTargetDictionary={nodes.Collarbaked_9.morphTargetDictionary} morphTargetInfluences={nodes.Collarbaked_9.morphTargetInfluences} />
      <skinnedMesh name="Collarbaked_10" geometry={nodes.Collarbaked_10.geometry} material={materials['N00_000_00_HairBack_00_HAIR (Instance)']} skeleton={nodes.Collarbaked_10.skeleton} morphTargetDictionary={nodes.Collarbaked_10.morphTargetDictionary} morphTargetInfluences={nodes.Collarbaked_10.morphTargetInfluences} />
      <skinnedMesh name="Collarbaked_11" geometry={nodes.Collarbaked_11.geometry} material={materials['N00_004_01_Shoes_01_CLOTH (Instance)']} skeleton={nodes.Collarbaked_11.skeleton} morphTargetDictionary={nodes.Collarbaked_11.morphTargetDictionary} morphTargetInfluences={nodes.Collarbaked_11.morphTargetInfluences} />
      <skinnedMesh name="Collarbaked_12" geometry={nodes.Collarbaked_12.geometry} material={materials['N00_007_03_Tops_01_CLOTH (Instance)']} skeleton={nodes.Collarbaked_12.skeleton} morphTargetDictionary={nodes.Collarbaked_12.morphTargetDictionary} morphTargetInfluences={nodes.Collarbaked_12.morphTargetInfluences} />
      <skinnedMesh name="Collarbaked_13" geometry={nodes.Collarbaked_13.geometry} material={materials['Accessory_CatEar_01_CLOTH (Instance)']} skeleton={nodes.Collarbaked_13.skeleton} morphTargetDictionary={nodes.Collarbaked_13.morphTargetDictionary} morphTargetInfluences={nodes.Collarbaked_13.morphTargetInfluences} />
      <skinnedMesh name="Collarbaked_14" geometry={nodes.Collarbaked_14.geometry} material={materials['N00_000_Hair_00_HAIR (Instance)']} skeleton={nodes.Collarbaked_14.skeleton} morphTargetDictionary={nodes.Collarbaked_14.morphTargetDictionary} morphTargetInfluences={nodes.Collarbaked_14.morphTargetInfluences} />
      <skinnedMesh name="Collarbaked_15" geometry={nodes.Collarbaked_15.geometry} material={materials.Tail} skeleton={nodes.Collarbaked_15.skeleton} morphTargetDictionary={nodes.Collarbaked_15.morphTargetDictionary} morphTargetInfluences={nodes.Collarbaked_15.morphTargetInfluences} />
    </group>
  )
}

useGLTF.preload('/glb.glb')
