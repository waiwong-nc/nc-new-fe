import { Icon } from "semantic-ui-react";
import "./errorPage.scss";
const ErrorPage = (props) => {
  return (
    <div className={`error ${props._class}`}>
      <Icon  ambulance="true" name="ambulance" />
      <p>{props.children}</p>
    </div>
  );
};

export default ErrorPage;
