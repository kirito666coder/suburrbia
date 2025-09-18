
import { ButtonLink } from '@/components/ButtonLink'
import { Heading } from '@/components/Heading'
import { Logo } from '@/components/Logo'
import Link from 'next/link'
import React from 'react'

import { CustomizerControlsProvider } from './context'
import { createClient } from '@/prismicio'
import Preview from './Preview'
import { asImageSrc } from '@prismicio/client'


export default async function page () {

    const client = createClient();
    const customizerSettings = await client.getSingle("board_costomizer")
    const {wheels,decks,metals} = customizerSettings.data;


    const defaultWheel = wheels[0];
    const defaultDeck = decks[0];
    const defaultTruck = metals[0];
    const defaultBolt = metals[0];


    const wheelTextureURLs = wheels.map((texutre) => asImageSrc(texutre.texture)).filter((url):url is string => Boolean(url));
    const deckTextureURLs = decks.map((texutre) => asImageSrc(texutre.texture)).filter((url):url is string => Boolean(url));

  return (
    <div className='flex h-screen flex-col lg:flex-row'>
        <CustomizerControlsProvider
        defaultWheel={defaultWheel}
        defaultDeck={defaultDeck}
        defaultTruck={defaultTruck}
        defaultBolt={defaultBolt}
        >
        <div className="relative aspect-square shrink-0 bg-[#3a414a] lg:aspect-auto lg:grow">
       
       <div className='absolute inset-0'>
        <Preview wheelTextureURLs={wheelTextureURLs} deckTextureURLs={deckTextureURLs} />
       </div>


       <Link href={'/'} className='absolute left-6 top-6' />
       <Logo className='h-12 text-white'/>
        </div>
        <div className='grow bg-texture bg-zinc-900 text-white p-4 md:p-6 lg:shrink-0 lg:grow-0 lg:w-96'>
        <Heading size='sm' as='h1' className='mb-6 mt-0'>
        Build your board
        </Heading>


        <ButtonLink href={''} color='lime' icon='plus' >
            Add to cart
        </ButtonLink>
        </div>
        </CustomizerControlsProvider>
    </div>
  )
}