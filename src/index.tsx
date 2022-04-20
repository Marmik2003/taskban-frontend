import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouterProps, Router } from "react-router-dom";
import { BrowserHistory } from "history";
import { history as customHistory } from "./history";
import App from "./App";
import "./index.sass";
import "./css/app.sass";
import 'react-toastify/dist/ReactToastify.css';

interface Props extends BrowserRouterProps {
  history: BrowserHistory;
}
export const CustomRouter = ({ basename, history, children }: Props) => {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });
  React.useLayoutEffect(() => history.listen(setState), [history]);
  return (
    <Router
      navigator={customHistory}
      location={state.location}
      navigationType={state.action}
      children={children}
      basename={basename}
    />
  );
};  


ReactDOM.render(
  <React.StrictMode>
    <CustomRouter history={customHistory}>
      <App />
    </CustomRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
