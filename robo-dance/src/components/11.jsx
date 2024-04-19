import React, { useRef } from 'react'
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect } from 'react';

export function Robo1(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('models/11.glb')
  const {animations: entry } = useFBX("animation/Entry.fbx");

  entry[0].name = "Entry";

  const { actions } = useAnimations(entry, group);

  useEffect(() => {
    actions.Entry.play();
  }, []);
  
  
  return (
    <group {...props} ref={group} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <group rotation={[-Math.PI, 0, 0]} scale={0.01}>
          <mesh geometry={nodes.mesh_3716_mesh_3716_0.geometry} material={materials.mesh_3716} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.mesh_640636_mesh_640636_0.geometry} material={materials.mesh_640636} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.mesh_1939188_mesh_1939188_0.geometry} material={materials.mesh_1939188} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.mesh_1941536_mesh_1941536_0.geometry} material={materials.mesh_1941536} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.mesh_797668_mesh_797668_0.geometry} material={materials.mesh_797668} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.mesh_991824_mesh_991824_0.geometry} material={materials.material_0} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.mesh_1383012_mesh_1383012_0.geometry} material={materials.mesh_1383012} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.mesh_1535332_Base_0.geometry} material={materials.Base} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.mesh_1864052_mesh_1864052_0.geometry} material={materials.mesh_1864052} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.mesh_1899492_mesh_1899492_0.geometry} material={materials.mesh_1899492} rotation={[Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.mesh_1931184_mesh_1931184_0.geometry} material={materials.mesh_1931184} rotation={[Math.PI / 2, 0, 0]} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('models/11.glb')
