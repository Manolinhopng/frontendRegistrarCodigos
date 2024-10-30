import { useEffect, useState } from "react";
import "../App.css";
import "../styles/adminStyles.css";

function Admin() {
  const [codesInfo, setCodesInfo] = useState([]);
  const [mensaje, setMensaje] = useState("");
  
  useEffect(() => {
    const fetchCodesInfo = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/users/obtenerCodigos"
        );

        if (!response.ok) {
          const text = await response.text();
          console.error("Error en la respuesta:", text);
          setMensaje("Error al obtener la información de los códigos.");
          return;
        }

        const data = await response.json();
        console.log("Datos obtenidos del backend:", data);

        if (data.status === "Exito") {
          setCodesInfo(data.data);
          setMensaje("");
        } else {
          setMensaje("No se encontró información.");
          console.error("Error al obtener la información:", data.message);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        setMensaje("Error en la solicitud.");
      }
    };

    fetchCodesInfo();
  }, []);

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Ganadores</h1>
        {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}
        <button
          onClick={() => {
            localStorage.removeItem("userEmail");
            window.location.href = "/login";
          }}
          className="btn-salir"
        >
          Salir
        </button>
      </header>
      <div className="table-container">
        <div className="table-header">
          <div className="table-cell">Fecha</div>
          <div className="table-cell">Nombre</div>
          <div className="table-cell">Cédula</div>
          <div className="table-cell">Teléfono</div>
          <div className="table-cell">Código</div>
          <div className="table-cell">Premio</div>
        </div>
        <div className="table-body">
          {codesInfo.map((code, index) => (
            <div className="table-row" key={index}>
              <div className="table-cell">{code.fecha}</div>
              <div className="table-cell">{code.nombre}</div>
              <div className="table-cell">{code.cedula}</div>
              <div className="table-cell">{code.telefono}</div>
              <div className="table-cell">{code.codigo}</div>
              <div className="table-cell">{code.premio}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
