<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Throwable;

class OrderController extends Controller {

    // Display a listing of the resource.
    public function index() {
        $allOrders = Order::all();
        return response()->json(['allOrders' => $allOrders]);
    }

    public function selectWhere(Request $request) {
        $userId = $request->id;
        $usersOrders = Order::where('userId', $userId)->orderByDesc('serial_no')->get();
        $lastSerialNumber = Order::latest('id')->value('serial_no');
        return response()->json([
            'usersOrders' => $usersOrders,
            'lastSerialNumber' => $lastSerialNumber
        ]);
    }

    // Show the form for creating a new resource.
    public function create() {}

    // Store a newly created resource in storage.
    public function store(Request $request) {
        $orderList = $request->selectedFoods;
        $userId = $request->userId;
        $price = $request->price;

        $lastSerialNumber = Order::latest('id')->value('serial_no');

        foreach ($orderList as $order) {
            $newOrder = new Order();
            $newOrder->userId = $userId;
            $newOrder->price = $price;
            
            $newOrder->serial_no = $lastSerialNumber + 1;

            $newOrder->foodId = $order['id'];
            $newOrder->noTimesOrdered = $order['occurence'];

            $newOrder->save();
        }
        return response()->json([
            'isSuccessful' => true
        ]);
    }

    // Display the specified resource.
    public function show(Order $order) {
    }

    // Show the form for editing the specified resource.
    public function edit(Order $order) {
    }

    // Update the specified resource in storage.
    public function update(Request $request, Order $order) {
        $orderToUpdate = Order::find($order->id);
        $orderToUpdate->userId = auth()->id();
        $orderToUpdate->food = $order->food;
        $orderToUpdate->times = $order->times;

        $orderToUpdate->save();
    }

    // Remove the specified resource from storage.
    public function destroy(Request $request) {
        $serialNumber = $request->input('serialNo');

        $ordersToDelete = Order::where('serial_no', $serialNumber)->get();

        try{
            foreach($ordersToDelete as $orderToDelete) {
                $orderToDelete->delete();
            }

            return response()->json([
                'message' => "Deleted Successfully",
            ]);
        }
        catch ( Throwable $th) {
            throw $th;
        }
    }
}