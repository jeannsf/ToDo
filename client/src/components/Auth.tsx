import React, { useState } from "react";
import { useCookies } from "react-cookie";

const Auth: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["Email", "AuthToken"]);
  const [isLogIn, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const viewLogin = (status: boolean): void => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>,
    endpoint: string
  ): Promise<void> => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError("Certifique-se de que as senhas correspondam!");
      return;
    }
    if (!email || !password) {
      setError("E-mail e senha devem ser fornecidos");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (data.detail) {
        setError(data.detail);
      } else {
        setCookie("Email", data.email);
        setCookie("AuthToken", data.token);
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogIn ? "Por favor, faça o login!" : "Por Favor, se cadastre!"}</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogIn && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}
          />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogIn
                ? "rgb(255, 255, 255)"
                : "rgb(188, 188, 188)",
            }}
          >
            Cadastro
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogIn
                ? "rgb(255, 255, 255)"
                : "rgb(188, 188, 188)",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
