import { formatDate } from "@/Pages/History";

const CurrentTime = () => {

    // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // const months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

	// const dateObj = new Date();
    // let year = dateObj.getFullYear();
    // let month = months[dateObj.getMonth()];
    // let day = days[dateObj.getDay()];
    // let date = dateObj.getDate()
    // let hour = dateObj.getHours()
    // let min = dateObj.getUTCMinutes().toLocaleString()

	return (
        <p>{ formatDate(new Date().toISOString()) }</p>
    );
};

export default CurrentTime;