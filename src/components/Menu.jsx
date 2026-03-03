import { motion } from "framer-motion";
import "./Menu.css";

export default function Menu({ goTo }) {
  const items = [
    { id: "home", label: "Inicio" },
    //   { id: "formacion", label: "Formación" },
    //   { id: "revisoria", label: "Revisoría Fiscal" },
    // { id: "auditoria", label: "Auditoría" },
    //  { id: "hojadevida", label: "Hoja de Vida" },
    //{ id: "seguimientoObra", label: "Seguimiento de Obra" },
    { id: "adminTest", label: "Admin Test" },
    //  { id: "certificados-ia", label: "certificaciones-ias" },
  ];

  return (
    <motion.nav
      className="menu"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {items.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => goTo(item.id)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.label}
        </motion.button>
      ))}
    </motion.nav>
  );
}
