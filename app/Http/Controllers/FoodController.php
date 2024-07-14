<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Symfony\Component\Console\Input\Input;
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
        // $newFood->isRecomended = false;
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
    public function update(Request $request) {
        $request->validate([
            'id' => 'required | string',
            'foodName' => 'required | string',
            'price' => 'required',
            'discount' => 'required | min:0 | max:100',
            // 'isRecomended' => 'required'
        ]);

        $updateFood = Food::find($request->id);

        try {
            if ($request->hasFile('image')){
                $file = $request->file('image');
                $filename = $file->getClientOriginalName();
                File::delete(public_path('images/'.$updateFood->image));
                $file->move(public_path('images'), $filename);
                $updateFood->image =$filename;
            }

            $updateFood->foodName = $request->foodName;
            $updateFood->price = $request->price;
            $updateFood->discount = $request->discount;
            $updateFood->foodCategory = $request->foodCategory;
            $updateFood->isRecomended = $request->has('isRecomended') ? true : false;

            $updateFood->save();

            return response()->json([
                'isDone' => true,
                'updateFood' => $updateFood
            ]);
        }
        catch(Throwable $th) {
            return response()->json([
                'isDone' => false,
                'throwable' => $th
            ]);
        }
    }

    // Setting Food Out Of Stock
    public function outOfStock(Request $request) {
        $outOfStockFood = Food::find($request->food['id']);

        $outOfStockFood->occurence = $outOfStockFood->occurence == 0 ? 1 : 0;

        $outOfStockFood->save();

        return response()->json([
            'isCompleted' => true
        ]);
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