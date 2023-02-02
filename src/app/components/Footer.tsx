import { ReactElement } from "react";
import { Icon } from "./Icon";


export const Footer = (): ReactElement => {
    return (
        <>
            <a href="https://wa.me/5571996344481" target="_blank" rel="noreferrer" className="anchor-icon"><Icon iconSelector="phone"/></a>
            <a href="https://www.linkedin.com/in/gerald-hamilton-wicks-330a53180/" target="_blank" rel="noreferrer" className="anchor-icon"><Icon iconSelector="linkedin"/></a>
            <a href="https://geraldhamiltonwicks.github.io/portfolio_web_development/index.html" target="_blank" rel="noreferrer" className="anchor-icon"><Icon iconSelector="github"/></a>
        </>
    );
}