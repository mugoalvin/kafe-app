import { IonIcon } from "@ionic/react"
import UserCard from "./UserCard"
import { chevronBack, chevronForward } from "ionicons/icons";
import "../../css/ListOrder.css"

const ListOrder = () => {
  return (
    <span id="orderListSpan">
        <div id="orderListDiv" className="mainSectionHeader">
            <h3>Order List</h3>
            <div id="arrowDiv">
                <IonIcon icon={chevronBack}></IonIcon>
                <IonIcon icon={chevronForward}></IonIcon>
            </div>
        </div>

        <div id="usersCards">
            <UserCard name="Mr. Mugo" index={1} noOfItems={4} />
            <UserCard name="St. John" index={2} noOfItems={5} />
        </div>
    </span>
  )
}

export default ListOrder;