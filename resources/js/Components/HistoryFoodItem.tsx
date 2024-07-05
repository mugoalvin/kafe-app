import {FoodItem} from "@/myComponents/Food";

interface HistoryFoodItemProps {
    matchingOrder : any
    foodItem: FoodItem
}
const HistoryFoodItem = ({matchingOrder, foodItem} : HistoryFoodItemProps) => {
    return (
        <div className='historyItem' key={matchingOrder.id}>
            <img src={`/images/${foodItem.image}`} alt="Image Here"/>
            <div className='historyDetails'>
                <div className="noOfItems">{matchingOrder.noTimesOrdered}X</div>
                <span>{foodItem.foodName}</span>
            </div>
        </div>
    )
}

export default HistoryFoodItem
