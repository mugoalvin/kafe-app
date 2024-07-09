// export const categories: [string, string, FoodCategoryKey | Array<FoodCategoryKey>][] = [
//     ["All Menu", "🍽️", "all"],
//     ["Main Dishes", "🥘", "main"],
//     ["Burger", "🍔", "burger"],
//     ["Juice", "🧃", "juice"],
//     ["Bento", "🍱", "bento"],
//     ["Salad", "🥗", "salad"],
//     ["Tacos", "🌮", "spanish"],
//     ["Sea Food", "🍣", "seaFood"],
//     ["Pancake", "🥞", "pancake"],
//     ["Ice Cream", "🍨", "iceCream"],
//     ["Fruits", "🍎", "fruits"],
// ];



import { categoryProp } from "@/myComponents/CategoriesContainer";
import { FoodItem } from "@/myComponents/Food";
import axios from "axios";

export let FoodCategories = ['all', 'main', 'burger', 'juice', 'bento', 'salad', 'spanish', 'seaFood', 'pancake', 'iceCream', 'fruits', 'others']
// export type FoodCategoryKey = 'all' | 'main' | 'burger' | 'juice' | 'bento' | 'salad' | 'spanish' | 'seaFood' | 'pancake' | 'iceCream' | 'fruits' | 'others';
export type FoodCategoryKey = (typeof FoodCategories)[number]


export async function fetchAllCategories() {
    try {
        const response = await axios.get('http://localhost:8000/getCategories');
        categories = response.data.allCategories;
        return categories;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function fetchAllFoods() {
    try {
        const response = await axios.get('http://localhost:8000/getFoods');
        allFetchedFoods = response.data.foods;
        return allFetchedFoods;
    } catch (error) {
        console.log(error);
        return [];
    }
}

// Function to initialize and fetch all data
export async function initializeData() {
    await fetchAllCategories();
    await fetchAllFoods();
}

export function getAllFoods() {
    return fetchAllFoods();
}


// Ensure data is loaded before using the variables
initializeData().then(() => {
    // console.log('Data loaded successfully');
    // console.log('Categories:', categories);
    // console.log('All Foods:', allFoods);
}).catch(error => {
    console.error('Error loading data:', error);
})

// export let categories: [string, string, FoodCategoryKey | Array<FoodCategoryKey>][] = []
export let categories: categoryProp[] = []
export let allFetchedFoods: FoodItem[] = []