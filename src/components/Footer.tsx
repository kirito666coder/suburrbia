import { createClient } from '@/prismicio'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import React from 'react'
import { Logo } from './Logo'
import { Bounded } from './Bounded'

type Props = {}

export const Footer = async ({}: Props) => {

    const client = createClient()

    const settings = await client.getSingle('settings')


  return (
    <footer className='bg-texture bg-zinc-900 text-white overflow-hidden'>
      
     <div className='relative h-[75vh] p-10 md:p-16 md:aspect-auto'>
        <PrismicNextImage field={settings.data.footer_image} alt='' fill className='object-cover ' width={1200}/>

        <Logo className='pointer-events-none relative h-20 mix-blend-exclusion md:h-28'/>

     </div>
     <Bounded as={'nav'} >
        <ul className='flex flex-wrap justify-center gap-8 text-lg md:text-xl'>
            {
                settings.data.navigation.map((item)=>(
                    <li key={item.link.text}>
                    <PrismicNextLink field={item.link}/>
                    </li>
                ))
            }
        </ul>
     </Bounded>

    </footer>
  )
}