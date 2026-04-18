import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye } from "react-icons/fi";
import "./Auditoria.css";

const auditorias = [
  {
    id: 1,
    titulo: "Auditoría Administrativa",
    imagen:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/q_auto/f_auto/v1776465219/zarate/Mvy5h_vfsyt9.jpg",
    descripcion:
      "Evaluación que determina la eficiencia, cumplimiento de sus objetivos, planes y programas, estructura organica, procedimientos y controles, el personal, las instalaciones, medio en el cual se desarrolla, operación y el ahorro en costos. Se llevará a cabo mediante la revisión de:.",
    lista: [
      "1 - Normas NIF",
      "2 - Libros de Contabilidad.",
      "3- Libros de Actas de Asamblea.",
      "4 - Libro de Actas de Consejo.",
      "5 - Archivo de Correspondencia.",
      "6 - Libro y/o Registro de Propietarios.",
      "7 - Libro y/o Registro de Mascotas.",
      "8 - Existencia, conformaci´n y desempeño del Comité de Convivencia.",
      "9 - Existencia y ejecución de contratos laborales o prestación de servicios.",
      "10 - Existencia del Manual de Firmas Autorizadas.",
      "Revison de las nosrmas conexas al buen funcionamiento de la copropiedad. SG-SST, ley HABEAS DATA, Normas de convivencia, entre otras.",
    ],
  },
  {
    id: 2,
    titulo: "Auditoría de Control Interno",
    imagen:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/v1776465994/zarate/BvPQp_eyorwe.jpg",
    descripcion:
      "Determina si existen y son adecuadas las medidas de control interno, de conversación y custodia de los bienes de la unidad residencial. Se evaluan los Siguientes Aspectos: ",
    lista: [
      "1 - Existencia de Pólizas de Seguros, cobertura y vigencia.",
      "2 - Revisión de las cuentas Bancarias.",
      "3 - Existencia de Formatos y Emisión de Facturas o Cuentas de Cobro por consepto de Expensas Comunes.",
      "4 - Existencia de formatos Comprobantes de ingresos y gastos.",
      "5 - Formato de Consignaciones.",
      "6 - Reglamento Caja Menos.",
      "7 - Manual de Compras, entre otros.",
    ],
  },
  {
    id: 3,
    titulo: "Auditoría Operacional",
    imagen:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/q_auto/f_auto/v1776464503/zarate/e69e438b-4ab2-4790-a6ec-f51c68206684_rvrt0l.png",
    descripcion:
      "evaluacion de la planeacíon, organización, dirección y control por procesos operativos, según los criterios de: economía, eficiencia, efectividad u equidad. Se evaluan los siguientes aspectos:",
    lista: [
      "1 - Procedimientos y parámetyros establecidos en el reglamento, según normas o decisiones de los organismos de dirección, vigilancia y control.",
      "2 - Asamblea de Propietarios.",
      "3 - Consejo de administración.",
      "4 - Administrador.",
      "5 - Contador.",
      "6 - Revisor Fiscal.",
      "Normas para: Recaudo de cartera, acueductos de pago para deudores morosos; destinación y uso de zonas comunes, parqueaderos, salon comunal, parámetros para la tenencia de mascotas, imposicón de multas, entre otras.",
    ],
  },
  {
    id: 4,
    titulo: "Auditoría Financiera",
    imagen:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/q_auto/f_auto/v1776466285/zarate/1yVWJ_k4nswd.jpg",
    descripcion:
      "Revisión e inspeccion de la información contable, financiera y tributaria. Se evaluan los siguientes aspectos:",
    lista: [
      "1 - Existencia y aplicación de las normas NIF.",
      "2 - Existencia de informes mensuales.",
      "3 - Dictaminar los estados financieros.",
    ],
  },
];

export default function ProcesoAuditoria() {
  const [activo, setActivo] = useState(null);
  const [verLista, setVerLista] = useState(null);

  return (
    <section className="auditoria-container">
      <h1 className="auditoria-title">Proceso de Auditoría</h1>

      {/* MOSAICO */}
      <div className="auditoria-grid">
        {auditorias.map((item) => (
          <motion.div
            key={item.id}
            className="auditoria-card"
            whileHover={{ scale: 1.04 }}
            onClick={() => setActivo(item)}
          >
            <img src={item.imagen} alt={item.titulo} />
            <div className="auditoria-content">
              <h3>{item.titulo}</h3>
              <p>{item.descripcion}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* OVERLAY FULLSCREEN */}
      <AnimatePresence>
        {activo && (
          <motion.div
            className="auditoria-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivo(null)}
          >
            <motion.div
              className="auditoria-full"
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={activo.imagen} alt={activo.titulo} />
              <h2>{activo.titulo}</h2>
              <p>
                {activo.descripcion}
                <button
                  className="detalles"
                  onClick={() => setVerLista(activo)}
                >
                  {" "}
                  <FiEye />
                  Ver detalles
                </button>
              </p>
              <button onClick={() => setActivo(null)}>Cerrar</button>
            </motion.div>
          </motion.div>
        )}
        {verLista && (
          <motion.div
            className="auditoria-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVerLista(null)}
          >
            <motion.div
              className="auditoria-texto"
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{verLista.titulo}</h2>

              <ul>
                {verLista.lista.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <button onClick={() => setVerLista(null)}>Cerrar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
