'use client'
import { Skateboard } from '@/components/Skateboard'
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { Canvas, ThreeEvent } from '@react-three/fiber'
import gsap from 'gsap'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import { Hotspot } from './Hotspot'

type Props = {
  deckTextureUrl:string,
  wheelTextureUrl:string,
  truckColor:string,
  boltColor:string
}

export const InteractiveSkateboard = ({
  deckTextureUrl,
  wheelTextureUrl,
  truckColor,
  boltColor
}: Props) => {
  return (
    <div className='absolute inset-0 z-10 flex items-center justify-center'>
      <Canvas className='min-h-[60rem] w-full' camera={{position:[1.5, 1, 1.4], fov:55}}>
     <Suspense>
     <Scene
       deckTextureUrl={deckTextureUrl}
       wheelTextureUrl={wheelTextureUrl}
       truckColor={truckColor}
       boltColor={boltColor}
     />
     </Suspense>
      </Canvas>
    </div>
  )
}


function Scene({
  deckTextureUrl,
  wheelTextureUrl,
  truckColor,
  boltColor
}: Props){

  const containerRef = useRef<THREE.Group>(null)
  const originRef = useRef<THREE.Group>(null)


  function onClick(event:ThreeEvent<MouseEvent>){
    event.stopPropagation()


    const board = containerRef.current
    const origin = originRef.current
    if(!board || !origin) return;

    const {name} = event.object;

    jumpBoard(board)

    if(name === 'back'){
      ollie(board)
    }else if(name === 'middle'){
    kickflip(board)
    }else if(name === 'front'){
      frontside360(board,origin)
    }

  
  }


  function ollie(board:THREE.Group){
    gsap.timeline()
    .to(board.rotation,{
      x:-.6,
      duration:.26,
      ease:'none'
    })
    .to(board.rotation,{
      x:.4,
      duration:.82,
      ease:'power2.in'
    })
    .to(board.rotation,{
      x:0,
      duration:.12,
      ease:'none'
    })
  }
  


  function kickflip(board:THREE.Group){
    gsap.timeline()
    .to(board.rotation,{
      x:-.6,
      duration:.26,
      ease:'none'
    })
    .to(board.rotation,{
      x:.4,
      duration:.82,
      ease:'power2.in'
    })
    .to(board.rotation,{
      z:`+=${Math.PI *2}`,
      duration:.78,
      ease:'none'
    },0.3)
    .to(board.rotation,{
      x:0,
      duration:.12,
      ease:'none'
    })
  }
  


  function frontside360(board:THREE.Group,origin:THREE.Group){
    gsap.timeline()
    .to(board.rotation,{
      x:-.6,
      duration:.26,
      ease:'none'
    })
    .to(board.rotation,{
      x:.4,
      duration:.82,
      ease:'power2.in'
    })
    .to(origin.rotation,{
      y:`+=${Math.PI *2}`,
      duration:.78,
      ease:'none'
    },0.3)
    .to(board.rotation,{
      x:0,
      duration:.12,
      ease:'none'
    })
  }
  


  function jumpBoard(board:THREE.Group){
    gsap.timeline()
    .to(board.position,{
      y:.8,
      duration: .51,
      ease:'power2.out',
      delay:.26
    })
    .to(board.position,{
      y:0,
      duration:.43,
      ease:"power2.in"
    })
  }

    return(
        <group>
            <Environment files={"/hdr/warehouse-256.hdr"}/>
            <OrbitControls/>
            <group ref={originRef}>
            <group ref={containerRef} position={[-0.25,0,-0.635]}>
              <group position={[0,-0.086,.635]}>
            <Skateboard
            wheelTextureUrls={[wheelTextureUrl]}
            wheelTextureUrl={wheelTextureUrl}
            deckTextureUrl={deckTextureUrl}
            deckTextureUrls={[deckTextureUrl]}
            truckColor={truckColor}
            boltColor={boltColor}
            constantWheelSpin
            />

            <Hotspot
            isVisible={true}
            position={[0,.38,1]}
            color='#B8FC39'
            />

            <mesh position={[0,.27,0.9]} name='front' onClick={onClick}>
              <boxGeometry args={[.6,.2,.58]}/>
              <meshStandardMaterial visible={false}/>
            </mesh>
            <mesh position={[0,.27,0]} name='middle' onClick={onClick}>
              <boxGeometry args={[.6,.1,1.2]}/>
              <meshStandardMaterial visible={false}/>
            </mesh>
            <mesh position={[0,.27,-0.9]} name='back' onClick={onClick}>
              <boxGeometry args={[.6,.2,.58]}/>
              <meshStandardMaterial visible={false}/>
            </mesh>
            </group>
            </group>
            </group>
            <ContactShadows opacity={0.6} position={[0,-0.08,0]} />
        </group>
    )
}