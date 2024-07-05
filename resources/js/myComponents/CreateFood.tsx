import { IoMdAdd } from "react-icons/io";
import '../../css/CreateFood.css'

interface CreateFoodProps {
	createFoodClickEvent ? : () => void
}

const CreateFood = ({createFoodClickEvent} : CreateFoodProps ) => {
	return (
		<div className='food createFoodDiv' onClick={createFoodClickEvent}>
			<IoMdAdd  style={{width: 30, height: 30, fill: 'blue'}}/>
		</div>
	)
}

export default CreateFood