import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./SeguimientoObras.css";

const media = [
  {
    id: 1,
    tipo: "img",
    src: "https://res.cloudinary.com/dl7kjajkv/image/upload/v1772580686/zarate/OBRA1_mmpgy5.png",
  },
  {
    id: 2,
    tipo: "img",
    src: "https://res.cloudinary.com/dl7kjajkv/image/upload/v1772580687/zarate/OBRA2_tjvhsl.png",
  },
  // { id: 3, tipo: "video", src: "/video/obra1.mp4" },
  // { id: 5, tipo: "video", src: "/video/obra2.mp4" },
  {
    id: 5,
    tipo: "img",
    src: "https://res.cloudinary.com/dl7kjajkv/image/upload/v1772580636/zarate/OBRA5_lgw3r1.png",
  },
  {
    id: 7,
    tipo: "img",
    src: "https://res.cloudinary.com/dl7kjajkv/image/upload/v1772580432/zarate/OBRA7_hw497y.png",
  },
  {
    id: 8,
    tipo: "img",
    src: "https://res.cloudinary.com/dl7kjajkv/image/upload/v1772580433/zarate/OBRA8_g6uyjo.png",
  },

  {
    id: 10,
    tipo: "img",
    src: "https://res.cloudinary.com/dl7kjajkv/image/upload/v1772580433/zarate/OBRA10_g8onpe.png",
  },
  {
    id: 11,
    tipo: "img",
    src: "https://res.cloudinary.com/dl7kjajkv/image/upload/v1772580434/zarate/OBRA11_h7lorl.png",
  },
  {
    id: 15,
    tipo: "img",
    src: "https://res.cloudinary.com/dl7kjajkv/image/upload/v1772580430/zarate/OBRA15_samyhk.png",
  },
  {
    id: 16,
    tipo: "img",
    src: "https://res.cloudinary.com/dl7kjajkv/image/upload/v1776464161/zarate/antes_uy_despues_r9o3qc.png",
  },
];

export default function SeguimientoObras() {
  const [activo, setActivo] = useState(null);

  return (
    <section className="obras-container">
      <h1 className="obras-title">Seguimiento de Obras</h1>

      {/* MOSAICO */}
      <div className="obras-masonry">
        {media.map((item) => (
          <motion.div
            key={item.id}
            className="obra-item"
            whileHover={{ scale: 1.03 }}
            onClick={() => setActivo(item)}
          >
            {item.tipo === "img" ? (
              <img src={item.src} alt="obra" />
            ) : (
              <video src={item.src} muted preload="metadata" />
            )}
          </motion.div>
        ))}
      </div>

      {/* OVERLAY */}
      <AnimatePresence>
        {activo && (
          <motion.div
            className="obra-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivo(null)}
          >
            <motion.div
              className="obra-full"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {activo.tipo === "img" ? (
                <img src={activo.src} alt="obra grande" />
              ) : (
                <video src={activo.src} controls autoPlay />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
