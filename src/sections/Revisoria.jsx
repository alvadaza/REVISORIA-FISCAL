import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import "./Revisoria.css";

const services = [
  {
    id: "revisor-fiscal",
    title: "REVISOR FISCAL",
    image:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/v1772580305/zarate/revisoriafiscal_qvmfzj.jpg",
    description:
      "Encargado de dictaminar los estados financieros y velar por el sistema de control interno.",
  },
  {
    id: "propuesta-trabajo",
    title: "PROPUESTA DE TRABAJO",
    image:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/v1772543887/zarate/propuestadetrabajo_zoxxuj.jpg",
    items: [
      "1. Revisión mensual de los soportes por ingresos correspondientes al pago de las expensas de áreas comunes, como son entre otros: Administración, usufructo de salones comunales, áreas de parqueo comunales  y/o visitantes, multas y/o sanciones",
      "2. Revisión mensual de los soportes de gastos pertinentes a la operación administrativa del conjunto residencial. (Vigilancia, administración, aseo, mantenimiento, contabilidad y demás gastos necesarios para el buen esarrollo y la convivencia de la unidad residencial. ",
      "3. Revisión de los contratos laborales y por obras, derivados en cumplimiento de la ley, el reglamento, y las decisiones de la asamblea de copropietarios. ",
      "4. Revisión de las certificaciones de mantenimiento y seguridad de ascensores, motobombas, tanques de agua, fumigaciones, extinguidores y demás elementos indispensables para el buen desarrollo y disfrute de la unidad residencial.",
      "5. Revisión de las actas de asamblea y concejo de administración. ",
      "6. Confirmación del pago de seguridad social de quienes presten un servicio a la copropiedad.",
      "7. Velar por se cumpla la ley, las normas y el reglamento.",
      "8. Asesorar la efectiva participación del comité de convivencia y los demás que se desprendan de las iniciativas de la asamblea, del consejo, y la administración, para el desarrollo, la convivencia, y la calidad de vida de los copropietarios. ",
      "9. Revisar y auditar los registros contables y autenticar con mi firma los estados financieros de la Unidad Residencial. ",
      "10. Dictaminar los estados financieros del respectivo periodo fiscal. ",
      "11. Asistir y sugerir en el desarrollo de la asamblea ordinaria y/o extraordinaria en sus decisiones a que haya lugar en cumplimiento de las funciones de la Revisoría Fiscal, ajustado a la ley, la norma, el reglamento y las disposiciones de la asamblea. ",
      "12. Adelantar los arqueos de caja a mi discrecionalidad y a solicitud del consejo de administración.",
      "13. Revisar los presupuestos de ingresos y gastos. ",
      "14. Revisión del estado de cartera. ",
      "15. Asesorar a la asamblea de copropietarios en sus decisiones, que con ajuste a la ley y el reglamento así lo amerite.",
      "16. Asistir desde el conocimiento técnico y profesional al consejo de administración.",
      "17. Supervisar las actuaciones de la administración que se ajusten a la ley, las normas, y el reglamento de propiedad horizontal, en cumplimiento del mandato de la asamblea general de copropietarios.",
      "18. Presentar un informe financiero mensual resumido de los resultados expresados en los estados financieros, (Estado de Situación financiera, Estado de resultados Integral, Balance de Prueba, Flujo de Efectivo, Conciliación Bancaria, Ejecución Presupuestal y Manejo de Caja Menor), con observaciones a la gestión de la administrativa y del concejo.",
      "19. Asistir a las reuniones del consejo cuando así lo solicite y se requiera. ",
      "20. Convocar a reuniones al concejo de administración, a la administración, y a asamblea extraordinaria de copropietarios cuando se requiera estrictamente necesario. ",
      "21. Revisar el cumplimiento del pago de la póliza de áreas comunes. ",
      "22. Revisar la existencia y manejo del fondo de imprevistos. ",
      "23. Las demás acciones necesarias para el buen desarrollo, la sostenibilidad y convivencia de la copropiedad.  ",
    ],
  },
  {
    id: "transparencia",
    title: "TRANSPARENCIA Y CONTROL",
    image:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/v1772580389/zarate/TRANSPARENCIAYCONTROL_vpdmdb.jpg",
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
