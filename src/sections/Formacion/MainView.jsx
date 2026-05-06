import { motion } from "framer-motion";
import { useState } from "react";
import "./Formacion.css";

export default function MainView({ goTo }) {
  const [activeTab, setActiveTab] = useState("especializacion");

  return (
    <motion.section
      className="formacion-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>Formación Académica</h1>

      {/* SOBRE MÍ */}
      <motion.div
        className="sobre-mi-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <img
          src="https://res.cloudinary.com/dl7kjajkv/image/upload/q_auto/f_auto/v1772469572/zarate/perfil_zarate_cmbnf7.png"
          alt="perfil"
          className="perfil-img"
        />

        <div>
          <h2>Sobre mí</h2>
          <p>
            Profesional en Contaduría Pública con amplia experiencia en
            revisoría fiscal, auditoría y control financiero en propiedad
            horizontal.
          </p>
          <p>
            Enfoque ético, analítico y orientado a la transparencia,
            garantizando el cumplimiento normativo y la confianza en la gestión.
          </p>
        </div>
      </motion.div>

      {/* BOTÓN VER TODOS */}
      <motion.button
        className="circle-button"
        style={{
          background: "#3a4a55",
          borderColor: "#6b9b7f",
          marginTop: "10px",
          fontSize: "1.1rem",
        }}
        whileHover={{ scale: 1.05 }}
        onClick={() => goTo("all")}
      >
        Ver Todos los Diplomas
      </motion.button>

      {/* GRID */}
      <div className="formacion-layout">
        {/* IZQUIERDA */}
        <div className="formacion-card">
          <p>
            <strong>Instituto Técnico Industrial Piloto</strong>
            <br />
            Bachiller Comercial - 1986
          </p>

          <p>
            <strong>SENA</strong>
            <br />
            Gerencia Estratégica - 1998
          </p>

          <p>
            <strong>Universidad Antonio Nariño</strong>
            <br />
            Contador Público - 2000
          </p>

          <p>
            <strong>Postgrado</strong>
            <br />
            Negocios Internacionales - 2001
          </p>

          <p>
            <strong>Diplomado</strong>
            <br />
            Propiedad Horizontal - 2007
          </p>
        </div>

        {/* DERECHA */}
        <div className="info-card dark">
          <div className="tabs">
            <button onClick={() => setActiveTab("especializacion")}>
              Especialización
            </button>
            <button onClick={() => setActiveTab("magister")}>Magíster</button>
            <button onClick={() => setActiveTab("seminarios")}>
              Seminarios
            </button>
            <button onClick={() => setActiveTab("diplomado")}>Diplomado</button>
            <button onClick={() => setActiveTab("taller")}>Taller</button>
          </div>

          <div className="info-content">
            {activeTab === "especializacion" && (
              <>
                <img src="https://res.cloudinary.com/dl7kjajkv/image/upload/v1772543887/zarate/propuestadetrabajo_zoxxuj.jpg" />
                <h3>Especialización en Comercio Internacional</h3>
                <p>Universidad Sergio Arboleda - 2013</p>
              </>
            )}

            {activeTab === "magister" && (
              <>
                <img src="https://res.cloudinary.com/dl7kjajkv/image/upload/v1772543887/zarate/propuestadetrabajo_zoxxuj.jpg" />
                <h3>Magíster en Comercio Internacional - 2014</h3>

                <h3>MBA - 2015 - Doble titulación</h3>
              </>
            )}

            {activeTab === "seminarios" && (
              <>
                <img src="https://res.cloudinary.com/dl7kjajkv/image/upload/v1772543887/zarate/propuestadetrabajo_zoxxuj.jpg" />
                <h3>Seminarios</h3>

                <ul>
                  <li>Actualización Tributaria y Software Legal</li>
                  <li>NIIF - IFRS</li>
                </ul>
              </>
            )}
            {activeTab === "diplomado" && (
              <>
                <img src="https://res.cloudinary.com/dl7kjajkv/image/upload/v1772543887/zarate/propuestadetrabajo_zoxxuj.jpg" />
                <h3>Diplomado</h3>

                <ul>
                  <li>
                    Diplomado en Propiedad Horizontal - Constructora Seguros
                    Bolivar
                  </li>
                </ul>
              </>
            )}
            {activeTab === "taller" && (
              <>
                <img src="https://res.cloudinary.com/dl7kjajkv/image/upload/v1772543887/zarate/propuestadetrabajo_zoxxuj.jpg" />
                <h3>Taller</h3>

                <ul>
                  <li>
                    Certificado de Seguridad y Salud en el Trabajo - U. San Jose
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
