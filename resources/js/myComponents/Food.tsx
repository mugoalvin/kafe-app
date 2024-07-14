import { FoodCategoryKey } from "@/Functions/FunctionsAndValues";
import { getDiscountedPrice } from "./FoodList";
import FoodButtons from "./FoodButtons";
import { categoryProp } from "./CategoriesContainer";
import '../../css/Food.css'


export interface FoodItem {
	id : number
	image: string
	foodName: string
	price: number
	discount?: number | undefined
	isRecomended?: boolean
	foodCategory ? :  FoodCategoryKey
	occurence ? : number
	isCustomer: boolean

	categories: categoryProp[]
	activeCategory: number

	onFoodSelect ? : () => void
	setAvailableFoods : (availableFoods: FoodItem[]) => void
	setAllFoods: (availableFood: FoodItem[]) => void
	toggleEditPrompt: (newBoolean: boolean) => void
	setFoodToEdit : (currentFoodData: Partial<FoodItem>) => void
	getFilteredFood : (category: categoryProp) => FoodItem[]
}


const Food = ({ id, isCustomer, image, foodName, foodCategory, price, discount, isRecomended, occurence, categories, activeCategory, onFoodSelect, getFilteredFood, setAvailableFoods, setAllFoods, toggleEditPrompt, setFoodToEdit } : FoodItem) => {

	let currentFoodData : Partial<FoodItem> = {
		id: id,
		image: image,
		foodName: foodName,
		foodCategory: foodCategory,
		price: price,
		discount: discount,
		isRecomended: isRecomended,
		occurence: occurence,
	}

	return (
		<div className={`food ${occurence == 0 && 'outOfStock' }`}  onClick={onFoodSelect}>
			<div id="imageAndComment">
				{discount ? ( <div id="discount">{discount}% OFF</div> ) : null}
				{isRecomended ? ( <div id="recommendation">Recommended</div> ) : null}
				<img src={`/images/${image}`} alt={`${image} Here`} />
			</div>
			<p id="foodName">{ foodName }</p>
			<div id="prices">
				<p id="price"> {  (discount == 100) ? <span id="freePrice">Free</span> :  `Ksh ${ discount ? getDiscountedPrice(discount, price) : price }`} </p>
				<p id="cancellerPrice">{discount ? `Ksh ${price}` : null}</p>
				{!isCustomer && <FoodButtons activeCategory={activeCategory} categories={categories} currentFoodData={currentFoodData} getFilteredFood={getFilteredFood} setFoodToEdit={setFoodToEdit} setAvailableFoods={setAvailableFoods} setAllFoods={setAllFoods} toggleEditPrompt={toggleEditPrompt} />}
			</div>
		</div>
	)
}

export default Food;