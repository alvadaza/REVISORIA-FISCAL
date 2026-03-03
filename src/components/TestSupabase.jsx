// src/components/TestSupabase.jsx (o agrégalo al final de HojaDeVida)
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // ajusta la ruta

export default function TestSupabase() {
  const [experiencias, setExperiencias] = useState([]);
  const [certificados, setCertificados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Leer experiencias
        const { data: expData, error: expError } = await supabase
          .from("experiencias")
          .select("*")
          .order("orden", { ascending: true });

        if (expError) throw expError;
        setExperiencias(expData || []);

        // Leer certificados
        const { data: certData, error: certError } = await supabase
          .from("certificados")
          .select("*")
          .order("orden", { ascending: true });

        if (certError) throw certError;
        setCertificados(certData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando datos de Supabase...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      style={{
        padding: "2rem",
        background: "#111",
        color: "#eee",
        borderRadius: "12px",
      }}
    >
      <h2>Prueba de conexión Supabase</h2>

      <h3>Experiencias ({experiencias.length})</h3>
      {experiencias.length === 0 ? (
        <p>No hay experiencias aún. Agrega una desde el dashboard.</p>
      ) : (
        <pre
          style={{ background: "#222", padding: "1rem", borderRadius: "8px" }}
        >
          {JSON.stringify(experiencias, null, 2)}
        </pre>
      )}

      <h3>Certificados ({certificados.length})</h3>
      {certificados.length === 0 ? (
        <p>No hay certificados aún.</p>
      ) : (
        <pre
          style={{ background: "#222", padding: "1rem", borderRadius: "8px" }}
        >
          {JSON.stringify(certificados, null, 2)}
        </pre>
      )}
    </div>
  );
}
