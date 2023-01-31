import { ReactElement } from "react";

// This icon only be imported inside `Icon.tsx`;
export const LogoutIcon = (): ReactElement => {
    return (
        <svg id="logout-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.0001 29.3333C23.3641 29.3333 29.3334 23.364 29.3334 16C29.3334 8.63601 23.3641 2.66667 16.0001 2.66667C8.63608 2.66667 2.66675 8.63601 2.66675 16C2.66675 23.364 8.63608 29.3333 16.0001 29.3333ZM16.0001 27.3333V4.66667C19.0059 4.66667 21.8885 5.86072 24.014 7.98613C26.1394 10.1115 27.3334 12.9942 27.3334 16C27.3334 19.0058 26.1394 21.8885 24.014 24.0139C21.8885 26.1393 19.0059 27.3333 16.0001 27.3333Z" fill="white"/>
        </svg>
    );
}