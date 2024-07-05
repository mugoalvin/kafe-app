import { FoodItem } from '@/myComponents/Food'
import React, {ReactNode, SetStateAction, createContext, useState} from 'react'

// const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);

interface  SelectedFoodProps{
    selectedFoods:  FoodItem | FoodItem[]
    setSelectedFoods : React.Dispatch<SetStateAction<FoodItem>>
}

const SelectedFoodContext = createContext<SelectedFoodProps | any>([])

export const SelectedFoodProvider = ({children} : {children : ReactNode}) => {

    const [ selectedFoods, setFoodOccurrenceMap ] = useState<FoodItem>()
    return (
        <SelectedFoodContext.Provider value={{ selectedFoods, setFoodOccurrenceMap }}>
            {children}
        </SelectedFoodContext.Provider>
    )
}

export const useSelectedFoods = () => {
    const content = React.useContext(SelectedFoodContext);
    if (content == undefined) {
        throw new Error("useFoodContext must be used within a FoodProvider")
    }
    return content
}