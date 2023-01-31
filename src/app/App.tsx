import { useState } from "react";
import { ReactElement } from "react";
import { CreateAccountPage, HomePage, LoginPage } from "./pages";
import { useSelector } from "react-redux";
import { State } from "../stores/app";
import "../styles/main.scss";


// Next steps:
// 1. Config Router
// 2. Config React Redux

export const App = (): ReactElement => {
  const page = useSelector((state: State) => state.page);
  const [pageNumber, setPageNumber] = useState(0);

  const changePage = (newPageNumber: number): void => {
    setPageNumber(newPageNumber);
  };

  return (
    <div className="App">
      {page === 'login' && <LoginPage />}
      {page === 'createAccount' && <CreateAccountPage />}
      {page === 'home' && <HomePage />}
    </div>
  );
};
