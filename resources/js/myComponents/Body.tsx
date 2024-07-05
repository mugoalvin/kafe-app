import { IonIcon } from "@ionic/react";
import { options, arrowRedoOutline, ellipsisVerticalOutline, chevronBack, chevronForward } from "ionicons/icons";
import Food from "./Food";
import { FoodItem } from "./Food";
import { getDiscountedPrice } from "./Food";
import CurrentTime from "./CurrentTime";
import { useState } from "react";
import Buttons from "./Buttons";
import ListOrder from "./ListOrder";
import Category from "./Category";


export const categories: [string, string, number, string][] = [
	["All Menu", "🍽️", 0, "all"],
	["Main Dishes", "🥘", 1, "main"],
	["Burger", "🍔", 50, "burger"],
	["Juice", "🧃", 10, "juice"],
	["Bento", "🍱", 7, "bento"],
	["Salad", "🥗", 14, "salad"],
	["Tacos", "🌮", 27, "spanish"],
	["Sea Food", "🍣", 5, "seaFood"],
	["Pancake", "🥞", 22, "pancake"],
	["Ice Cream", "🍨", 18, "iceCream"],
	["Fruits", "🍎", 18, "fruits"],
];

const chapati: FoodItem = {
	foodName: "Chapati with beans",
	image: "chapatiBeans.jpg",
	price: 90,
	isRecomended: false,
	discount: 0,
	foodCategory: "main",
	occurence: 1,
}

const pancakes: FoodItem = {
	foodName: "Pancake",
	image: "pancakes.webp",
	price: 100,
	isRecomended: true,
	discount: 0,
	foodCategory: "pancake",
	occurence: 1,
};

const burger: FoodItem = {
	foodName: "Double Cheese Burger",
	image: "burger.webp",
	price: 250,
	isRecomended: false,
	discount: 10,
	foodCategory: "burger",
	occurence: 1,
};

const ugaliFish: FoodItem = {
	foodName: "Ugali Tilapia Fish",
	image: "ugaliFish.webp",
	price: 200,
	isRecomended: true,
	discount: 20,
	foodCategory: ["main", "seaFood"],
	occurence: 1,
};

const iceCream: FoodItem = {
	foodName: "Strawberry Ice Cream",
	image: "iceCream.webp",
	price: 150,
	isRecomended: false,
	discount: 100,
	foodCategory: "iceCream",
	occurence: 1,
};

const masala: FoodItem = {
	foodName: "Chips Masala",
	image: "chipsMasala.jpeg",
	price: 100,
	isRecomended: true,
	discount: 100,
	foodCategory: "main",
	occurence: 1,
};

const strawberry: FoodItem = {
	foodName: 'Strawberry',
	image: 'strawberry.avif',
	price: 50,
	discount: 0,
	foodCategory: 'fruits',
}

const taco: FoodItem = {
	foodName: 'Spanish Taco',
	image: 'taco.jpg',
	price: 150,
	discount: 40,
	foodCategory: 'spanish',
	isRecomended: false,
}

export const allFoods = [chapati, pancakes, burger, ugaliFish, iceCream, masala, strawberry, taco];


