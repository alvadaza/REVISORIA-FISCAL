// src/views/CertificadosIA.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import "./certificados-ia.css"; // crea este archivo después

export default function CertificadosIA() {
  const [certificados, setCertificados] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificadosIA = async () => {
      try {
        const { data, error } = await supabase
          .from("certificados_ia") // puedes usar 'certificados' si prefieres reutilizar la misma tabla
          .select("*")
          .order("orden", { ascending: true });

        if (error) throw error;
        setCertificados(data || []);
      } catch (err) {
        console.error("Error al cargar certificados IAS:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificadosIA();
  }, []);

  const openCertificado = (cert) => {
    setSelectedCert(cert);
  };

  const closeCertificado = () => {
    setSelectedCert(null);
  };

  if (loading) {
    return <div className="loading">Cargando certificados IAS...</div>;
  }

  return (
    <section className="certificados-ia">
      <h1>Certificados IAS</h1>
      <p>Certificaciones</p>

      <div className="iconos-grid">
        {certificados.length === 0 ? (
          <p className="no-data">No hay certificados IA cargados aún</p>
        ) : (
          certificados.map((cert) => (
            <motion.div
              key={cert.id}
              className="icono-cert"
              whileHover={{ scale: 1.12, y: -8 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openCertificado(cert)}
            >
              {cert.imagen_url ? (
                <img
                  src={cert.imagen_url}
                  alt={cert.titulo}
                  className="icono-img"
                />
              ) : (
                <div className="icono-placeholder">
                  <span>{cert.titulo.substring(0, 2).toUpperCase()}</span>
                </div>
              )}
              <span className="cert-titulo">{cert.titulo}</span>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal al hacer clic */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCertificado}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.7, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={closeCertificado}>
                ×
              </button>

              <h2>{selectedCert.titulo}</h2>

              {selectedCert.imagen_url ? (
                <img
                  src={selectedCert.imagen_url}
                  alt={selectedCert.titulo}
                  className="cert-full-img"
                />
              ) : (
                <p>No hay imagen disponible para este certificado</p>
              )}

              {selectedCert.descripcion && (
                <p className="descripcion">{selectedCert.descripcion}</p>
              )}

              {selectedCert.fecha && (
                <p className="fecha">Obtenido: {selectedCert.fecha}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
