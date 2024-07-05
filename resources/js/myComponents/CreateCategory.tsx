import { IoMdAdd } from "react-icons/io";
import '../../css/CreateCaregory.css'
import '../../css/Category.css'

interface CreateFoodProps {
	addCategory : () => void
}

const CreateCategory = ({addCategory} : CreateFoodProps ) => {
	return (
		<div className='createCategory' onClick={addCategory}>
			<IoMdAdd  style={{width: 30, height: 30, fill: 'blue'}}/>
		</div>
	)
}

export default CreateCategory