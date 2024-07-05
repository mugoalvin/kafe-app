import Header from "@/Views/Header"
import { PageProps } from "@/types"
import { Head } from "@inertiajs/react"

const Delivery = ({ auth } : PageProps ) => {
  	return (
		<>
			<Head title="Delivery"/>
			<Header loggedInUser={auth.user}/>
			<div>Delivery</div>
		</>
  	)
}

export default Delivery