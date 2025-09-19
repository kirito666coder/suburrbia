"use client"

import { Heading } from "@/components/Heading";
import { ColorField, Content, ImageField, KeyTextField } from "@prismicio/client"
import { PrismicNextImageProps } from "@prismicio/next";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

type Props = Pick<Content.BoardCostomizerDocumentData,"wheels"|'decks'|"metals"> & {
    className?:string;
}

export default function Controls({wheels,decks,metals,className}: Props) {
  return (
    <div className={clsx('flex flex-col gap-6 ',className)}>
       <Options title="Deck"></Options>
       <Options title="wheels"></Options>
       <Options title="Trucks"></Options>
       <Options title="Bolts"></Options>
    </div>
  )
}


type optionsProps = {
    title?:ReactNode;
    selectedName?:KeyTextField;
    children?:ReactNode;
}


function Options({title,selectedName,children}:optionsProps){
    const formattedName = selectedName?.replace(/-/g, '')

    return (
        <div>
            <div className="flex">
                <Heading as="h2" size="xs" className="mb-2">
                    {title}
                </Heading>
                <p className="ml-3 text-zinc-300">
                    <span className=" select-none text-zinc-500">|  </span>
                    {formattedName}
                </p>
            </div>
            <ul className="mb-1 flex flex-wrap gap-2">
                {children}
            </ul>
        </div>
    )
}

type optionsProp = Omit<ComponentProps<"button">,'children'> & {
    selected:boolean;
    children:ReactNode;
}&(
    | {
        imageField:ImageField;
        imgizParams?:PrismicNextImageProps['imgixParams'];
        colorField?:never;
    }
    |{
        colorField:ColorField;
        imageField?:never;
        imgixParams?:never;
    }
)

