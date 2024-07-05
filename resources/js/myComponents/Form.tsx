import React from "react";
import '../../css/Authentication.css'

interface FormProps {
    action?: string;
    anchorLink?: string;
    anchorText?: string;
    buttonText: string;
    children?: any;
    title: string;
    onSubmit: (event: React.FormEvent) => void
}

const Form = ({ action, anchorLink, anchorText, buttonText, children, onSubmit, title }: FormProps) => {
    return (
        <div id="authenticationMain">
            <form action={action} method="POST" onSubmit={onSubmit}>
                <h2>{title}</h2>
                {children}
                <div>
                    <button>{buttonText}</button>
                </div>
                <a href={anchorLink}>{anchorText}</a>
            </form>
        </div>
    );
};

export default Form;