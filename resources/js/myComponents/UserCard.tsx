import { IonIcon } from "@ionic/react";
import { arrowForward, checkmarkDone } from 'ionicons/icons';

interface Props {
	index: number;
	name: string;
	noOfItems: number;
}

const UserCard = ({ index, name, noOfItems }: Props) => {
	return (
		<>
			<div className="usersCard">
				<div>T{index}</div>
				<div>
					<span>{name}</span>
					<p>
						{noOfItems} items{" "}
						<IonIcon icon={arrowForward}></IonIcon>
					</p>
				</div>
				<div id="overallProgress">
					<div
						id="progress"
						// clr="var(--green)"
					>
						<IonIcon icon={checkmarkDone}></IonIcon>Ready
					</div>
					<p>Ready To Serve</p>
				</div>
			</div>
            <hr />
		</>
	);
};

export default UserCard;
