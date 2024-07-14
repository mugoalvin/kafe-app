import { IoEllipsisVertical, IoPencil } from 'react-icons/io5'
import { MdDoDisturbAlt, MdOutlineDeleteOutline } from 'react-icons/md'
import Swal from 'sweetalert2'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Food, { FoodItem } from './Food'
import { fetchAllFoods } from '@/Functions/FunctionsAndValues'
import { categoryProp } from './CategoriesContainer'
import '../../css/FoodButtons.css'

interface FoodButtonsProps {
	currentFoodData: Partial<FoodItem>
	categories: categoryProp[]
	activeCategory: number
	setAvailableFoods: (availableFood: FoodItem[]) => void
	setAllFoods: (availableFood: FoodItem[]) => void
	toggleEditPrompt: (newBoolean: boolean) => void
	setFoodToEdit : (currentFoodData: Partial<FoodItem>) => void
	getFilteredFood : (category: categoryProp) => FoodItem[]
}

const FoodButtons = ({ currentFoodData, categories, activeCategory, getFilteredFood, setAllFoods, setAvailableFoods, toggleEditPrompt, setFoodToEdit }: FoodButtonsProps) => {

	const [isDetailsOpen, toggleDetailsOpen] = useState<boolean>(false)
	const detailsRef = useRef<HTMLDetailsElement>(null)
	const iconSize = 16

	const closeDetails = () => {
		if (detailsRef.current) {
			detailsRef.current.removeAttribute('open');
			toggleDetailsOpen(false);
		}
	}


	const handleEditClick = () => {
		setFoodToEdit(currentFoodData)
		toggleEditPrompt(true)
		closeDetails()
	}

	const handleDeleteClick = async () => {
		try {
			const response = await axios.post('http://localhost:8000/deleteFood', { 'FoodId': currentFoodData.id })
			if (response.data.isDeleted) {
				Swal.fire({
					icon: 'success',
					title: 'Deleted',
					text: `${currentFoodData.foodName} was deleted successfully`,
					showConfirmButton: false,
					timer: 2000
				})
				closeDetails()
			}
			// setAvailableFoods(await fetchAllFoods())
			setAllFoods(await fetchAllFoods())
		}
		catch (error) {
			console.log(error)
		}
	}

	const handleOutOfStockClick = async () => {
		try {
			const response = await axios.post('http://localhost:8000/setOutOfStock', {'food': currentFoodData})
			if (response.data.isCompleted) 
			setAllFoods(await fetchAllFoods())
			closeDetails()
		}
		catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key == "Escape" && detailsRef.current?.open) {
				detailsRef.current.open = false
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	const handleDetailsClick = (event: any) => {
		event.stopPropagation()
	}

	return (
		<details id='details' ref={detailsRef} onClick={handleDetailsClick}>
			<summary style={{ height: '100%', display: 'flex', alignItems: 'center', listStyle: 'none' }}>
				<IoEllipsisVertical style={{ height: '100%' }} />
			</summary>
			<ul id='ellipsisMenu'>
				<li onClick={handleEditClick}><IoPencil size={iconSize} />Edit</li>
				<li onClick={handleDeleteClick}><MdOutlineDeleteOutline size={iconSize} />Delete</li>
				<li onClick={handleOutOfStockClick}><MdDoDisturbAlt size={iconSize} />{currentFoodData.occurence == 0 ? 'Back In-Stock' : 'Out Of Stock'}</li>
			</ul>
		</details>
	)
}

export default FoodButtons