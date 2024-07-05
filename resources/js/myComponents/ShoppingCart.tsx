import Buttons from "./Buttons";
import { getDiscountedPrice } from './FoodList';
import { FoodItem } from './Food';
import "../../css/ShoppingCart.css"
import "../../css/Buttons.css"

interface ShoppingListProps{
	totalPrice ? : number
	selectedFoods : FoodItem[]
	foodOccurrenceMap: Record<string, number>
	clearSelectedFood: () => void
	makePayment : (computedPrice : number) => void
}

const ShippingCart = ({totalPrice, foodOccurrenceMap, selectedFoods, clearSelectedFood, makePayment} : ShoppingListProps) => {
	
	let computedPrice : number = 0
	let price : number = 0

	selectedFoods.forEach(selectedFood => {
		const price = (selectedFood.discount === 0 || selectedFood.discount == undefined
			? selectedFood.price
			: getDiscountedPrice(selectedFood.discount, selectedFood.price)
		) * foodOccurrenceMap[selectedFood.foodName];
		
		computedPrice += price
	})


	return (
		<>
			<div id="foo">
				{selectedFoods?.map((selectedFood : FoodItem) => (
					<div className="item" key={selectedFood.foodName}>
						<div>
							{foodOccurrenceMap[selectedFood.foodName] !== 1 && (
								<div className="noOfItems">
									{foodOccurrenceMap[selectedFood.foodName]}X
								</div>
							)}
							<span>{selectedFood.foodName}</span>
						</div>
						{selectedFood.discount !== undefined && (
							<p>Ksh{" "}
								{
									price = (selectedFood.discount === 0
										? selectedFood.price
										: getDiscountedPrice(selectedFood.discount, selectedFood.price)
									) * foodOccurrenceMap[selectedFood.foodName]
								}
							</p>
						)}
					</div>
				))}
			</div>
			<hr />

			{selectedFoods.length == 0 ? null : (
				<>
					<div id="total">
							<span>Total</span>
							<p>{computedPrice == 0 ? "Free" : `Ksh ${computedPrice}`}</p>
					</div>
					<div id="buttonDiv">
							<>
								<Buttons buttonText="Clear List" onClickAction={clearSelectedFood}/>
								<Buttons buttonText={computedPrice == 0 ? "Get For Free" : `Pay Ksh ${computedPrice}`} onClickAction={() => makePayment(computedPrice)}/>
							</>
					</div>
				</>
			)}
		</>
	);
};

export default ShippingCart;