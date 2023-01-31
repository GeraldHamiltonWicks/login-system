import { ReactElement, SyntheticEvent } from "react";

interface ModalProps {
    dismissModal: () => void;
    isToShow: boolean;
}


export const MessageModal = (props: ModalProps): ReactElement => {
    const dismissModal = (event: SyntheticEvent): void => {
        event.preventDefault();
        props.dismissModal();
    }

    return (
        <div id="message-modal" hidden={!props.isToShow}>
            <h4>Congratulations your account <br></br>has been successfully created.</h4>
            <button onClick={dismissModal} className="primary-button">Continue</button>
        </div>
    );
}