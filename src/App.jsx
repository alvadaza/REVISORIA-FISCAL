import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Home from "./sections/Home";
import Menu from "./components/Menu";
import Revisoria from "./sections/Revisoria";
import Formacion from "./sections/Formacion/Formacion";
import HojaDeVida from "./sections/hojadevida/HojaDeVida";
import AdminTest from "./components/AdminTest";
import ProcesoAuditoria from "./sections/Auditoria";
import SeguimientoObras from "./sections/SeguimientoObra";
import CertificadosIA from "./components/CertificadosIA";

export default function App() {
  const [section, setSection] = useState("home");
  // Estado para guardar el ID del certificado seleccionado
  const [setSelectedCertificadoId] = useState(null);

  const handleNavigate = (newSection, certificadoId = null) => {
    setSection(newSection);
    if (certificadoId) {
      setSelectedCertificadoId(certificadoId);
    }
  };

  return (
    <>
      {/* Navbar fijo arriba */}
      <Menu goTo={handleNavigate} />

      {/* Contenido */}
      <AnimatePresence mode="wait">
        {section === "home" && <Home key="home" onSelect={handleNavigate} />}

        {section === "formacion" && <Formacion key="formacion" />}

        {section === "revisoria" && <Revisoria key="revisoria" />}

        {section === "hojadevida" && <HojaDeVida key="hojadevida" />}
        {section === "adminTest" && <AdminTest key="adminTest" />}
        {section === "auditoria" && <ProcesoAuditoria key="auditoria" />}
        {section === "seguimientoObra" && (
          <SeguimientoObras key="seguimientoObra" />
        )}
        {section === "certificados-ia" && (
          <CertificadosIA key="certificados-ia" />
        )}
      </AnimatePresence>
    </>
  );
}
