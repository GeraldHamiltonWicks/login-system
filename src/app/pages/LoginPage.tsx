import React, { ReactElement, SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { GO_TO_CREATE_ACCOUNT_PAGE, GO_TO_HOME_PAGE } from "../../stores/page";
import { isUserAuthenticated, isValidEmail, isValidPassword, storage } from "../helpers";
import { State } from "../../stores/app";
import { Footer, Icon, PasswordInput } from "../components";

export const LoginPage = (): ReactElement => {
  const dispatch  = useDispatch();
  const users = useSelector((state: State) => state.users);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  

  const signIn = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();

    const usersEmail = users.map(user => user.email);

    if (!usersEmail.includes(email)) {
      setEmailError(`Email doesn't exist`);
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError('Invalid email');
    }
    if (!isValidPassword(password)) {
      setPasswordError('Password should have at least 6 caracters');
      return;
    }
    const isAuthenticated = await isUserAuthenticated(email, password, users);

    if (!isAuthenticated) {
      setEmailError('Invalid user or password');
      return;
    }
    
    storage.saveUserID(users, email);
    setEmailError('');
    setPasswordError('');
    dispatch({ type: GO_TO_HOME_PAGE });
  };

  const createAccount = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch({ type: GO_TO_CREATE_ACCOUNT_PAGE });
  }

  const setEmailInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  }

  const setPasswordInput = (newPassword: string): void => {
    setPassword(newPassword);
  }

  return (
    <div id="login">
      <div className="left-content">
        <div className="upper-content">
          <h2>
            <span>Welcome</span> to our system !
          </h2>
          <Icon iconSelector="login"/>
        </div>
        <div className="bottom-content footer">
          <Footer />
        </div>
      </div>
      <div className="right-content">
        <h2>Login Page</h2>
        <form>
          <div className="email-field">
            <input type="text" placeholder="Email" onChange={setEmailInput} />
            <p>{emailError}</p>
          </div>
          <div className="password-field">
            <PasswordInput password={password} setPassword={setPasswordInput} placeholder="Password" />
            <p>{passwordError}</p>
            <h6>
              Don't have an account ?
              <button onClick={createAccount}>click here to create</button>
            </h6>
          </div>

          <button className="primary-button" onClick={(event) => signIn(event)}>Sign in</button>
        </form>
        <div className="footer">
          <Footer />
        </div>
      </div>

    </div>
  );
};
