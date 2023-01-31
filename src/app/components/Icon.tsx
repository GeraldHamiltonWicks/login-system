import { ReactElement } from "react";
import { CreateAccountIcon, EyeIcon, FacebookIcon, GithubIcon, LoginIcon, LogoutIcon, PhoneIcon, ThemeIcon } from "./icons";

export type IconSelector = 
'create-account' |
'facebook' |
'github' |
'login' |
'logout' |
'phone' | 
'theme' |
'eye'
;

interface IconProps {
    iconSelector: IconSelector
}

export const Icon = (props: IconProps): ReactElement => {
    return (
    <>
    { props.iconSelector === 'create-account' && <CreateAccountIcon /> }
    { props.iconSelector === 'facebook' && <FacebookIcon /> }
    { props.iconSelector === 'github' && <GithubIcon />}
    { props.iconSelector === 'login' && <LoginIcon />}
    { props.iconSelector === 'logout' && <LogoutIcon />}
    { props.iconSelector === 'phone' && <PhoneIcon />}
    { props.iconSelector === 'theme' && <ThemeIcon />}   
    { props.iconSelector === 'eye' && <EyeIcon /> }  
    </>);
}