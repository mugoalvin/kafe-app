import { CSSProperties } from 'react';
import '../../css/Buttons.css'

interface Button {
    buttonText : string
    buttonStyle ?: CSSProperties
    onClickAction ? : (e? : any) => void
}

const styling : CSSProperties = {
	height: 40,
	fontSize: 14,
	fontWeight: 900,
	border: 0,
	borderRadius: 10,
	paddingInline: 10,
	color: 'var(--white)',
	backgroundColor: 'var(--green)',
}

const Buttons = ({buttonText, buttonStyle, onClickAction} : Button) => {
    const combinedStyling = {
        ...styling, ...buttonStyle
    }
	return (
        <button onClick={onClickAction} style={combinedStyling} >{buttonText}</button>
    )
}

export default Buttons;