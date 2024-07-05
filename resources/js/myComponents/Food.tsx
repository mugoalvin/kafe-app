import { FoodCategoryKey } from "@/Functions/FunctionsAndValues";
import { getDiscountedPrice } from "./FoodList";
import FoodButtons from "./FoodButtons";
import '../../css/Food.css'


export interface FoodItem {
	id : number;
	image: string;
	foodName: string;
	price: number;
	discount?: number | undefined;
	isRecomended?: boolean;
	foodCategory ? :  FoodCategoryKey | FoodCategoryKey[]
	occurence ? : number;
	isCustomer: boolean
	onFoodSelect ? : () => void
	setAvailableFoods : (availableFoods: FoodItem[]) => void
}


const Food = ({ id, isCustomer, image, foodName, price, discount, isRecomended, onFoodSelect, setAvailableFoods } : FoodItem) => {

	return (
		<div className="food" onClick={onFoodSelect}>
			<div id="imageAndComment">
				{discount ? ( <div id="discount">{discount}% OFF</div> ) : null}
				{isRecomended ? ( <div id="recommendation">Recommended</div> ) : null}
				<img src={`/images/${image}`} alt={`${image} Here`} />
			</div>
			<p id="foodName">{ foodName }</p>
			<div id="prices">
				<p id="price"> {  (discount == 100) ? <span id="freePrice">Free</span> :  `Ksh ${ discount ? getDiscountedPrice(discount, price) : price }`} </p>
				<p id="cancellerPrice">{discount ? `Ksh ${price}` : null}</p>
				{!isCustomer && <FoodButtons foodId={id} foodName={foodName} setAvailableFoods={setAvailableFoods}/>}
			</div>
			{/* {!isCustomer && <FoodButtons />} */}
		</div>
	);
};

export default Food;