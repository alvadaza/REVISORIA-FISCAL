import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import RadialMenu from "../components/RadialMenu";
import { supabase } from "../lib/supabaseClient";

export default function Home({ onSelect }) {
  const [tituloPrincipal, setTituloPrincipal] = useState("Cargando...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTitulo = async () => {
      try {
        const { data, error } = await supabase
          .from("configuracion")
          .select("valor")
          .eq("clave", "titulo_principal")
          .single(); // esperamos exactamente 1 fila

        if (error) throw error;

        if (data && data.valor) {
          setTituloPrincipal(data.valor);
        } else {
          setTituloPrincipal("CONJUNTO BALCONES DE PROVENZA"); // fallback
        }
      } catch (err) {
        console.error("Error al cargar título:", err);
        setError(err.message);
        setTituloPrincipal("CONJUNTO BALCONES DE PROVENZA"); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchTitulo();
  }, []);

  if (loading) {
    return (
      <section className="home">
        <div style={{ textAlign: "center", padding: "4rem" }}>Cargando...</div>
      </section>
    );
  }
  return (
    <section className="home">
      <div className="home-content">
        {/* Texto lateral */}
        <motion.div
          className="home-text"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>{tituloPrincipal}</h1>
          <h2>REVISORÍA FISCAL</h2>
          <p>
            Control, transparencia y confianza en los procesos empresariales.
          </p>
        </motion.div>

        {/* Centro: imagen + radial */}
        <div className="home-center">
          <motion.img
            src="/image/free-vector.png"
            alt="Proceso Revisoría Fiscal"
            className="home-image"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          />

          <RadialMenu onSelect={onSelect} />
        </div>
      </div>
    </section>
  );
}
