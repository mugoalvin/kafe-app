import { Emoji } from "emoji-picker-react"

export interface CategoryProps {
    image : string
    name : string
    noItems : number
    isActive: boolean
    onClickEvent?: () => void
}

const Category = ({image, name, noItems, isActive, onClickEvent} : CategoryProps) => {
    return (
        <div className={"category " + (isActive ? "active" : '')} onClick={onClickEvent}>
            <div><Emoji unified={image} size={25}/></div>
            <span className="categoryName">{name}</span>
            <p>{noItems} Items</p>
        </div>
    );
};

export default Category;