
import * as THREE from 'three'
import React, { useMemo, useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    GripTape: THREE.Mesh
    Wheel1: THREE.Mesh
    Wheel2: THREE.Mesh
    Deck: THREE.Mesh
    Wheel4: THREE.Mesh
    Bolts: THREE.Mesh
    Wheel3: THREE.Mesh
    Baseplates: THREE.Mesh
    Truck1: THREE.Mesh
    Truck2: THREE.Mesh
  }
  materials: {}
}

export function Skateboard(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/skateboard.gltf') as GLTFResult;

  const GripTapeDiffuse = useTexture('/skateboard/griptape-diffuse.webp')
  const GripTapeRoughness = useTexture('/skateboard/griptape-roughness.webp')

  const gripTapematerial = useMemo(()=>{
    const material = new THREE.MeshStandardMaterial({
        map:GripTapeDiffuse,
        bumpMap:GripTapeRoughness,
        roughnessMap:GripTapeRoughness,
        bumpScale:3.5,
        roughness:0.8,
        color:'#555555'
    })

    if(GripTapeDiffuse){
        GripTapeDiffuse.wrapS = THREE.RepeatWrapping;
        GripTapeDiffuse.wrapT = THREE.RepeatWrapping;
        GripTapeDiffuse.repeat.set(9,9);
        GripTapeDiffuse.needsUpdate = true;


        GripTapeRoughness.wrapS = THREE.RepeatWrapping;
        GripTapeRoughness.wrapT = THREE.RepeatWrapping;
        GripTapeRoughness.repeat.set(9,9);
        GripTapeRoughness.needsUpdate = true;

        GripTapeRoughness.anisotropy =8;
    }

    return material;
  },[GripTapeDiffuse,GripTapeRoughness])

const boltColor = '#555555'

  const boltMaterial = useMemo(()=> new THREE.MeshStandardMaterial({
    color:boltColor,
    metalness: .5,
    roughness:.3,
  }),[boltColor])


  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="GripTape"
          castShadow
          receiveShadow
          geometry={nodes.GripTape.geometry}
          material={gripTapematerial}
          position={[0, 0.286, -0.002]}
        />
        <mesh
          name="Wheel1"
          castShadow
          receiveShadow
          geometry={nodes.Wheel1.geometry}
          material={nodes.Wheel1.material}
          position={[0.238, 0.086, 0.635]}
        />
        <mesh
          name="Wheel2"
          castShadow
          receiveShadow
          geometry={nodes.Wheel2.geometry}
          material={nodes.Wheel2.material}
          position={[-0.237, 0.086, 0.635]}
        />
        <mesh
          name="Deck"
          castShadow
          receiveShadow
          geometry={nodes.Deck.geometry}
          material={nodes.Deck.material}
          position={[0, 0.271, -0.002]}
        />
        <mesh
          name="Wheel4"
          castShadow
          receiveShadow
          geometry={nodes.Wheel4.geometry}
          material={nodes.Wheel4.material}
          position={[-0.238, 0.086, -0.635]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          name="Bolts"
          castShadow
          receiveShadow
          geometry={nodes.Bolts.geometry}
          material={ boltMaterial}
          position={[0, 0.198, 0]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          name="Wheel3"
          castShadow
          receiveShadow
          geometry={nodes.Wheel3.geometry}
          material={nodes.Wheel3.material}
          position={[0.237, 0.086, -0.635]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          name="Baseplates"
          castShadow
          receiveShadow
          geometry={nodes.Baseplates.geometry}
          material={nodes.Baseplates.material}
          position={[0, 0.211, 0]}
        />
        <mesh
          name="Truck1"
          castShadow
          receiveShadow
          geometry={nodes.Truck1.geometry}
          material={nodes.Truck1.material}
          position={[0, 0.101, -0.617]}
        />
        <mesh
          name="Truck2"
          castShadow
          receiveShadow
          geometry={nodes.Truck2.geometry}
          material={nodes.Truck2.material}
          position={[0, 0.101, 0.617]}
          rotation={[Math.PI, 0, Math.PI]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/skateboard.gltf')
