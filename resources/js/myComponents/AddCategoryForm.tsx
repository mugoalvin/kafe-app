import React, { useState } from 'react';
import styled from 'styled-components';
import Buttons from './Buttons';
import EmojiPicker, { Emoji } from 'emoji-picker-react';
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
`;

const FormContainer = styled.div`
	border-radius: 8px;
	max-width: 90%;
`;

interface AddCategoryFormProps {
	addCategory: (event: React.FormEvent<HTMLFormElement>) => void
	closeModal: (event: React.FormEvent<Element>) => void
}

const AddCategoryForm = ({ addCategory, closeModal } : AddCategoryFormProps) => {
	const [selectedEmoji, setSelectedEmoji] = useState<object>()
	const [isEmojiOpen, setEmojiOpen] = useState<boolean>(false)

	const toggleEmojiOPen = () => {
		setEmojiOpen(!isEmojiOpen)
	}

	const toggleEmojiOPenStyle = {
		height: 40,
		borderRadius: 10,
		cursor: 'pointer',
		backgroundColor: 'var(--white)'
	}

	const handleEmojiClick = (emoji : any) => {
		setSelectedEmoji(emoji)
	}

	const emojiCategories = [
		// { name: 'Smileys & People', category: 'smileys_people' },
		// { name: 'Animals & Nature', category: 'animals_nature' },
		{ name: 'Food & Drink', category: 'food_drink' },
		// { name: 'Travel & Places', category: 'travel_places' },
		// { name: 'Activities', category: 'activities' },
		// { name: 'Objects', category: 'objects' },
		// { name: 'Symbols', category: 'symbols' },
		// { name: 'Flags', category: 'flags' }
	]

	return (
		<Modal>
			<FormContainer>
				
				<form id='addFoodForm' onSubmit={(event) => addCategory(event)}>
					<h2>Add Category Details</h2>
					<div>
						<input type="text" name="title" placeholder='New Category Name'/>
					</div>
					<span>
						<EmojiPicker onEmojiClick={handleEmojiClick} categories={emojiCategories} open autoFocusSearch={false}/>
					</span>
					<div >
						<input readOnly hidden type="text" name='unified' value={selectedEmoji?.unified || ""} />
						Selected Emoji: 
						{selectedEmoji && <Emoji unified={selectedEmoji.unified} />}
					</div>
					<div id='modalButtonDiv'>
						<Buttons buttonText="Add Category" />
						<Buttons buttonText='Cancel' onClickAction={(event: React.FormEvent<Element>) => closeModal(event)}/>
					</div>
				</form>
			</FormContainer>
		</Modal>
	)
}

export default AddCategoryForm