const Body = () => {
	const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
	const [foodOccurrenceMap, setFoodOccurrenceMap] = useState<{ [key: string]: number }>({});
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [availableFoods, setAvailableFoods] = useState<FoodItem[]>(allFoods);
	const [activeCategory, setActiveCategory] = useState(0)


	const clearSelectedFood = () => {
		setSelectedFoods([])
		setTotalPrice(0)
	}


	const addToShoppingList = (newFood: FoodItem) => {
		const discountedPrice = newFood.discount !== undefined ? getDiscountedPrice(newFood.discount, newFood.price) : newFood.price;

		setTotalPrice(totalPrice + (newFood.discount == 0 ? newFood.price : discountedPrice));

		if (!selectedFoods.find((food) => food.foodName === newFood.foodName)) {
			setSelectedFoods([...selectedFoods, newFood]);
			setFoodOccurrenceMap({ ...foodOccurrenceMap, [newFood.foodName]: 1 });
		} else {
			const updatedOccurrenceMap = { ...foodOccurrenceMap };
			updatedOccurrenceMap[newFood.foodName] = (updatedOccurrenceMap[newFood.foodName] || 1) + 1;
			setFoodOccurrenceMap(updatedOccurrenceMap);
		}
	};

	function getFilteredFood(category: [string, string, number, string]) {
		const filteredFoods = allFoods.filter(food => {
			return food.foodCategory === category[2] || (Array.isArray(food.foodCategory) && food.foodCategory?.includes(category[2]));
		});
		return filteredFoods
	}

	const handleCategoryClick = (category: [string, string, number, string]) => {
		setActiveCategory(categories.indexOf(category))
		if (category[2] == 'all') {
			setAvailableFoods(allFoods)
		}
		else {
			setAvailableFoods(getFilteredFood(category))
		}
	}

	return (
		<main>
			<section>
				{/* =============================================Order List============================================= */}
				<ListOrder />
				{/* =============================================Categories============================================= */}
				<span id="categoriesSpan">
					<div id="orderListDiv" className="mainSectionHeader">
						<h3>Categories</h3>
						<div id="arrowDiv">
							<IonIcon icon={chevronBack} />
							<IonIcon icon={chevronForward} />
						</div>
					</div>

					<div id="categories">
						{categories.length != 0 ? (
							categories.map((category, index) => {
								return (
									<Category key={category[0]} image={String(category[1])} name={String(category[0])} noItems={category[0] == "All Menu" ? allFoods.length : getFilteredFood(category).length} onClickEvent={() => handleCategoryClick(category)} isActive={index == activeCategory ? true : false} />
								)
							})) : (
							<p>No Items</p>
						)}
					</div>
				</span>

				{/* =============================================Special Menu For You============================================= */}
				<span id="foodSpan">
					<div id="orderListDiv" className="mainSectionHeader">
						<h3>Special Menu For You</h3>
						<div id="arrowDiv">
							<IonIcon icon={options} />
							<p>Filter</p>
						</div>
					</div>

					<div id="foodDiv">
						{availableFoods.length != 0 ? availableFoods.map((availableFood) => (
							<Food key={availableFood.foodName} foodName={availableFood.foodName} image={availableFood.image} price={availableFood.price} discount={availableFood.discount} isRecomended={availableFood.isRecomended} onFoodSelect={() => addToShoppingList(availableFood)} />
						)) : <h4>No items available</h4>}
					</div>
				</span>
			</section>

			{/* =============================================Right Side Bar============================================= */}
			<section id="rigthSideBar">
				{/* ---------------------Recipent--------------------- */}
				<div id="recipentData">
					<div>
						<h3>Order Details</h3>
						<div>
							<IonIcon icon={arrowRedoOutline} />
							<IonIcon icon={ellipsisVerticalOutline} />
						</div>
					</div>

					<div>
						<span>Recipent: Yolanda Tamara</span>
						<CurrentTime />
						<p>#08001273198731</p>
					</div>
				</div>
				<hr />

				{/* ---------------------Selected Items--------------------- */}
				<div id="foo">
					{selectedFoods.map((selectedFood) => (
						<div className="item" key={selectedFood.foodName}>
							<div>
								{foodOccurrenceMap[selectedFood.foodName] !== 1 && (
									<div className="noOfItems">{foodOccurrenceMap[selectedFood.foodName]}X</div>
								)}
								<span>{selectedFood.foodName}</span>
							</div>
							{selectedFood.discount !== undefined && (
								<p>Ksh {selectedFood.discount == 0 ? selectedFood.price : getDiscountedPrice(selectedFood.discount, selectedFood.price)}</p>
							)}
						</div>
					))}
				</div>
				<hr />

				<div id="total">
					<span>Total</span>
					<p>{isNaN(totalPrice) ? "Free" : `Ksh ${totalPrice}`}</p>
				</div>
				<div id="buttonDiv">
					{selectedFoods.length == 0 ? null : (
						<>
							<Buttons buttonText="Clear List" onClickAction={clearSelectedFood} />
							<Buttons buttonText={isNaN(totalPrice) ? "Get For Free" : `Pay Ksh ${totalPrice}`} />
						</>
					)}
				</div>
			</section>
		</main>
	);
};

export default Body;