import Header from "@/Views/Header"
import { PageProps } from "@/types"
import { Head } from "@inertiajs/react"

const Accounting = ({ auth } : PageProps ) => {
  	return (
		<>
			<Head title="Accounting"/>
			<Header loggedInUser={auth.user}/>
			<div>Accounting</div>
		</>
  	)
}

export default Accounting