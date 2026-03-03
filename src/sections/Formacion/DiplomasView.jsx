import { motion } from "framer-motion";
import { diplomas } from "./data";

export default function DiplomasView({ type, goBack }) {
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

      <h2>{type.toUpperCase()}</h2>

      <div className="diplomas-grid">
        {diplomas[type].map((img, i) => (
          <motion.img key={i} src={img} whileHover={{ scale: 1.05 }} />
        ))}
      </div>
    </motion.section>
  );
}
