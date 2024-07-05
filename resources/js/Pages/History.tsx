import Header from '@/Views/Header'
import { PageProps } from '@/types'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Head } from '@inertiajs/react'
import { FoodItem } from '@/myComponents/Food'
import '../../css/History.css'
import Buttons from '@/myComponents/Buttons'
import Swal from 'sweetalert2'
import HistoryFoodItem from "@/Components/HistoryFoodItem";

type OrderHistory = {
    id: number
    serial_no: number
    userId: number
    foodId: number
    noTimesOrdered: number
    created_at: string
    updated_at: string
	price: number
}

export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-UK', {
		weekday: 'short',
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	});
}

const History = ({ auth }: PageProps) => {
    const [usersOrders, setUsersOrders] = useState<OrderHistory[]>([]);
    const [foods, setFoods] = useState<FoodItem[]>([]);
    const [serialNo, setSerialNo] = useState<number | null>(null);
    let serialNumbers: number[] = [];
    let serialPrice: number | undefined;


    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const responseHistory = await axios.post('http://localhost:8000/selectOrderHistory', { 'id': auth.user.id });
                const responseFoods = await axios.get('http://localhost:8000/getFoods');

                setSerialNo(responseHistory.data.lastSerialNumber);
                setUsersOrders(responseHistory.data.usersOrders);
                setFoods(responseFoods.data.foods);
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrderHistory();

    }, [auth.user.id]);

    if (serialNo !== null) {
        for (let i = serialNo; i > 0; i--) {
            serialNumbers.push(i);
        }
    }

    const deleteOrder = async (serialNumber: number) => {
        try {
            const deleteResponse = await axios.delete('http://localhost:8000/deleteOrder', {
                data: { serialNo: serialNumber }
            });
            deleteResponse.data.message &&
                Swal.fire({
                    icon : 'success',
                    titleText: 'Order Deleted',
                    timer: 1000,
                    showConfirmButton: false
                })
            setUsersOrders(usersOrders.filter(order => order.serial_no !== serialNumber));
        } catch (error) {
            console.error("There was an error deleting the order:", error);
        }
    }

    return (
        <>
            <Head title='History' />

            <Header loggedInUser={auth.user} isCustomer/>
            <main className='historyMain'>
                {
                    serialNumbers.map((serialNo) => {
                        const ordersForSerialNo = usersOrders.filter(order => order.serial_no === serialNo);
                        if (ordersForSerialNo.length === 0) return null

                        return (
                            <div className='history' key={ordersForSerialNo[0].id}>
                                <h4 className='historyDate'>{formatDate(ordersForSerialNo[0].created_at)}</h4>
                                <div className='historyList'>
                                    {
                                        ordersForSerialNo.map((matchingOrder) => {
                                            const foodItem = foods.find(food => food.id === matchingOrder.foodId);
                                            if (!foodItem) return null;

                                            serialPrice = matchingOrder.price;

                                            return (
                                                <HistoryFoodItem matchingOrder={matchingOrder} foodItem={foodItem} />
                                            );
                                        })
                                    }
                                </div>
                                <div className='historyButtonDiv'>
                                    <span>Ksh {serialPrice}</span>
                                    <Buttons buttonText='Order Again' buttonStyle={{ backgroundColor: 'var(--green)' }} />
                                    <Buttons buttonText='Delete Order' buttonStyle={{ backgroundColor: 'var(--red)' }} onClickAction={() => deleteOrder(serialNo)} />
                                </div>
                            </div>
                        );
                    })
                }
            </main>
        </>
    )
}

export default History;
