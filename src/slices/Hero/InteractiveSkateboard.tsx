'use client'
import { Skateboard } from '@/components/Skateboard'
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

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

    return(
        <group>
            <Environment files={"/hdr/warehouse-256.hdr"}/>
            <OrbitControls/>
            <Skateboard
            wheelTextureUrls={[wheelTextureUrl]}
            wheelTextureUrl={wheelTextureUrl}
            deckTextureUrl={deckTextureUrl}
            deckTextureUrls={[deckTextureUrl]}
            truckColor={truckColor}
            boltColor={boltColor}
            constantWheelSpin
            />
            <ContactShadows opacity={0.6} position={[0,-0.08,0]} />
        </group>
    )
}