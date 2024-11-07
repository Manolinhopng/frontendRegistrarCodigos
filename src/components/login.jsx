import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://backend-registrar-codigos.vercel.app/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Respuesta del backend:", data);

      if (data.status === "Bienvenido") {
        localStorage.setItem("userEmail", email);
        if (data.role === "admin") {
          navigate("/admin");
        } else if (data.role === "user") {
          navigate("/user");
        }
      } else if (data.status === "Error") {
        alert("Credenciales incorrectas, por favor intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error durante el login:", error);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <>
      <header className="login-header">
        <h1>¡Gana Como Loco!</h1>
        <h2>Participa y gana nada</h2>
      </header>
      <div className="login-container">
        <main className="login-main">
          <h2>Inicia sesión</h2>
          <p>Ingresa tus datos para participar</p>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="button-group">
              <button type="submit" className="btn-login">
                Entrar
              </button>
              <button
                type="button"
                onClick={handleRegisterRedirect}
                className="btn-register"
              >
                Registrar
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default Login;
