import { useEffect, useState } from "react";

interface PopupProps {
  message: string;
  duration?: number;
}

const Popup: React.FC<PopupProps> = ({ message, duration = 5000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return <div className={`popup ${visible ? "show" : ""}`}>{message}</div>;
};

export default Popup;
