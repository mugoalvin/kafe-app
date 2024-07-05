<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Throwable;

class FoodController extends Controller {
    // Display a listing of the resource.
    public function index() {
        $allFoods = Food::all();
        return response()->json(['foods' => $allFoods]);
    }

    // Show the form for creating a new resource.
    public function create() {
        //
    }

    // Store a newly created resource in storage.
    public function store(Request $request) {
        $newFood = new Food();

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);
            $newFood->image =$filename;
        }

        $newFood->foodName = $request->input('foodName');
        $newFood->price =  (int)$request->input('price');
        $newFood->discount = (int)$request->input('discount');
        $newFood->foodCategory = $request->input('foodCategory');
        $newFood->isRecomended = filter_var($request->input('isRecomended'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false;
        $newFood->occurence = 1;

        $newFood->save();

        return response()->json([
            'newFood' => $newFood
        ]);
    }


    // Display the specified resource.
    public function show(Food $food) {}

    // Show the form for editing the specified resource.
    public function edit(Food $food) {
        $foodToEdit = Food::find($food);
        return $foodToEdit;
    }

    // Update the specified resource in storage.
    public function update(Request $request, Food $food) {
        $updateFood = Food::find($food->id);
        $updateFood->foodName = $request->foodName;
        $updateFood->image = $request->image;
        $updateFood->price = $request->price;
        $updateFood->isRecomended = $request->isRecomended;
        $updateFood->discount = $request->discount;
        $updateFood->foodCategory = $request->foodCategory;
        $updateFood->occurence = $request->occurence;

        $updateFood->save();
    }

    // Remove the specified resource from storage.
    public function destroy(Request $request) {
        try{
            $foodToDelete = Food::findOrFail($request->FoodId);
            $foodToDelete->delete();
            return response()->json(['isDeleted' => true]);
        }
        catch(Throwable $th) {
            throw $th;
        }
    }
}