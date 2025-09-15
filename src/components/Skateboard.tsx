
import * as THREE from 'three'
import React, { useMemo, useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'


type SkateboardProps ={
  wheelTextureUrls:string[],
  wheelTextureUrl:string,
  deckTextureUrl:string,
  deckTextureUrls:string[],
  truckColor:string,
  boltColor:string,
  constantWheelSpin?:boolean
}

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


export function Skateboard({ wheelTextureUrls,
  wheelTextureUrl,
  deckTextureUrl,
  deckTextureUrls,
  truckColor,
  boltColor,
  constantWheelSpin}:SkateboardProps,props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/skateboard.gltf') as unknown as GLTFResult;


  //wheelTexture
  const wheelTextures = useTexture(wheelTextureUrls)
  wheelTextures.forEach((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
  });

  const wheelTextureIndex = wheelTextureUrls.findIndex(
    (url)=>url === wheelTextureUrl
  )

  const wheelTexture = wheelTextures[wheelTextureIndex]



//deckTexture
  const deckTextures = useTexture(deckTextureUrls)
  deckTextures.forEach((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
  });

  const deckTextureIndex = deckTextureUrls.findIndex(
    (url)=>url === deckTextureUrl
  )

  const deckTexture = deckTextures[deckTextureIndex]



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


  const boltMaterial = useMemo(()=> new THREE.MeshStandardMaterial({
    color:boltColor,
    metalness: .5,
    roughness:.3,
  }),[boltColor])


const metalNormal = useTexture('/skateboard/metal-normal.avif') 

metalNormal.wrapS =THREE.RepeatWrapping;
metalNormal.wrapT =THREE.RepeatWrapping;
metalNormal.anisotropy =8;
metalNormal.repeat.set(8, 8)


  const truckMaterial = useMemo(()=> new THREE.MeshStandardMaterial({
    color:truckColor,
    normalScale: new THREE.Vector2(0.3,0.3),
    metalness: 0.8,
    roughness: 0.25,
  }),[truckColor])


  const deckkMaterial = useMemo(()=> new THREE.MeshStandardMaterial({
    map:deckTexture,  
    roughness: 0.1,
  }),[deckTexture])


  wheelTexture.flipY=false;

  const wheelMaterial = useMemo(()=> new THREE.MeshStandardMaterial({
    map:wheelTexture,  
    roughness: 0.1,
  }),[wheelTexture])




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
          material={ wheelMaterial}
          position={[0.238, 0.086, 0.635]}
        />
        <mesh
          name="Wheel2"
          castShadow
          receiveShadow
          geometry={nodes.Wheel2.geometry}
          material={ wheelMaterial}
          position={[-0.237, 0.086, 0.635]}
        />
        <mesh
          name="Deck"
          castShadow
          receiveShadow
          geometry={nodes.Deck.geometry}
          material={deckkMaterial}
          position={[0, 0.271, -0.002]}
        />
        <mesh
          name="Wheel4"
          castShadow
          receiveShadow
          geometry={nodes.Wheel4.geometry}
          material={ wheelMaterial}
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
          material={ wheelMaterial}
          position={[0.237, 0.086, -0.635]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          name="Baseplates"
          castShadow
          receiveShadow
          geometry={nodes.Baseplates.geometry}
          material={truckMaterial}
          position={[0, 0.211, 0]}
        />
        <mesh
          name="Truck1"
          castShadow
          receiveShadow
          geometry={nodes.Truck1.geometry}
          material={truckMaterial}
          position={[0, 0.101, -0.617]}
        />
        <mesh
          name="Truck2"
          castShadow
          receiveShadow
          geometry={nodes.Truck2.geometry}
          material={truckMaterial}
          position={[0, 0.101, 0.617]}
          rotation={[Math.PI, 0, Math.PI]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/skateboard.gltf')
