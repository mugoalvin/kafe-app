import { FoodItem } from "@/myComponents/Food"
import { usePage } from "@inertiajs/react"
import axios from "axios"
import { useEffect, useState } from "react"

const ZTEST = () => {

	const [ allFoods, setAllFood ] = useState<FoodItem[]>()

	axios.get('http://localhost:8000/getFoods')
		.then(responce => {
			setAllFood(responce.data.foods)
		})
		.catch(error => {
			console.log(error);
		})


	return (
		<>
			<h2>All Foods</h2>
			<ol className="list-group list-group-numbered">
				{
					allFoods?.map(food => (
						<li key={food.foodName} className="list-group-item d-flex justify-content-between align-items-start">
							<div className="ms-2 me-auto">
								<div className="fw-bold">{ food.foodName }</div>
								Ksh { food.price }
							</div>
							<span className="badge text-bg-primary rounded-pill">{ food.occurence }</span>
						</li>
					))
				}
				
			</ol>
		</>
	)
}

export default ZTEST