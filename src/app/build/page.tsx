
import { ButtonLink } from '@/components/ButtonLink'
import { Heading } from '@/components/Heading'
import { Logo } from '@/components/Logo'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default async function page ({}: Props) {
  return (
    <div className='flex h-screen flex-col lg:flex-row'>
        <div className="relative aspect-square shrink-0 bg-[#3a414a] lg:aspect-auto lg:grow">
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
    </div>
  )
}