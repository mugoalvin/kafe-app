import { IonIcon } from "@ionic/react";
import { options } from "ionicons/icons";
import Food, { FoodItem } from "./Food";
import CreateFood from "./CreateFood";
import { fetchAllCategories } from "@/Functions/FunctionsAndValues";
import { useEffect, useState } from "react";
import "../../css/FoodList.css";
import { categoryProp } from "./CategoriesContainer";

interface FoodListProps {
    activeCategory : number
    foods: FoodItem[];
    isCustomer : boolean
    addToShoppingList ? : (newFood: FoodItem) => void
    createFoodClickEvent ?: () => void
    setAvailableFoods: (availableFoods: FoodItem[]) => void
    setAllFoods: (availableFood: FoodItem[]) => void
	toggleEditPrompt: (newBoolean: boolean) => void
	setFoodToEdit : (currentFoodData: Partial<FoodItem>) => void
}

export function getDiscountedPrice(discount: number, currentPrice: number) {
    return currentPrice - (discount / 100) * currentPrice;
}

const FoodList = ({ activeCategory, isCustomer, foods, addToShoppingList, createFoodClickEvent, setAvailableFoods, setAllFoods, toggleEditPrompt, setFoodToEdit }: FoodListProps) => {

    const [categories, setCategories] = useState<categoryProp[]>([])

    useEffect(() => {
        fetchAllCategories().then((response : any[]) => {
            setCategories(response)
        })
    },[])

    const styles = {
        h2 : {
            display : 'flex',
            alignItems: 'center',
            justifyContent : 'center',
            fontSize : 20,
            fontWeight: 900,
            width: '412%',
            height: '1700%',
            color : 'var(--greyText)',
            zIndex: 2
        }
    }

    return (
        <span id="foodSpan">
            <div id="orderListDiv" className="mainSectionHeader">
                <h3>Special Menu For You</h3>
                <div id="arrowDiv">
                    <IonIcon icon={options} />
                    <p>Filter</p>
                </div>
            </div>

            <div id="foodDiv">
                {
                    foods.length == 0 ?
                        isCustomer ?
                            <h2 style={styles.h2}>{ categories[activeCategory].title} Not Available</h2> 
                            : null :
                        (
                            foods.map((food: FoodItem) => (
                                <Food key={food.foodName} id={food.id} foodName={food.foodName} foodCategory={food.foodCategory} image={food.image} price={food.price} discount={food.discount} isRecomended={food.isRecomended} onFoodSelect={() => addToShoppingList && addToShoppingList(food)} isCustomer={isCustomer} setAvailableFoods={setAvailableFoods} setAllFoods={setAllFoods} toggleEditPrompt={toggleEditPrompt} setFoodToEdit={setFoodToEdit}/>
                            ))
                        )
                }
                {!isCustomer && <CreateFood createFoodClickEvent={createFoodClickEvent} /> }
            </div>
        </span>
    )
}

export default FoodList;