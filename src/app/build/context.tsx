'use client'

import { Content } from "@prismicio/client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";


type CustomizerControlsContext = {
    selectedWheel?: Content.BoardCostomizerDocumentDataWheelsItem;
    setWheel:(wheel:Content.BoardCostomizerDocumentDataWheelsItem) => void;
    selectedDeck?:Content.BoardCostomizerDocumentDataDecksItem;
    setDeck:(deck:Content.BoardCostomizerDocumentDataDecksItem) =>void;
    selectedTruck?:Content.BoardCostomizerDocumentDataMetalsItem;
    setTruck:(trucks:Content.BoardCostomizerDocumentDataMetalsItem) =>void;
    selectedBolt?:Content.BoardCostomizerDocumentDataMetalsItem;
    setBolt:(bolts:Content.BoardCostomizerDocumentDataMetalsItem) =>void;
};

const defaultContext: CustomizerControlsContext ={
    setWheel:()=>{},
    setDeck:()=>{},
    setTruck:()=>{},
    setBolt:()=>{},
}

const CustomizerControlsContext = createContext(defaultContext)

type CustomizerControlsProviderProps = {
    defaultWheel?:Content.BoardCostomizerDocumentDataWheelsItem;
    defaultDeck?:Content.BoardCostomizerDocumentDataDecksItem;
    defaultTruck?:Content.BoardCostomizerDocumentDataMetalsItem;
    defaultBolt?:Content.BoardCostomizerDocumentDataMetalsItem;
    children?: ReactNode;
}

export function CustomizerControlsProvider({
    defaultWheel,
    defaultDeck,
    defaultTruck,
    defaultBolt,
    children
}:CustomizerControlsProviderProps){


    const [selectedWheel, setWheel] = useState(defaultWheel)
    const [selectedDeck, setDeck] = useState(defaultDeck)
    const [selectedTruck, setTruck] = useState(defaultTruck)
    const [selectedBolt, setBolt] = useState(defaultBolt)

    const value = useMemo<CustomizerControlsContext>(()=>{
     return {
        selectedWheel, setWheel,
        selectedDeck, setDeck,
        selectedTruck, setTruck,
        selectedBolt, setBolt,
     }
    }, [selectedWheel,selectedDeck,selectedTruck,selectedBolt])

    return (
        <CustomizerControlsContext.Provider value={value}>
            {children}
        </CustomizerControlsContext.Provider>
    )
}

export function useCustomizerControls(){
    return useContext(CustomizerControlsContext)
}
