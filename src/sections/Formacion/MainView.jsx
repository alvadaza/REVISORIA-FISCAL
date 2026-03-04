import { motion } from "framer-motion";
import { useState } from "react";
import "./Formacion.css";

export default function MainView({ goTo }) {
  const [activeTab, setActiveTab] = useState("especializacion");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <motion.section
      className="formacion-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>Formación Académica</h1>

      {/* Botón central */}
      <motion.button
        className="circle-button"
        whileHover={{ scale: 1.1 }}
        onClick={() => goTo("contador")}
      >
        Contador Público
      </motion.button>

      {/* Card texto */}
      <div className="formacion-card">
        <p className="line strong">
          Instituto Técnico Industrial Piloto, <span>1986</span>
          <br />
          <small>Bachiller Comercial</small>
        </p>

        <div className="divider" />

        <p className="line center">
          <strong>EL SERVICIO NACIONAL DE APRENDIZAJE SENA.</strong>
          <br />
          Mayo de 1998, Bogotá,
          <br />
          <small>Seminario de Gerencia Estratégica</small>
        </p>

        <div className="divider" />

        <p className="line">
          <strong>UNIVERSIDAD ANTONIO NARIÑO</strong>, 1995–2000
          <br />
          <small>Contador Público</small>
        </p>

        <div className="divider" />

        <p className="line center">
          <strong>UNIVERSIDAD ANTONIO NARIÑO</strong>, Enero a Junio de 2001
          <br />
          <small>
            Gerencia de Negocios Internacionales – Postgrado (Un Semestre)
          </small>
        </p>

        <div className="divider" />

        <p className="line">
          <strong>UNIVERSIDAD ANTONIO NARIÑO</strong>, Junio de 2002
          <br />
          <small>
            El Comercio Electrónico como Herramienta Estratégica para la
            Creación de Ventajas Competitivas
          </small>
        </p>

        <div className="divider" />

        <p className="line center">
          <strong>CONSTRUCTORA BOLÍVAR</strong>, 2006–2007
          <br />
          <small>
            Diplomado en Propiedad Horizontal – Premio Bolívar a la Excelencia
            Nivel 1 y 2
          </small>
        </p>

        <p className="footer">
          Conocimientos administrativos, financieros, contables y de recurso
          humano en Propiedad Horizontal, Ley 675 y Reglamentos
        </p>
      </div>

      {/* Card con botones */}
      <div className="info-card dark">
        <button onClick={() => handleTabChange("especializacion")}>
          Especialización
        </button>
        <button onClick={() => handleTabChange("magister")}>Magíster</button>
        <button onClick={() => handleTabChange("seminarios")}>
          Seminarios
        </button>

        {/* Información de Especialización */}
        {activeTab === "especializacion" && (
          <div className="info-content">
            <img
              src="https://res.cloudinary.com/dl7kjajkv/image/upload/v1772543887/zarate/propuestadetrabajo_zoxxuj.jpg"
              alt="magister"
              className="magister-imagen"
            />
            <h3>Especialización en Comercio Internacional</h3>
            <p className="institution">UNIVERSIDAD SERGIO ARBOLEDA, 2013</p>
            <p className="period">Enero a diciembre 2013</p>

            <button onClick={() => goTo("especializacion")}>
              Diploma de Especialista
            </button>
          </div>
        )}

        {/* Información de Magíster */}
        {activeTab === "magister" && (
          <div className="info-content">
            <img
              src="https://res.cloudinary.com/dl7kjajkv/image/upload/v1772543887/zarate/propuestadetrabajo_zoxxuj.jpg"
              alt="magister"
              className="magister-imagen"
            />
            <h3>Magister en Comercio Internacional</h3>
            <p className="institution">UNIVERSIDAD SERGIO ARBOLEDA, 2014</p>
            <p className="period">Enero a diciembre 2014</p>

            <h3>Master of Business Administration (MBA)</h3>
            <p className="institution">
              UNIVERSIDAD SERGIO ARBOLEDA - UNIVERSIDAD DEL NORTE DE ILLINOIS
              CHICAGO, 2015
            </p>
            <p className="period">Enero a diciembre 2015</p>
            <p className="note">Doble Titulación</p>
            <button onClick={() => goTo("magister")}>
              Diploma de Magíster
            </button>
          </div>
        )}

        {/* Información de Seminarios */}
        {activeTab === "seminarios" && (
          <div className="info-content">
            <img
              src="https://res.cloudinary.com/dl7kjajkv/image/upload/v1772543887/zarate/propuestadetrabajo_zoxxuj.jpg"
              alt="magister"
              className="magister-imagen"
            />
            <h3>Seminarios</h3>
            <ul>
              <li>
                <strong>Seminario Negocios en China</strong>
                <p>ESEUNE BUSINESS SCHOOL, 2014</p>
              </li>
              <li>
                <strong>
                  Seminario Taller de Adopción Primera Vez de las NIC, NIIF
                  (IFRS)
                </strong>
                <p>C&A, CONSULTORIAS Y AUDITORIAS - 21 de noviembre de 2013</p>
              </li>
            </ul>
            <button onClick={() => goTo("seminarios")}>
              Diploma de Seminarios
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
}
