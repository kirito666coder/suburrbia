'use client'
import { Skateboard } from '@/components/Skateboard'
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { Canvas, ThreeEvent } from '@react-three/fiber'
import gsap from 'gsap'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

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


  function onClick(event:ThreeEvent<MouseEvent>){
    event.stopPropagation()


    const board = containerRef.current

    if(!board) return;

    const {name} = event.object;

    jumpBoard(board)

    if(name === 'back'){
      ollie(board)
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

            <mesh position={[0,.27,0.9]} name='front' onClick={onClick}>
              <boxGeometry args={[.6,.2,.58]}/>
              <meshStandardMaterial visible={true}/>
            </mesh>
            <mesh position={[0,.27,0]} name='middle' onClick={onClick}>
              <boxGeometry args={[.6,.1,1.2]}/>
              <meshStandardMaterial visible={true}/>
            </mesh>
            <mesh position={[0,.27,-0.9]} name='back' onClick={onClick}>
              <boxGeometry args={[.6,.2,.58]}/>
              <meshStandardMaterial visible={true}/>
            </mesh>
            </group>
            </group>
            <ContactShadows opacity={0.6} position={[0,-0.08,0]} />
        </group>
    )
}