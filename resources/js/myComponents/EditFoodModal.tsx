import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import Buttons from './Buttons';
import { FoodItem } from './Food';
import { categories } from '@/Functions/FunctionsAndValues';
import '../../css/AddFoodModal.css'
import '../../css/EditFoodModal.css'

const Modal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	backdrop-filter: blur(1.7px);
	z-index: 2;
`;

const FormContainer = styled.div`
	border-radius: 8px;
	max-width: 90%;
`;

interface EditFoodFormProps {
	foodToEdit: Partial<FoodItem> | undefined
	editFood: (event: React.FormEvent<HTMLFormElement>) => void
	closeModal: (event: React.FormEvent<Element>) => void
}

const EditFoodForm = ({foodToEdit, editFood, closeModal} : EditFoodFormProps) => {

	return (
		<Modal>
			<FormContainer>
				<form id='addFoodForm' onSubmit={(event) => editFood(event)}>
					<h2>Change Food Details</h2>
					<img className='image' src={`/images/${foodToEdit?.image}`} alt={`Error Displaying ${foodToEdit?.foodName} Image`}/>
					<div>
						<input type="file" name="image" />
					</div>
					<input type="number" name='id' defaultValue={foodToEdit?.id} hidden/>
					<div>
						<input type="text" name="foodName" placeholder='Food Name' defaultValue={foodToEdit?.foodName} />
						<input type="number" name="price" placeholder='Price' defaultValue={foodToEdit?.price}/>
					</div>
					<div>
						<input type="number" name="discount" placeholder='Discount' min={0} max={100} defaultValue={foodToEdit?.discount}/>
					</div>
					<div>
						{/* <select name="foodCategory" defaultValue={foodToEdit?.foodCategory}> */}
						<select name="foodCategory" defaultValue={foodToEdit?.foodCategory}>
							{
								categories.map(category => {
									if (category.title != 'All'){

										return (
											<option value={category.categoryName}>{category.title}</option>
										)
									}
								})
							}
						</select>
					</div>
					<div id='isRecomended'>
						<input type="checkbox" name="isRecomended" placeholder='Food Name' defaultChecked={foodToEdit?.isRecomended}/>Recommended
					</div>
					<div id='modalButtonDiv'>
						<Buttons buttonText="Add Food" />
						<Buttons buttonText='Cancel' onClickAction={(event: React.FormEvent<Element>) => closeModal(event)}/>
					</div>
				</form>
			</FormContainer>
		</Modal>
	);
};

export default EditFoodForm;