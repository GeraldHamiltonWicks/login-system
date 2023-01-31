import React, { ReactElement, SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { GO_TO_LOGIN_PAGE } from "../../stores/page";
import { isValidEmail, isValidPassword, removeSpacesFromString, isCodeEmpty, sendCode, isValidCode, isNotString } from "../helpers";
import { CREATE_ONE_USER } from "../../stores/users";
import { State } from "../../stores/app";
import { encryptPassword } from "../helpers/api";
import { Icon, MessageModal, PasswordInput } from "../components";

export const CreateAccountPage = (): ReactElement => {
  const dispatch  = useDispatch();
  const users = useSelector((state: State) => state.users);

  const [isToShowFirstStep, setIsToShowFirstStep] = useState(true);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [code, setCode] = useState(['', '', '', '', '']);
  const [codeError, setCodeError ] = useState('');

  const [isToHideLoadingIcon, setIsToHideLoadingIcon] = useState(true);
  const [isToShowMessageModal, setIsToShowMessageModal] = useState(false);

  const onNextButtonClick = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();

    const usersEmail = users.map(user => user.email);

    if (usersEmail.includes(email)) {
      setEmailError('Email already exist');
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError('Invalid email');
      return;
    }
    if (!isValidPassword(password)) {
      setPasswordError('Password should have at least 6 caracters');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords are different');
      return;
    }

    setIsToHideLoadingIcon(false);
    const response = await sendCode(email);
    setIsToHideLoadingIcon(true);

    // If the response isn't a string, then we have an error.
    if (isNotString(response)) {
      console.warn(response);
      setEmailError('Error: Try again latter.')
      return;
    }

    console.log(response);
    
    setIsToShowFirstStep(false);
    setEmailError('');
    setPasswordError('');
  }

  const goToLoginPage = (event: SyntheticEvent): void => {
    event.preventDefault();
    dispatch({ type: GO_TO_LOGIN_PAGE });
  }

  const setEmailInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newEmailValue = event.target.value;
    setEmail(newEmailValue);
  }

  const setPasswordInput = (newPasswordValue: string): void => {
    setPassword(newPasswordValue);
  }

  const setConfirmPasswordInput = (newConfirmPasswordValue: string): void => {
    setConfirmPassword(newConfirmPasswordValue);
  }

  const goToFirstStep = (event: SyntheticEvent): void => {
    event.preventDefault();
    setIsToShowFirstStep(true);
  }

  const setCodeInput = (event: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const singleCodeValue = event.target.value;
    const newCodeValue = [...code];
    newCodeValue[index] = singleCodeValue;
    setCode(newCodeValue);
  }

  const onSingUpClick = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();

    if (isCodeEmpty(code)) {
      setCodeError('Invalid Code');
      return;
    }

    setIsToHideLoadingIcon(false);
    const isValid = await isValidCode(code);
    setIsToHideLoadingIcon(true);
    
    if (!isValid) {
      setCodeError('Invalid Code');
      return;
    }

    setCodeError('');

    const encryptedPassword = await encryptPassword(password, email);
    dispatch({ type: CREATE_ONE_USER, data: {
      email,
      password: encryptedPassword
    }});
    
    setIsToShowMessageModal(true);
  }

  const dismissModal = (): void => {
    setIsToShowMessageModal(false);
    dispatch({ type: GO_TO_LOGIN_PAGE });
  }

  return (
    <div id="create-account">
      <div className="left-content">
        <div className="upper-content">
          <h2>
            <span>Fill all the fields</span> to create<br></br> an account !
          </h2>
          <Icon iconSelector="create-account" />
        </div>
        <div className="bottom-content footer">
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="anchor-icon"><Icon iconSelector="github"/></a>
          <a href="https://wa.me/5571996344481" target="_blank" rel="noreferrer" className="anchor-icon"><Icon iconSelector="phone"/></a>
          <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="anchor-icon"><Icon iconSelector="facebook"/></a>
        </div>
      </div>
      <div className="right-content" hidden={!isToHideLoadingIcon}>
        <h2>Create Account</h2>
        <form>
          <div className="first-step" hidden={!isToShowFirstStep}>
            <div className="email-field">
              <input type="text" placeholder="Email" value={email} onChange={setEmailInput} />
              <p>{emailError}</p>
            </div>
            <div className="password-field">
              <div className="password-input-field">
                <PasswordInput password={password} setPassword={setPasswordInput} placeholder="Password" />
                <p>{passwordError}</p>
              </div>
              <div className="confirm-password-input-field">
                <PasswordInput placeholder="Confirm Password" password={confirmPassword} setPassword={setConfirmPasswordInput} />
              </div>
            </div>
            <div className="buttons">
              <button className="primary-button" onClick={(event) => onNextButtonClick(event)}>Next</button>
              <button className="secondary-button" onClick={(event) => goToLoginPage(event)}>Cancel</button>
            </div>
          </div>
          <div className="second-step" hidden={isToShowFirstStep}>
            <h3>An email with a verification code was just sent to <span>{email}</span>, type it below:</h3>
            <div className="code-field">
              <div className="code-inputs">
                <input type="text" maxLength={1} value={code[0]} onChange={(event) => setCodeInput(event, 0)}/>
                <input type="text" maxLength={1} value={code[1]} onChange={(event) => setCodeInput(event, 1)}/>
                <input type="text" maxLength={1} value={code[2]} onChange={(event) => setCodeInput(event, 2)}/>
                <input type="text" maxLength={1} value={code[3]} onChange={(event) => setCodeInput(event, 3)}/>
                <input type="text" maxLength={1} value={code[4]} onChange={(event) => setCodeInput(event, 4)}/>
              </div>
              <p>{codeError}</p>
            </div>

            <div className="buttons">
              <button className="primary-button" onClick={(event => onSingUpClick(event))}>Sign Up</button>
              <button className="secondary-button" onClick={(event) => goToFirstStep(event)}>Go Back</button>
            </div>
            <h6>If you didn't receive any email, look into spam folder.</h6>
          </div>
        </form>
        <div className="footer">
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="anchor-icon"><Icon iconSelector="github"/></a>
          <a href="https://wa.me/5571996344481" target="_blank" rel="noreferrer" className="anchor-icon"><Icon iconSelector="phone"/></a>
          <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="anchor-icon"><Icon iconSelector="facebook"/></a>
        </div>
      </div>
      <div id="loading-icon" hidden={isToHideLoadingIcon}></div>
      <MessageModal dismissModal={dismissModal} isToShow={isToShowMessageModal}/>
    </div>
  );
};

