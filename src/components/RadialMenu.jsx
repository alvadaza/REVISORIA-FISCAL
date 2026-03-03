import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const items = [
  {
    id: "formacion",
    label: "Formación",
    icon: "/image/certificate-concept.png",
    angle: 300,
  },
  {
    id: "revisoria",
    label: "Revisoría",
    icon: "/image/revisoria.png",
    angle: 240,
  },
  {
    id: "auditoria",
    label: "Auditoría",
    icon: "/image/auditoria.png",
    angle: 180,
  },
  {
    id: "seguimientoObra",
    label: "Seguimiento de Obra",
    icon: "/image/avance-de-obra-1024x1024.png",
    angle: 120,
  },
  {
    id: "hojadevida",
    label: "Hoja de Vida",
    icon: "/image/hoja-vida.png",
    angle: 60,
  },
  {
    id: "certificados-ia",
    label: "Certificaciones-IAS",
    icon: "/public/image/IAS.jpg",
    angle: 0,
  },
];

export default function RadialMenu({ onSelect }) {
  const [active, setActive] = useState(null);
  const [radius, setRadius] = useState(250);

  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;

      if (width <= 400) setRadius(120);
      else if (width <= 600) setRadius(160);
      else if (width <= 900) setRadius(200);
      else setRadius(250);
    };

    updateRadius(); // al cargar
    window.addEventListener("resize", updateRadius);

    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const handleSelect = (id) => {
    setActive(id);

    // esperamos a que termine la animación
    setTimeout(() => {
      onSelect(id);
      setActive(null); // 🔑 reset limpio
    }, 900);
  };

  return (
    <div className="radial-menu">
      {items.map((item) => {
        const angleRad = (item.angle * Math.PI) / 180;
        const x = radius * Math.cos(angleRad);
        const y = radius * Math.sin(angleRad);

        const isActive = active === item.id;
        const isInactive = active && active !== item.id;

        return (
          <motion.button
            key={item.id}
            className="radial-item"
            onClick={() => handleSelect(item.id)}
            animate={{
              x: isActive ? 0 : x,
              y: isActive ? 0 : y,
              scale: isActive ? 1.3 : isInactive ? 0.75 : 1,
              opacity: isInactive ? 0 : 1,
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            whileHover={!active ? { scale: 1.15 } : {}}
          >
            <img src={item.icon} alt={item.label} />
            <span>{item.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
