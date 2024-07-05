import { IonIcon } from "@ionic/react";
import { arrowRedoOutline, ellipsisVerticalOutline } from "ionicons/icons";
import CurrentTime from "./CurrentTime";
import { PageProps } from "@/types";
import "../../css/Recipent.css"

const Recipent = ({auth} : PageProps) => {
      
    return (
        <div id="recipentData">
            <div>
                <h3>Order Details</h3>
                <div>
                    <IonIcon icon={arrowRedoOutline} />
                    <IonIcon icon={ellipsisVerticalOutline} />
                </div>
            </div>

            <div>
                {/* <span>Recipent: Yolanda Tamara</span> */}
                <span>Recipent: {auth.user.name } { auth.user.last_name}</span>
                <CurrentTime />
                <p>#08001273198731</p>
            </div>
        </div>
    );
};

export default Recipent;