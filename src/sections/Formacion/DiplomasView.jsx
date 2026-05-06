import { motion } from "framer-motion";
import { diplomas } from "./data";

export default function AllDiplomasView({ goBack }) {
  return (
    <motion.section
      className="diplomas-view"
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <button className="back-btn" onClick={goBack}>
        ← Volver
      </button>

      <h2>TODOS MIS DIPLOMAS Y CERTIFICADOS</h2>

      <div className="all-diplomas-container">
        {Object.entries(diplomas).map(([category, images]) => (
          <div key={category} className="diploma-category">
            <h3 className="category-title">
              {category === "contador" && "Contador Público"}
              {category === "especializacion" && "Especialización"}
              {category === "magister" && "Magíster"}
              {category === "seminarios" && "Seminarios y Cursos"}
              {category === "diplomado" && "Diplomado"}
              {category === "taller" && "Talleres y Certificados"}
              <span className="count">({images.length})</span>
            </h3>

            <div className="diplomas-grid">
              {images.map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  alt={`${category} ${i + 1}`}
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.4 }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
