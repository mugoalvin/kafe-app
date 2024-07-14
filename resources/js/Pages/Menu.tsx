import ListOrder from "@/myComponents/ListOrder";
import Header from "../Views/Header";
import CategoriesContainer, { categoryProp } from "@/myComponents/CategoriesContainer";
import { FoodCategoryKey, getAllFoods } from "@/Functions/FunctionsAndValues";
import { FoodItem } from "@/myComponents/Food";
import { useEffect, useState } from "react";
import FoodList, { getDiscountedPrice } from "@/myComponents/FoodList";
import Recipent from "@/myComponents/Recipent";
import ShippingCart from "@/myComponents/ShoppingCart";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import Swal from "sweetalert2";
import axios from "axios";
import AddFoodForm from "@/myComponents/AddFoodModal";
import AddCategoryForm from "@/myComponents/AddCategoryForm";
import EditFoodForm from "@/myComponents/EditFoodModal";

const Menu = ({ auth }: PageProps) => {

	const [allFoods, setAllFoods] = useState<FoodItem[]>([])
	const [activeCategory, setActiveCategory] = useState<number>(0)
	const [availableFoods, setAvailableFoods] = useState<FoodItem[]>([])
	const [categories, setCategories] = useState<categoryProp[]>([])
	const [foodOccurrenceMap, setFoodOccurrenceMap] = useState<Record<string, number>>({})
	const [foodToEdit, setFoodToEdit] = useState<Partial<FoodItem>>()
	const [isNewFoodPromptOpen, toggleNewFoodPrompt] = useState<boolean>(false)
	const [isAddCategoryPromptOpen, toggleNewCategoryPrompt] = useState<boolean>(false)
	const [isEditPromptOpen, toggleEditPrompt] = useState<boolean>(false)
	const [selectedFoods, setSelectedFoods] = useState<FoodItem[] | []>([])
	const [totalPrice, setTotalPrice] = useState<number | 0>(0)
	let isCustomer = auth.user.isCustomer
	// isCustomer = true

	async function fetchAllCategories() {
		try {
			await axios.get('http://localhost:8000/getCategories').then(response => {
				setCategories(response.data.allCategories)
			})
		} catch (error) {
			console.log(error);
		}
	}

	async function fetchAllFoods() {
		try {
			const response = await axios.get('http://localhost:8000/getFoods');
			setAllFoods(response.data.foods)
			setAvailableFoods(response.data.foods)
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchAllFoods()
		fetchAllCategories()
	}, [])

	function getFilteredFood(category: categoryProp) {
		const filteredFoods = allFoods.filter(food => {
			return food.foodCategory === category.categoryName || (Array.isArray(food.foodCategory) && food.foodCategory?.includes(category.categoryName as FoodCategoryKey));
		})
		return filteredFoods
	}

	const handleCategoryClick = (category: categoryProp) => {
		setActiveCategory(categories.indexOf(category))
		if (category.categoryName == 'all') {
			setAvailableFoods(allFoods)
		}
		else {
			setAvailableFoods(getFilteredFood(category))
		}
	}

	const addToShoppingList = async (newFood: FoodItem) => {

		const countNewFood = await Swal.fire({
			title: newFood.foodName,
			text: "How many do you need:",
			imageUrl: `images/${newFood.image}`,
			imageWidth: 300,
			imageHeight: 300,
			imageAlt: `Image of "${newFood.foodName}" here`,

			input: "number",
			inputAttributes: {
				min: '1',
				step: '1'
			},
			showCancelButton: true,
			confirmButtonText: "Add To Cart",
			confirmButtonColor: 'var(--green)',
			cancelButtonColor: 'var(--red)',
		});


		if (countNewFood.isConfirmed) {
			const discountedPrice = newFood.discount !== undefined ? getDiscountedPrice(newFood.discount, newFood.price) : newFood.price;

			setTotalPrice(totalPrice + (newFood.discount == 0 ? newFood.price : discountedPrice));

			if (!selectedFoods.find((food: { foodName: string; }) => food.foodName === newFood.foodName)) {
				setSelectedFoods([...selectedFoods, newFood]);
				setFoodOccurrenceMap({ ...foodOccurrenceMap, [newFood.foodName]: Number(countNewFood.value) });
			}
			else {
				const updatedOccurrenceMap = { ...foodOccurrenceMap };
				updatedOccurrenceMap[newFood.foodName] = Number(countNewFood.value);
				setFoodOccurrenceMap(updatedOccurrenceMap);
			}
		}
	}

	function clearSelectedFood() {
		setSelectedFoods([])
		setTotalPrice(0)
		setFoodOccurrenceMap({})
	}

	function makePayment(computedPrice: number) {
		Swal.fire({
			title: "Payment Method",
			text: 'Choose Payment Method',
			icon: "warning",

			confirmButtonColor: "var(--green)",
			confirmButtonText: "M-Pesa",

			showCancelButton: true,
			cancelButtonColor: "var(--green)",
			cancelButtonText: "Cash"
		})
		.then((result) => {
			if (result.isConfirmed) {
				selectedFoods.forEach(selectedFood => {
					selectedFood.occurence = foodOccurrenceMap[selectedFood.foodName]
				});

				const sendRequest = async () => {
					try {
						const response = await axios.post('http://localhost:8000/saveOrder', { 'selectedFoods': selectedFoods, 'userId': auth.user.id, 'price': computedPrice });

						if (response.data.isSuccessful) {
							Swal.fire({
								icon: "success",
								title: 'Order Placed',
								timer: 1500,
								showConfirmButton: false
							});
						}
					}
					catch (error: any) {
						console.log(error.response.config);
					}
				}
				sendRequest()
			}
			if(!result.isConfirmed){
				// Cash Payment Option
				Swal.fire({
					title: "Cash Payment",
					text: 'Shall be payed upon delivery',
				})
			}
		})
	}

	const createFoodClickEvent = async () => {
		toggleNewFoodPrompt(!isNewFoodPromptOpen)
	}

	const closeModal = (event: React.FormEvent<Element>) => {
		event.preventDefault()
		toggleNewFoodPrompt(false)
	}

	const addFood = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget)

		try {
			await axios.post('http://localhost:8000/addFood', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}).then((response) => {
				console.log(response.data.newFood)
			}).catch(error => 
				console.log(error.response.data)
			)
			toggleNewFoodPrompt(!isNewFoodPromptOpen)

			setAllFoods(await getAllFoods())

			// setAvailableFoods(allFetchedFoods)
			Swal.fire({
				icon: 'success',
				title: `${formData.get('foodName')} added successfully`,
				showConfirmButton: false,
				timer: 700,
				timerProgressBar: true
			})
		} catch (error) {
			console.log(error);
		}
	}

	const openCategoryModal = () => {
		toggleNewCategoryPrompt(true)
	}

	function toCamelCase(input: string): string {
		return input
			.split(' ')
			.map((word, index) => {
				if (index === 0) {
					return word.toLowerCase()
				} else {
					return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
				}
			})
			.join('')
	}

	const addCategory = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)

		formData.append('categoryName', toCamelCase(formData.get('title') as string))

		await axios.post('http://localhost:8000/addCategory', formData).then((response) => {
			console.log(response.data.category)
			toggleNewCategoryPrompt(false)
			fetchAllCategories()
			Swal.fire({
				icon: 'success',
				title: `${formData.get('title') as string} added successfully`,
				confirmButtonColor: 'var(--green)'
			})
		}).catch((error) => {
			console.log(error)
		})
	}

	const closeCategoryModal = (event: React.FormEvent<Element>) => {
		event.preventDefault()
		toggleNewCategoryPrompt(false)
	}

	const editFood = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		let formData = new FormData(event.currentTarget)

		try {
			const response = await axios.post('http://localhost:8000/editFood', formData);
			if (response.data.isDone) {
				toggleEditPrompt(false)
				setAllFoods(await getAllFoods())
								
				Swal.fire({
					icon: 'success',
					title: `${formData.get('foodName')} updated successfully`,
					confirmButtonColor: 'var(--green)'
				})
			}
		}
		catch (error: any) {
			console.error(error.message);
			Swal.fire({
				icon: 'error',
				title: 'Error Occurred',
				text: error.message,
				confirmButtonColor: 'var(--red)'
			});
		}
	}

	useEffect(() => {
		if (allFoods.length > 0 && categories.length > 0 && activeCategory !== null) {
			setAvailableFoods(getFilteredFood(categories[activeCategory]))
		}
	},[allFoods])

	const closeEditFoodModal = (event: React.FormEvent<Element>) => {
		event.preventDefault()
		toggleEditPrompt(false)

	}

	return (
		<>
			<Head title="Menu" />

			<Header loggedInUser={auth.user} isCustomer={isCustomer} />
			<main>
				<section>
					{!isCustomer && <ListOrder />}
					<CategoriesContainer title="Categories" categories={categories} activeCategory={activeCategory} allFoods={allFoods} isCustomer={isCustomer} getFilteredFood={getFilteredFood} handleCategoryClick={handleCategoryClick} openCategoryModal={openCategoryModal} />
					<FoodList foods={availableFoods} addToShoppingList={isCustomer ? addToShoppingList : undefined} isCustomer={isCustomer} createFoodClickEvent={createFoodClickEvent} activeCategory={activeCategory} setAvailableFoods={setAvailableFoods} setAllFoods={setAllFoods} toggleEditPrompt={toggleEditPrompt} setFoodToEdit={setFoodToEdit} getFilteredFood={getFilteredFood} />
				</section>
				<section id="rigthSideBar">
					<Recipent auth={auth} isCustomer />
					<ShippingCart foodOccurrenceMap={foodOccurrenceMap} selectedFoods={selectedFoods} totalPrice={totalPrice} clearSelectedFood={clearSelectedFood} makePayment={makePayment} />
				</section>
			</main>
			{isNewFoodPromptOpen ? <AddFoodForm categories={categories} addFood={addFood} closeModal={closeModal} /> : null}
			{isAddCategoryPromptOpen ? <AddCategoryForm addCategory={addCategory} closeModal={closeCategoryModal} /> : null}
			{isEditPromptOpen && <EditFoodForm foodToEdit={foodToEdit} editFood={editFood} closeModal={closeEditFoodModal} />}
		</>
	)
}

export default Menu;