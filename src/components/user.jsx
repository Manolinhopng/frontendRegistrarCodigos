import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../styles/userStyles.css";

function User() {
  const [codigo, setCodigo] = useState("");
  const [codigosRegistrados, setCodigosRegistrados] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate(); // Inicializar navigate
  const email = localStorage.getItem("userEmail"); // Obtener el email desde localStorage

  const registrarCodigo = async () => {
    // Validar que el código tiene exactamente 3 dígitos
    if (codigo.length !== 3 || isNaN(codigo)) {
      setMensaje("El código debe tener exactamente 3 dígitos.");
      return;
    }

    try {
      const response = await fetch(
        "https://backend-registrar-codigos.vercel.app/api/users/verificarCodigo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: codigo, email }),
        }
      );
      const data = await response.json();

      if (data.status === "CodigoRegistrado") {
        const fechaActual = new Date().toLocaleString();
        setCodigosRegistrados((prevCodigos) => [
          ...prevCodigos,
          {
            _id: data._id,
            fechaRegistro: fechaActual,
            code: codigo,
            prize: data.prize,
          },
        ]);
        setMensaje("Código registrado correctamente.");
      } else if (data.status === "CodigoRepetido") {
        setMensaje("El código ya fue registrado previamente.");
      } else if (data.status === "CodigoNoExiste") {
        setMensaje("El código no existe.");
      } else {
        setMensaje("Ocurrió un error inesperado.");
      }
    } catch (error) {
      console.error("Error al registrar el código:", error);
      setMensaje("Error al registrar el código.");
    }

    // Restablecer el estado del código después de intentar registrar
    setCodigo("");
  };

  const obtenerCodigos = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/users/obtenerCodigo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }), // Envía el email
        }
      );
      const data = await response.json();

      if (data.status === "CodigosObtenidos") {
        setCodigosRegistrados(data.codigos);
      } else if (data.status === "SinCodigos") {
        setMensaje("No tienes códigos asignados.");
      }
    } catch (error) {
      console.error("Error al obtener los códigos:", error);
      setMensaje("Error al obtener los códigos.");
    }
  };

  useEffect(() => {
    obtenerCodigos();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Registro de Códigos</h1>
        <div className="input-group">
          <label htmlFor="codigo">Código:</label>
          <input
            type="text"
            id="codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="button-group">
          <button onClick={registrarCodigo} className="btn-register">
            Registrar
          </button>
          <button onClick={handleLogout} className="btn-salir">
            Salir
          </button>
        </div>
        {mensaje && <div className="mensaje">{mensaje}</div>}
      </header>
      <div className="table-container">
        <div className="table-header">
          <div className="table-cell">Fecha</div>
          <div className="table-cell">Código</div>
          <div className="table-cell">Premio</div>
        </div>
        <div className="table-body">
          {codigosRegistrados.map((registro) => (
            <div className="table-row" key={registro._id}>
              <div className="table-cell">{registro.fechaRegistro}</div>
              <div className="table-cell">{registro.code}</div>
              <div className="table-cell">{registro.prize}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default User;
