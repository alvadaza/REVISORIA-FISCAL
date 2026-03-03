import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./SeguimientoObras.css";

const media = [
  { id: 1, tipo: "img", src: "/image/OBRA1.png" },
  { id: 2, tipo: "img", src: "/image/OBRA2.png" },
  // { id: 3, tipo: "video", src: "/video/obra1.mp4" },
  { id: 4, tipo: "img", src: "/image/OBRA4.png" },
  // { id: 5, tipo: "video", src: "/video/obra2.mp4" },
  { id: 5, tipo: "img", src: "/image/OBRA5.png" },
  { id: 6, tipo: "img", src: "/image/OBRA6.png" },
  { id: 7, tipo: "img", src: "/image/OBRA7.png" },
  { id: 8, tipo: "img", src: "/image/OBRA8.png" },
  { id: 9, tipo: "img", src: "/image/OBRA9.png" },
  { id: 10, tipo: "img", src: "/image/OBRA10.png" },
  { id: 11, tipo: "img", src: "/image/OBRA11.png" },
  { id: 12, tipo: "img", src: "/image/OBRA12.png" },
  { id: 13, tipo: "img", src: "/image/OBRA13.png" },
  { id: 14, tipo: "img", src: "/image/OBRA14.png" },
  { id: 15, tipo: "img", src: "/image/OBRA15.png" },
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
