import { useState } from "react";
import "../App.css";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

function NewAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://backend-registrar-codigos.vercel.app/api/users/registerAdmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (data.status === "RegistroExitoso") {
        alert("Administrador registrado con éxito.");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error al registrar admin:", error);
      alert("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="register-container">
      <main className="register-box">
        <form onSubmit={handleSubmit} className="register-form">
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
            <button type="submit" className="btn-register">
              Registrar
            </button>
            <button
              type="button"
              className="btn-salir"
              onClick={() => navigate("/login")}
            >
              Salir
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default NewAdmin;
