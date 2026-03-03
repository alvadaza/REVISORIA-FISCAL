import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import "./Revisoria.css";

const services = [
  {
    id: "revisor-fiscal",
    title: "REVISOR FISCAL",
    image: "/image/revisoriafiscal.jpg",
    description:
      "Encargado de dictaminar los estados financieros y velar por el sistema de control interno.",
  },
  {
    id: "propuesta-trabajo",
    title: "PROPUESTA DE TRABAJO",
    image: "/image/propuestadetrabajo.jpg",
    items: [
      "Asistencia presencial o virtual tres veces al mes.",
      "Dictamen de estados financieros cada 4 meses.",
      "Revisión de libros contables y actas.",
      "Asesoría legal, contable y administrativa.",
      "Participación en asambleas ordinarias y extraordinarias.",
      "Elaboración de informes trimestrales.",
      "Inspección física inicial de la copropiedad.",
      "Entrega de informes mensuales.",
      "Jornadas de atención PQRS.",
      "Atención individual por WhatsApp.",
    ],
  },
  {
    id: "transparencia",
    title: "TRANSPARENCIA Y CONTROL",
    image: "/image/TRANSPARENCIAYCONTROL.jpg",
    description:
      "Aplicación de la Ley 675 de 2001, reglamento de propiedad horizontal y decisiones de la asamblea.",
  },
];

export default function Revisoria() {
  const [active, setActive] = useState(null);

  return (
    <section className="revisoria">
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="revisoria-header"
      >
        <h1>REVISORÍA FISCAL</h1>
        <p>Control, transparencia y confianza empresarial</p>
      </motion.header>

      {/* GRID */}
      <div className="revisoria-grid">
        {services.map((item) => (
          <motion.article
            key={item.id}
            layoutId={item.id}
            className={`revisoria-card ${
              item.id === "propuesta-trabajo" ? "featured" : ""
            }`}
            whileHover={{ y: -12 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => setActive(item)}
          >
            <img src={item.image} alt={item.title} />
            <div className="card-overlay">
              <h3>{item.title}</h3>
            </div>
          </motion.article>
        ))}
      </div>

      {/* FULLSCREEN */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="revisoria-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.article
              layoutId={active.id}
              className="revisoria-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={active.image} alt={active.title} />

              <div className="content">
                <h2>{active.title}</h2>

                {active.items ? (
                  <ul>
                    {active.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{active.description}</p>
                )}

                <button onClick={() => setActive(null)}>Cerrar</button>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
