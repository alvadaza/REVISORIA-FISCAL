import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import "./Revisoria.css";

const services = [
  {
    id: "revisor-fiscal",
    title: "FUNCIONES DEL REVISOR FISCAL",
    image:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/v1772580305/zarate/revisoriafiscal_qvmfzj.jpg",

    items: [
      "El Revisor Fiscal deberá ejercer una vigilancia integral sobre la gestión administrativa, financiera y legal de la copropiedad.",
      "Verifica que las operaciones se ajusten a la normatividad vigente, al reglamento de propiedad horizontal y a las decisiones de la Asamblea General y del Consejo de Administración.",
      "Velar por el adecuado manejo de los recursos, evaluará el sistema de control interno, examinará y dictaminará los estados financieros, y reportará oportunamente cualquier irregularidad o situación relevante.",
      "Actuando en todo momento con independencia, objetividad y responsabilidad profesional, sin incurrir en funciones administrativas o de coadministración.",
    ],
  },
  {
    id: "propuesta-trabajo",
    title: "PROPUESTA DE TRABAJO",
    image:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/v1772543887/zarate/propuestadetrabajo_zoxxuj.jpg",
    description:
      "Como Oferta Económica en contraprestación de mis servicios profesionales se ajustan al presupuesto aprobado en la reunión de Asamblea Ordinaria de Copropietarios. En aplicación de mis conocimientos técnicos, profesionales y experiencia como Revisor Fiscal, realizo los siguientes procedimientos en tres o cuatro asistencias presenciales y/o virtuales al mes y los días adicionales que se requieran para atender en cualquier momento presencial o virtual las necesidades o solicitudes de la administración, del Consejo de Administración, Convivencia, copropietarios y demás comités, si las circunstancias ameritan la intervención de la revisoría fiscal; desde luego las horas que se requieran. De igual manera dispongo tres horas cada cuatro meses para atender presencialmente o virtual a los copropietarios que soliciten atención de aclaraciones a los informes publicados en cartelera. (P.Q.R.S).",
    items: [
      "1. Vigilar que las operaciones que celebre o cumpla la administración se ajusten a las disposiciones legales, al reglamento de propiedad horizontal y a las decisiones de la Asamblea y del Consejo de Administración.",
      "2. Velar por el adecuado manejo de los recursos financieros de la copropiedad, verificando que los ingresos, gastos, inversiones y pagos se encuentren debidamente soportados, registrados y autorizados.",
      "3. Evaluar el sistema de control interno, emitiendo recomendaciones que contribuyan a su fortalecimiento y a la mitigación de riesgos.",
      "4. Examinar y dictaminar los estados financieros de la copropiedad, de conformidad con las normas de contabilidad y de aseguramiento de la información vigentes en Colombia.",
      "5. Informar oportunamente a la Asamblea General, al Consejo de Administración y, cuando sea necesario, a las autoridades competentes, sobre irregularidades o situaciones que puedan afectar la estabilidad financiera, jurídica o administrativa de la copropiedad.",
      "6. Verificar el cumplimiento de las obligaciones legales de la copropiedad, incluyendo aquellas de carácter contable, tributario y administrativo.",
      "7. Ejercer las demás funciones establecidas en la ley, especialmente en el Código de Comercio y en la Ley 675 de 2001, así como las que le sean asignadas por la Asamblea General dentro del marco legal.",
    ],
  },
  {
    id: "transparencia",
    title: "TRANSPARENCIA Y CONTROL",
    image:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/q_auto/f_auto/v1776467449/zarate/transparencia_imag-01_transparencia_ag1050.jpg",
    description:
      "En cumplimiento de la ley 675 de 2001con relación a las funciones y objetivos de la Revisoría Fiscal, al igual, la ley 43 de 1990 y la ley 1314 de 2009 Normas Internacionales de Información Financiera NIIF. Me permito formalizar las actividades, procedimientos e informes de Revisoría Fiscal",
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
        <h1>PROPUESTA DE VALOR</h1>
        <h2>
          “Se basa en tres pilares: control, prevención y confianza. No me
          limito a revisar cifras; analizo la gestión, identifico riesgos antes
          de que ocurran y entrego información clara para que la copropiedad
          tome mejores decisiones. Más que un revisor fiscal, soy un aliado que
          protege el patrimonio de los copropietarios y fortalece la
          administración.”
        </h2>
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

                {active.description && <p>{active.description}</p>}

                {active.items && (
                  <ul CLASSNAME="item-list">
                    {active.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
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
