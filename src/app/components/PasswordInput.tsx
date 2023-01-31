import React, { ReactElement, useState } from "react";
import { Icon } from "./Icon";

interface PasswordInputProps {
    placeholder: string;
    password: string;
    setPassword: (newPassword: string) => void;
}


export const PasswordInput = (props: PasswordInputProps): ReactElement => {
    const [inputType, setInputType] = useState('password');

    const setPassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newPassowd = event.target.value;
        props.setPassword(newPassowd);
    }

    const setType = (): void => {
        if (inputType === 'password') {
            setInputType('text');
        } else {
            setInputType('password');
        }
    }
    
    return (
        <div id="password-input-component">
        <input type={inputType} value={props.password} onChange={setPassword} placeholder={props.placeholder}/>
        <div onClick={setType}><Icon iconSelector="eye"/></div>
        </div>
    );
}