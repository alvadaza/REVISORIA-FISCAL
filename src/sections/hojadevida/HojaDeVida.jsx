import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient"; // ← Asegúrate que esta importación sea correcta
import "./hojadevida.css";

export default function HojaDeVida() {
  const [activo, setActivo] = useState(null);
  const [certificados, setCertificados] = useState([]);
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos desde Supabase al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Certificados
        const { data: certData, error: certError } = await supabase
          .from("certificados")
          .select("*")
          .order("orden", { ascending: true });

        if (certError) throw certError;
        setCertificados(certData || []);

        // 2. Experiencias
        const { data: expData, error: expError } = await supabase
          .from("experiencias")
          .select("*")
          .order("orden", { ascending: true });

        if (expError) throw expError;
        setExperiencias(expData || []);
      } catch (err) {
        console.error("Error al cargar datos de Supabase:", err);
        setError("No se pudieron cargar los datos. Intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClose = () => setActivo(null);

  if (loading) {
    return (
      <section className="hoja-container">
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <h2>Cargando hoja de vida...</h2>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="hoja-container">
        <div style={{ textAlign: "center", padding: "4rem", color: "#ff6b6b" }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="hoja-container">
      <h1 className="hoja-title">Hoja de Vida</h1>

      {/* Certificados desde Supabase */}
      <div className="iconos-certificados">
        <h2>Certificados</h2>
        <div className="certificados-grid">
          {certificados.length === 0 ? (
            <p style={{ color: "#aaa" }}>No hay certificados cargados aún</p>
          ) : (
            certificados.map((cert) => (
              <motion.button
                key={cert.id}
                className="icono"
                whileHover={{ scale: 1.08, y: -8 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActivo({ tipo: "certificado", ...cert })}
              >
                {cert.titulo}
              </motion.button>
            ))
          )}
        </div>
      </div>

      {/* Mosaico de tarjetas */}
      <div className="container-hv">
        {/* Sobre mí (mantenemos estático por ahora, puedes moverlo a Supabase después) */}
        <motion.div
          className="hv-about card"
          whileHover={{ y: -10, scale: 1.015 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() =>
            setActivo({
              tipo: "about",
              contenido: (
                <>
                  <img
                    src="/image/perfil_zarate.png"
                    alt="Perfil profesional"
                    className="experience-full-image"
                  />
                  <h2 className="exp-title">SOBRE MÍ</h2>
                  <div className="green-line"></div>
                  <p>
                    Profesional con amplia experiencia como Revisor Fiscal en
                    Propiedad Horizontal (Ley 675), Contador Público, Auditor y
                    Asesor Contable, Financiero y Tributario. Especialista y
                    Magíster en comercio internacional y administración de
                    empresas. Se describe como una persona dinámica, eficiente,
                    recursiva e innovadora, con habilidades en optimización de
                    recursos, manejo de equipos y buenas relaciones
                    interpersonales. Comprometido con los principios éticos, el
                    respeto y la colaboración, tanto en trabajo en equipo como
                    individual. Su enfoque está en la implementación de procesos
                    productivos y de gestión administrativa bajo normas
                    internacionales y nacionales, con énfasis en el
                    aseguramiento financiero y de la información.
                  </p>
                </>
              ),
            })
          }
        >
          <img src="/image/perfil_zarate.png" alt="Perfil" />
          <div>
            <h3>SOBRE MÍ</h3>
            <p className="resumen">
              Profesional con amplia experiencia como Revisor Fiscal en
              Propiedad Horizontal (Ley 675), Contador Público, Auditor y
              Asesor...
            </p>
          </div>
        </motion.div>

        {/* Experiencias desde Supabase */}
        {experiencias.length === 0 ? (
          <p
            style={{ gridColumn: "1 / -1", textAlign: "center", color: "#aaa" }}
          >
            No hay experiencias cargadas aún
          </p>
        ) : (
          experiencias.map((exp) => (
            <motion.div
              key={exp.id}
              className="hv-experience card"
              whileHover={{ y: -10, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() =>
                setActivo({
                  tipo: "experience",
                  contenido: (
                    <>
                      <h2 className="exp-title">EXPERIENCIA PROFESIONAL</h2>

                      {exp.imagen_url && (
                        <img
                          src={exp.imagen_url}
                          alt={`Experiencia ${exp.items?.[0]?.empresa || "Profesional"}`}
                          className="experience-full-image"
                        />
                      )}

                      <div className="green-line"></div>

                      {exp.items?.length > 0 ? (
                        exp.items.map((item, i) => (
                          <div key={i}>
                            {i > 0 && <hr className="separador" />}
                            <div className="experiencia-item">
                              <p>
                                <strong>{item.empresa}</strong>
                                <br />
                                {item.detalle}
                                <br />
                                Cargo: {item.cargo}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p style={{ color: "#aaa" }}>
                          Sin detalles registrados
                        </p>
                      )}

                      <div className="footer-card">
                        <img
                          src="/image/TRANSPARENCIAYCONTROL.jpg"
                          alt="Logo Transparencia y Control"
                          className="footer-icon"
                        />
                      </div>
                    </>
                  ),
                })
              }
            >
              <h3>EXPERIENCIA PROFESIONAL</h3>

              {exp.items?.[0] ? (
                <>
                  <div className="experiencia-item">
                    <p>
                      <strong>{exp.items[0].empresa}</strong>
                      <br />
                      Cargo: {exp.items[0].cargo}
                    </p>
                  </div>
                  {exp.items.length > 1 && (
                    <>
                      <hr className="separador" />
                      <div className="experiencia-item">
                        <p>
                          <strong>{exp.items[1].empresa}</strong>
                          <br />
                          Cargo: {exp.items[1].cargo}
                        </p>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <p style={{ color: "#aaa", fontSize: "0.9rem" }}>
                  Sin datos de empresa
                </p>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Overlay / Modal */}
      <AnimatePresence>
        {activo && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className={
                activo.tipo === "certificado"
                  ? "certificado-full"
                  : "expanded-card"
              }
              initial={{ scale: 0.88, opacity: 0, y: 60 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
            >
              {activo.tipo === "certificado" ? (
                <>
                  {activo.imagen_url && (
                    <img src={activo.imagen_url} alt={activo.titulo} />
                  )}
                  <h2>{activo.titulo}</h2>
                </>
              ) : (
                <div
                  className={
                    activo.tipo === "about"
                      ? "content-expanded about"
                      : "content-expanded"
                  }
                >
                  {activo.contenido}
                </div>
              )}

              <button className="close-btn" onClick={handleClose}>
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
