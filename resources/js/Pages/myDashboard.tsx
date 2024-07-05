import Header from "../Views/Header"
import { PageProps } from "@/types"
import { Head } from "@inertiajs/react"

const Menu = ({ auth } : PageProps) => {

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
			<Head title="Dashboard" />

			<Header loggedInUser={auth.user} />
			<main style={mainStyle}>
				<h1 style={h1Style}>Dashboard Coming Soon</h1>
			</main>
		</>
	);
};

export default Menu;
