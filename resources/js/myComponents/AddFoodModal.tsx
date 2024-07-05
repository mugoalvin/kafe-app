import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import Buttons from './Buttons';
import { categoryProp } from './CategoriesContainer';
import '../../css/AddFoodModal.css'

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

interface AddFoodFormProps {
	categories: categoryProp[]
	addFood: (event: React.FormEvent<HTMLFormElement>) => void
	closeModal: (event: React.FormEvent<Element>) => void
}

const AddFoodForm = ({ categories, addFood, closeModal } : AddFoodFormProps) => {

	console.log(categories)

	return (
		<Modal>
			<FormContainer>
				<form id='addFoodForm' onSubmit={(event) => addFood(event)}>
					<h2>Add Food Details</h2>
					<div>
						<input type="file" name="image"/>
					</div>
					<div>
						<input type="text" name="foodName" placeholder='Food Name'/>
						<input type="number" name="price" placeholder='Price'/>
					</div>
					<div>
						<input type="number" name="discount" placeholder='Discount' min={0} max={100}/>
					</div>
					<div>
						<select name="foodCategory" defaultValue={"default"}>
							<option disabled value='default'>Choose Food Category</option>
							{
								categories.map( foodCategory => (
									<option value={foodCategory.categoryName} key={foodCategory.title}>{foodCategory.title}</option>
								))
							}
						</select>
					</div>
					<div id='isRecomended'>
						<input type="checkbox" name="isRecomended" placeholder='Food Name'/>Recommended
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

export default AddFoodForm;