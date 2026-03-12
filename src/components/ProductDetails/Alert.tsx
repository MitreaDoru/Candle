import { useSelector } from "react-redux";
import { selectAlert } from "../../features/actions/actionsSelectors";

const Alert = () => {
  const alert = useSelector(selectAlert);
  return (
    <div className="alert">
      <h2>{alert.title}</h2>
      <h3>{alert.message}</h3>
    </div>
  );
};

export default Alert;
