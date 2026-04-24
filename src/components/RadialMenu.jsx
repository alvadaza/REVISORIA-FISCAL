import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const items = [
  {
    id: "formacion",
    label: "1-Estudios",
    icon: "https://res.cloudinary.com/dl7kjajkv/image/upload/v1772508696/zarate/certificate-concept_nqhjts.png",
    angle: 288,
  },
  {
    id: "hojadevida",
    label: "2- Experiencia Revisoria",
    icon: "https://res.cloudinary.com/dl7kjajkv/image/upload/v1772508510/zarate/hoja-vida_bcfjs1.png",
    angle: 0,
  },
  {
    id: "auditoria",
    label: "3- Normas Internacionales",
    icon: "https://res.cloudinary.com/dl7kjajkv/image/upload/v1772508617/zarate/auditoria_awozlw.png",
    angle: 72,
  },

  {
    id: "seguimientoObra",
    label: "4-Propuesta de Valor",
    icon: "https://res.cloudinary.com/dl7kjajkv/image/upload/v1772508569/zarate/avance-de-obra-1024x1024_faqgxf.png",
    angle: 144,
  },
  {
    id: "certificados-ia",
    label: "5- Certificaciones adicionales",
    icon: "https://res.cloudinary.com/dl7kjajkv/image/upload/v1772508410/zarate/IAS_gfndjy.jpg",
    angle: 216,
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
