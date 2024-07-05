<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;
use Throwable;

class CategoriesController extends Controller
{
    // Read all categories
    function index() {
        $categories = Categories::all();
        return response()->json(['allCategories' => $categories]);
    }
    // Read category by id
    // Add category
    function store(Request $request) {
        $newCategory = new Categories;

        $request->validate([
            'title' => 'required',
            'unified' => 'required',
            'categoryName' => 'required'
        ]);

        $newCategory->title = $request->title;
        $newCategory->unifiedCode = $request->unified;
        $newCategory->categoryName = $request->categoryName;

        $newCategory->save();
        return response()->json([
            'isDone' => true,
            'category' => $newCategory
        ]);
    }
    // Update category
    // Delete category
}