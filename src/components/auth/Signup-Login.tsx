import { useState, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alert, closeAlert, loginUser } from "../../features/actions/authSlice";
import type { AppDispatch } from "../../app/store";
import {
  selectAlert,
  selectMode,
  selectUser,
} from "../../features/actions/actionsSelectors";
import Alert from "../ProductDetails/Alert";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
}

const Login = ({ isOpen, onClose }: LoginProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const mode = useSelector(selectMode);
  const [loading, setLoading] = useState(false);
  const alertState = useSelector(selectAlert);
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (!isOpen) return null;

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === "signup" && form.password !== form.confirmPassword) {
      dispatch(
        alert({
          title: "Passwords",
          message: "Please make sure both password fields match.",
        }),
      );
      return;
    }
    setLoading(true);
    const url =
      mode === "login"
        ? "https://candle-1-ax6h.onrender.com/login"
        : "https://candle-1-ax6h.onrender.com/signup";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (mode !== "login") {
        dispatch(alert(data.alert));
        setLoading(false);
        setTimeout(() => {
          dispatch(closeAlert());
          onClose();
        }, 2000);
      } else {
        localStorage.setItem("token", data.token);
        dispatch(loginUser(data.user));
        setLoading(false);
        dispatch(alert(data.alert));
        setTimeout(() => {
          dispatch(closeAlert());
          onClose();
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth">
      {(!user || user.isAdmin) && (
        <div className="auth__overlay">
          <div className="auth__modal">
            <button className="auth__close-btn" onClick={onClose}>
              ✕
            </button>

            {(!user || user.isAdmin) && (
              <div className="auth__content">
                <h2 className="auth__title">
                  {mode === "login" ? "Autentificare" : "Cont Nou"}
                </h2>

                <form className="auth__form" onSubmit={submitHandler}>
                  <div className="auth__input-group">
                    <input
                      type="email"
                      name="email"
                      className="auth__input"
                      placeholder="Email"
                      onChange={changeHandler}
                      required
                    />
                  </div>

                  <div className="auth__input-group">
                    <input
                      type="password"
                      name="password"
                      className="auth__input"
                      placeholder="Parolă"
                      onChange={changeHandler}
                      required
                    />
                  </div>

                  {mode === "signup" && (
                    <div className="auth__input-group">
                      <input
                        type="password"
                        name="confirmPassword"
                        className="auth__input"
                        placeholder="Confirmă Parola"
                        onChange={changeHandler}
                        required
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="auth__submit-btn"
                  >
                    {!loading
                      ? mode === "login"
                        ? "Intră în cont"
                        : "Înregistrare"
                      : "Loading..."}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
      {alertState.showAlert && <Alert />}
    </div>
  );
};

export default Login;
