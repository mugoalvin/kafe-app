import Header from "@/Views/Header"
import { PageProps } from "@/types"
import { Head } from "@inertiajs/react"
import EmojiPicker, { Emoji } from 'emoji-picker-react';

const Reservations = ({ auth } : PageProps ) => {

	let isCustomer = auth.user.isCustomer

	const mainStyle = {
		display: "flex",
		alignItems: 'center',
		justifyContent: 'center',
		height: '100vh',
		wifth: '100%',
	}

	const h1Style = {
		fontSize: '2rem',
		color: 'var(--greyText)',
		fontWeight: 900
	}


  	return (
		<>
			<Head title="Reservations"/>

			<Header loggedInUser={auth.user} isCustomer={isCustomer} />
			<main style={mainStyle}>
				<h1 style={h1Style}>Development is in Progress</h1>

				{/* <EmojiPicker /> */}

			</main>
		</>
  	)
}

export default Reservations