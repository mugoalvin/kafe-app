import { IoEllipsisVertical, IoPencil } from 'react-icons/io5'
import { MdDoDisturbAlt, MdOutlineDeleteOutline } from 'react-icons/md'
import Swal from 'sweetalert2'
import { useEffect, useRef } from 'react'
import axios from 'axios'
import { FoodItem } from './Food'
import { fetchAllFoods } from '@/Functions/FunctionsAndValues'
import '../../css/FoodButtons.css'

interface FoodButtonsProps {
	foodId: number
	foodName: string
	setAvailableFoods: (availableFood: FoodItem[]) => void
}

const FoodButtons = ({ foodId, foodName, setAvailableFoods }: FoodButtonsProps) => {

	const detailsRef = useRef<HTMLDetailsElement>(null)
	const iconSize = 16

	const handleEditClick = () => {
		Swal.fire({
			icon: 'warning',
			title: 'Handling Edit',
			text: 'This feature is not available yet',
			showConfirmButton: false,
			timer: 2000
		})
	}

	const handleDeleteClick = async () => {
		try {
			const response = await axios.post('http://localhost:8000/deleteFood', { 'FoodId': foodId })
			if (response.data.isDeleted) {
				Swal.fire({
					icon: 'success',
					title: 'Deleted',
					text: `${foodName} was deleted successfully`,
					showConfirmButton: false,
					timer: 2000
				})
			}
			setAvailableFoods(await fetchAllFoods())
		}
		catch (error) {
			console.log(error)
		}
	}

	const handleOutOfStockClick = () => {
		Swal.fire({
			icon: 'warning',
			title: 'Handling Stock',
			text: 'This feature is not available yet',
			showConfirmButton: false,
			timer: 2000
		})
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

	// =================================[BUG] Failed to get this to work properly. When clicking the contents inside the details tag they just close unexpectedly.=================================
	{

		// useEffect(() => {
		// 	const handleFocusOut = (event: FocusEvent) => {
		// 		if (detailsRef.current?.open && !detailsRef.current.contains(event.relatedTarget as Node)) {
		// 			detailsRef.current.open = false;
		// 		}
		// 	};

		// 	document.addEventListener('focusout', handleFocusOut);

		// 	return () => {
		// 		document.removeEventListener('focusout', handleFocusOut);
		// 	};
		// }, []);

	}
	// ====================================================================================================================================================


	return (
		<details id='details' ref={detailsRef}>
			<summary style={{ height: '100%', display: 'flex', alignItems: 'center', listStyle: 'none' }}>
				<IoEllipsisVertical style={{ height: '100%' }} />
			</summary>
			<ul id='ellipsisMenu'>
				<li onClick={handleEditClick}><IoPencil size={iconSize} />Edit</li>
				<li onClick={handleDeleteClick}><MdOutlineDeleteOutline size={iconSize} />Delete</li>
				<li onClick={handleOutOfStockClick}><MdDoDisturbAlt size={iconSize} /> Out Of Stock</li>
			</ul>
		</details>
	)
}

export default FoodButtons