'use client'
import { Skateboard } from '@/components/Skateboard'
import { ContactShadows, Environment, Html } from '@react-three/drei'
import { Canvas, ThreeEvent, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Hotspot } from './Hotspot'
import { WavyPaths } from './WavyPaths'

const INITIAL_CAMERA_POSITION = [1.5, 1, 1.4] as const

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
      <Canvas className='min-h-[60rem] w-full' camera={{position:INITIAL_CAMERA_POSITION, fov:55}}>
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

  const [showHotspot, setshowHotspot] = useState({
    front:true,
    middle:true,
    back:true,
  })

  const [Animating, setAnimating] = useState(false)

  const {camera} = useThree()

  useEffect(()=>{
    if(!containerRef.current || !originRef.current) return

    gsap.to(containerRef.current.position,{
      x:0.2,
      duration:3,
      repeat:-1,
      yoyo:true,
      ease:'sine.inOut'
    })


    gsap.to(originRef.current.position,{
      y:Math.PI/65,
      duration:3,
      repeat:-1,
      yoyo:true,
      ease:'sine.inOut'
    })
  },[])

  useEffect(() => {

    camera.lookAt(new THREE.Vector3(-0.2,0.15,0))

    setZoom()

    window.addEventListener("resize", setZoom)

    function setZoom(){
      const scale = Math.max(Math.min(1000/window.innerWidth,2.2),1)

      camera.position.x = INITIAL_CAMERA_POSITION[0]*scale;
      camera.position.y = INITIAL_CAMERA_POSITION[1]*scale;
      camera.position.z = INITIAL_CAMERA_POSITION[2]*scale;


    }

    return window.removeEventListener('resize', setZoom)
  
  },[camera] )
  

  function onClick(event:ThreeEvent<MouseEvent>){
    event.stopPropagation()


    const board = containerRef.current
    const origin = originRef.current
    if(!board || !origin || Animating) return;

    const {name} = event.object;

    setshowHotspot((current)=>({...current,[name]:false}))

    jumpBoard(board)

    if(name === 'back'){
      ollie(board)
    }else if(name === 'middle'){
    kickflip(board)
    }else if(name === 'front'){
      frontside360(board,origin)
    }

  
  }



  function jumpBoard(board:THREE.Group){
    setAnimating(true)
    gsap.timeline({onComplete:()=>setAnimating(false)})
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
  

    return(
        <group>
            <Environment files={"/hdr/warehouse-256.hdr"}/>
            {/* <OrbitControls/> */}
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
            isVisible={!Animating &&showHotspot.front}
            position={[0,.38,1]}
            color='#B8FC39'
            />

            <mesh position={[0,.27,0.9]} name='front' onClick={onClick}>
              <boxGeometry args={[.6,.2,.58]}/>
              <meshStandardMaterial visible={false}/>
            </mesh>

            <Hotspot
            isVisible={!Animating &&showHotspot.middle}
            position={[0,.38,0]}
            color='#FF7A51'
            />

            <mesh position={[0,.27,0]} name='middle' onClick={onClick}>
              <boxGeometry args={[.6,.1,1.2]}/>
              <meshStandardMaterial visible={false}/>
            </mesh>

            <Hotspot
            isVisible={!Animating &&showHotspot.back}
            position={[0,.38,-0.9]}
            color='#46ACFA'
            />

            <mesh position={[0,.27,-0.9]} name='back' onClick={onClick}>
              <boxGeometry args={[.6,.2,.58]}/>
              <meshStandardMaterial visible={false}/>
            </mesh>
            </group>
            </group>
            </group>
            <ContactShadows opacity={0.6} position={[0,-0.08,0]} />

            <group
            rotation={[-Math.PI/2,0,-Math.PI/2]}
            position={[0,-0.09,-0.5]}
            scale={[0.2,0.2,0.2]}
            >
              <Html transform
              zIndexRange={[1,0]}
              occlude="blending"
              wrapperClass='pointer-event-none'
              >
                <WavyPaths/>
              </Html>
            </group>
        </group>
    )
}