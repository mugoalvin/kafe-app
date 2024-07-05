import { chevronBack, chevronForward } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import Category from "./Category";
import { FoodItem } from "./Food";
import CreateCategory from "./CreateCategory";
import "../../css/Category.css";

interface CategoriesContainerProps {
    title: string;
    categories: any[]
    allFoods: FoodItem[]
    activeCategory: number | undefined
    isCustomer: boolean

    handleCategoryClick: (category : any) => void
    getFilteredFood: (category : any) => FoodItem[]
    openCategoryModal: () => void
}
export type categoryProp = {
    id: number
    title: string
    unifiedCode: string
    categoryName: string

    created_at: string
    updated_at: string
}

const CategoriesContainer = ({activeCategory, categories, title, allFoods, isCustomer, handleCategoryClick, getFilteredFood, openCategoryModal }: CategoriesContainerProps) => {

    return (
        <span id="categoriesSpan">
            <div id="orderListDiv" className="mainSectionHeader">
                <h3>{title}</h3>
                <div id="arrowDiv">
                    <IonIcon icon={chevronBack} />
                    <IonIcon icon={chevronForward} />
                </div>
            </div>

            <div id="categories">
                {
                    categories.map((category: categoryProp , index) => {
                        return (
                            <>
                                <Category key={category.categoryName} image={String(category.unifiedCode)} name={String(category.title)} noItems={category.title == "All" ? allFoods.length : getFilteredFood(category).length } onClickEvent={ () => handleCategoryClick(category) } isActive={index == activeCategory}/>
                            </>
                       )
                    })
                }
                {!isCustomer && <CreateCategory addCategory={openCategoryModal}/>}

            </div>
        </span>
    );
};

export default CategoriesContainer;