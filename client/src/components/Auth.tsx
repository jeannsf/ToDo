import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm, SubmitHandler } from "react-hook-form";

interface AuthFormInputs {
  email: string;
  password: string;
  confirmPassword?: string;
}

const Auth: React.FC = () => {
  const [cookies, setCookie] = useCookies(["Email", "AuthToken"]);
  const [isLogIn, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>();

  const onSubmit: SubmitHandler<AuthFormInputs> = async (data) => {
    setError(null);

    if (!isLogIn && data.password !== data.confirmPassword) {
      setError("Certifique-se de que as senhas correspondam!");
      return;
    }
    if (!data.email || !data.password) {
      setError("E-mail e senha devem ser fornecidos");
      return;
    }

    try {
      const endpoint = isLogIn ? "login" : "signup";
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email, password: data.password }),
        }
      );
      const responseData = await response.json();

      if (responseData.detail) {
        setError(responseData.detail);
      } else {
        setCookie("Email", responseData.email);
        setCookie("AuthToken", responseData.token);
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred");
    }
  };

  const viewLogin = (status: boolean): void => {
    setError(null);
    setIsLogin(status);
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="header-section">
            <h2>{isLogIn ? "BEM VINDO DE VOLTA!" : "CADASTRE-SE"}</h2>
            <p>{isLogIn ? "FAÇA O LOGIN E CONTINUE" : ""}</p>
          </div>

          <input
            type="email"
            placeholder="email"
            {...register("email", { required: "Email é obrigatório" })}
          />
          {errors.email && <p className="error-msg">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="password"
            {...register("password", { required: "Senha é obrigatória" })}
          />
          {errors.password && <p className="error-msg">{errors.password.message}</p>}

          {!isLogIn && (
            <>
              <input
                type="password"
                placeholder="confirm password"
                {...register("confirmPassword", { required: "Confirmação de senha é obrigatória" })}
              />
              {errors.confirmPassword && (
                <p className="error-msg">{errors.confirmPassword.message}</p>
              )}
            </>
          )}

          {error && <p className="error-msg">{error}</p>}

          <input
            type="submit"
            className="create"
            value={isLogIn ? "Entrar" : "Cadastrar"}
          />

          <div className="auth-options">
            <p>
              {isLogIn ? "Não tem login?" : "Já tem uma conta?"}{" "}
              <a href="#" onClick={() => viewLogin(!isLogIn)}>
                {isLogIn ? "Cadastre-se" : "Entre"}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
