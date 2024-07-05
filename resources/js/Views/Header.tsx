import Dropdown from "@/Components/Dropdown";
import { User } from '@/types';
import { Link } from "@inertiajs/react";
import "../../css/Header.css";

interface HeaderProps{
    loggedInUser: User
    isCustomer ?: boolean
}

const searchBoxInputStyles = {
    borderRadius: '5px',
    paddingInline: '10px',
    border: 0,
    backgroundColor: 'var(--gray)',
}

const Header = ({loggedInUser, isCustomer} : HeaderProps) => {
    return (
        <header>
            <Link href="dashboard">
                <span id="app_name">
                    <p>Kafe</p>
                    <p>Sans</p>
                </span>
            </Link>

            <input type="text" placeholder="Search Menu" style={searchBoxInputStyles}/>

                {
                    isCustomer ? (
                    <li>
                        <ul><Link href="dashboard">Dashboard</Link></ul>
                        <ul><Link href="menu">Menu</Link></ul>
                        <ul><Link href="reservations">Reservations</Link></ul>
                        <ul><Link href="history">Order History</Link></ul>
                    </li>
                    ) : (
                        <li>
                            <ul><Link href="dashboard">Dashboard</Link></ul>
                            <ul><Link href="menu">Menu</Link></ul>
                            <ul><Link href="reservations">Reservations</Link></ul>
                        </li>
                    )
                }

            <div id="userDiv">
                <img src="/images/profileImage.png" alt="Image" />
                <Dropdown>
                    <Dropdown.Trigger>
                        <div id="userData">
                            <span>{loggedInUser.name} {loggedInUser.last_name}</span>
                            {isCustomer ? <p>Customer</p> : <p>Cashier</p>}
                        </div>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                        <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </header>
    )
}

export default Header;