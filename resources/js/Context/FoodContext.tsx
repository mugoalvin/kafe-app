import React, { createContext, useState, ReactNode } from "react";

interface FoodContextType {
    foodOccurrenceMap: { [key: string]: number };
    setFoodOccurrenceMap: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider = ({ children }: { children: ReactNode }) => {
    const [foodOccurrenceMap, setFoodOccurrenceMap] = useState<{[key: string]: number;}>({});

    return (
        <FoodContext.Provider value={{ foodOccurrenceMap, setFoodOccurrenceMap }}>
            {children}
        </FoodContext.Provider>
    );
};

export const useFoodContext = () => {
    const context = React.useContext(FoodContext);
    if (context === undefined) {
        throw new Error("useFoodContext must be used within a FoodProvider");
    }
    return context;
};