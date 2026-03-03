// src/components/AdminPanel.jsx
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion } from "framer-motion";
import "./AdminTest.css"; // asegúrate de tener este archivo

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(null);

  // Experiencias
  const [experiencias, setExperiencias] = useState([]);
  const [expForm, setExpForm] = useState({
    id: null,
    orden: 0,
    titulo: "",
    items: [],
    imagen_url: "",
  });
  const [newItem, setNewItem] = useState({
    empresa: "",
    detalle: "",
    cargo: "",
  });

  // Certificados normales
  const [certificados, setCertificados] = useState([]);
  const [certForm, setCertForm] = useState({
    id: null,
    orden: 0,
    titulo: "",
    imagen_url: "",
  });

  // Certificados IA
  const [certificadosIA, setCertificadosIA] = useState([]);
  const [certIAForm, setCertIAForm] = useState({
    id: null,
    orden: 0,
    titulo: "",
    descripcion: "",
    fecha: "",
    imagen_url: "",
  });

  // Configuración Home
  const [config, setConfig] = useState({ titulo_principal: "Cargando..." });
  const [configForm, setConfigForm] = useState({ titulo_principal: "" });

  const [file, setFile] = useState(null);
  const [uploadMensaje, setUploadMensaje] = useState("");

  const cloudName = "dl7kjajkv";
  const uploadPreset = "ml_default";

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        fetchExperiencias();
        fetchCertificados();
        fetchCertificadosIA();
        fetchConfiguracion();
      }
      setLoading(false);
    };

    loadData();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchExperiencias();
          fetchCertificados();
          fetchCertificadosIA();
          fetchConfiguracion();
        }
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Fetchs
  const fetchExperiencias = async () => {
    const { data } = await supabase
      .from("experiencias")
      .select("*")
      .order("orden");
    setExperiencias(data || []);
  };

  const fetchCertificados = async () => {
    const { data } = await supabase
      .from("certificados")
      .select("*")
      .order("orden");
    setCertificados(data || []);
  };

  const fetchCertificadosIA = async () => {
    const { data } = await supabase
      .from("certificados_ia")
      .select("*")
      .order("orden");
    setCertificadosIA(data || []);
  };

  const fetchConfiguracion = async () => {
    const { data } = await supabase
      .from("configuracion")
      .select("clave, valor")
      .in("clave", ["titulo_principal"]);

    const configObj = {};
    data?.forEach((item) => (configObj[item.clave] = item.valor));

    setConfig(configObj);
    setConfigForm({ titulo_principal: configObj.titulo_principal || "" });
  };

  // Login / Logout
  const handleLogin = async () => {
    setAuthError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setAuthError(error.message);
    else {
      setEmail("");
      setPassword("");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Subir imagen
  const handleUploadFile = async () => {
    if (!file) return null;
    setUploadMensaje("Subiendo...");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();
      if (!data.secure_url) throw new Error("Error subida");
      setUploadMensaje("Imagen subida");
      return data.secure_url;
    } catch (err) {
      setUploadMensaje("Error subida: " + err.message);
      return null;
    }
  };

  // Configuración Home
  const handleSaveConfig = async () => {
    if (!configForm.titulo_principal.trim()) {
      setUploadMensaje("Título obligatorio");
      return;
    }
    const { error } = await supabase.from("configuracion").upsert(
      {
        clave: "titulo_principal",
        valor: configForm.titulo_principal.trim(),
        descripcion: "Título principal Home",
      },
      { onConflict: "clave" },
    );
    if (error) setUploadMensaje("Error: " + error.message);
    else {
      setUploadMensaje("Título guardado");
      fetchConfiguracion();
    }
  };

  // Experiencias
  const handleSaveExperiencia = async () => {
    const imgUrl = await handleUploadFile();
    const data = {
      orden: expForm.orden,
      titulo: expForm.titulo,
      items: expForm.items,
      imagen_url: imgUrl || expForm.imagen_url,
    };
    let error;
    if (expForm.id) {
      ({ error } = await supabase
        .from("experiencias")
        .update(data)
        .eq("id", expForm.id));
    } else {
      ({ error } = await supabase.from("experiencias").insert(data));
    }
    if (error) setUploadMensaje("Error: " + error.message);
    else {
      setExpForm({ id: null, orden: 0, titulo: "", items: [], imagen_url: "" });
      setFile(null);
      fetchExperiencias();
      setUploadMensaje("Experiencia guardada");
    }
  };

  const handleAddItemToExp = () => {
    if (!newItem.empresa || !newItem.cargo) return;
    setExpForm({ ...expForm, items: [...expForm.items, newItem] });
    setNewItem({ empresa: "", detalle: "", cargo: "" });
  };

  const handleRemoveItemFromExp = (index) => {
    setExpForm({
      ...expForm,
      items: expForm.items.filter((_, i) => i !== index),
    });
  };

  const handleEditExperiencia = (exp) => setExpForm(exp);

  const handleDeleteExperiencia = async (id) => {
    await supabase.from("experiencias").delete().eq("id", id);
    fetchExperiencias();
  };

  // Certificados normales
  const handleSaveCertificado = async () => {
    const imgUrl = await handleUploadFile();
    const data = {
      orden: certForm.orden,
      titulo: certForm.titulo,
      imagen_url: imgUrl || certForm.imagen_url,
    };
    let error;
    if (certForm.id) {
      ({ error } = await supabase
        .from("certificados")
        .update(data)
        .eq("id", certForm.id));
    } else {
      ({ error } = await supabase.from("certificados").insert(data));
    }
    if (error) setUploadMensaje("Error: " + error.message);
    else {
      setCertForm({ id: null, orden: 0, titulo: "", imagen_url: "" });
      setFile(null);
      fetchCertificados();
      setUploadMensaje("Certificado guardado");
    }
  };

  const handleEditCertificado = (cert) => setCertForm(cert);

  const handleDeleteCertificado = async (id) => {
    await supabase.from("certificados").delete().eq("id", id);
    fetchCertificados();
  };

  // Certificados IA
  const handleSaveCertIA = async () => {
    if (!certIAForm.titulo.trim()) {
      setUploadMensaje("Título obligatorio");
      return;
    }
    const imgUrl = await handleUploadFile();
    const data = {
      orden: certIAForm.orden,
      titulo: certIAForm.titulo.trim(),
      descripcion: certIAForm.descripcion.trim(),
      fecha: certIAForm.fecha.trim(),
      imagen_url: imgUrl || certIAForm.imagen_url,
    };
    let error;
    if (certIAForm.id) {
      ({ error } = await supabase
        .from("certificados_ia")
        .update(data)
        .eq("id", certIAForm.id));
    } else {
      ({ error } = await supabase.from("certificados_ia").insert(data));
    }
    if (error) setUploadMensaje("Error: " + error.message);
    else {
      setCertIAForm({
        id: null,
        orden: 0,
        titulo: "",
        descripcion: "",
        fecha: "",
        imagen_url: "",
      });
      setFile(null);
      fetchCertificadosIA();
      setUploadMensaje("Certificado IA guardado");
    }
  };

  const handleEditCertIA = (cert) => setCertIAForm(cert);

  const handleDeleteCertIA = async (id) => {
    await supabase.from("certificados_ia").delete().eq("id", id);
    fetchCertificadosIA();
  };

  if (loading) return <div>Cargando panel...</div>;

  if (!user) {
    return (
      <div className="auth-form">
        <h2>Iniciar Sesión (Admin)</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button onClick={handleLogin}>Entrar</button>
        {authError && <p className="error">{authError}</p>}
      </div>
    );
  }

  return (
    <motion.div
      className="admin-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Panel de Administración</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>

      {/* Configuración Home */}
      <section className="section">
        <h2>Configuración General (Home)</h2>
        <div className="form">
          <label>Título Principal (H1)</label>
          <input
            type="text"
            value={configForm.titulo_principal}
            onChange={(e) =>
              setConfigForm({ ...configForm, titulo_principal: e.target.value })
            }
            placeholder="Ej: CONJUNTO BALCONES DE PROVENZA"
          />
          <p className="current-value">
            Actual: <strong>{config.titulo_principal || "No definido"}</strong>
          </p>
          <button onClick={handleSaveConfig}>Guardar Título</button>
          {uploadMensaje && (
            <p
              className={uploadMensaje.includes("Error") ? "error" : "success"}
            >
              {uploadMensaje}
            </p>
          )}
        </div>
      </section>

      {/* Certificados IA */}
      <section className="section">
        <h2>Gestión de Certificados IA</h2>
        <div className="form">
          <input
            type="number"
            value={certIAForm.orden || 0}
            onChange={(e) =>
              setCertIAForm({ ...certIAForm, orden: Number(e.target.value) })
            }
            placeholder="Orden"
          />
          <input
            type="text"
            value={certIAForm.titulo || ""}
            onChange={(e) =>
              setCertIAForm({ ...certIAForm, titulo: e.target.value })
            }
            placeholder="Título"
          />
          <input
            type="text"
            value={certIAForm.fecha || ""}
            onChange={(e) =>
              setCertIAForm({ ...certIAForm, fecha: e.target.value })
            }
            placeholder="Fecha (ej: Marzo 2025)"
          />
          <textarea
            value={certIAForm.descripcion || ""}
            onChange={(e) =>
              setCertIAForm({ ...certIAForm, descripcion: e.target.value })
            }
            placeholder="Descripción"
            rows={3}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {certIAForm.imagen_url && (
            <img
              src={certIAForm.imagen_url}
              alt="Preview"
              className="preview"
            />
          )}
          <button onClick={handleSaveCertIA}>
            {certIAForm.id ? "Actualizar Cert IA" : "Agregar Cert IA"}
          </button>
          {uploadMensaje && <p>{uploadMensaje}</p>}
        </div>

        <div className="list">
          {certificadosIA.map((cert) => (
            <div key={cert.id} className="list-item">
              <p>
                Orden: {cert.orden} | {cert.titulo}
              </p>
              <p>Fecha: {cert.fecha || "—"}</p>
              {cert.imagen_url && (
                <img
                  src={cert.imagen_url}
                  alt="Icono"
                  className="small-preview"
                />
              )}
              <button onClick={() => handleEditCertIA(cert)}>Editar</button>
              <button onClick={() => handleDeleteCertIA(cert.id)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Experiencias */}
      <section className="section">
        <h2>Gestión de Experiencias</h2>
        <div className="form">
          <input
            type="number"
            value={expForm.orden}
            onChange={(e) =>
              setExpForm({ ...expForm, orden: Number(e.target.value) })
            }
            placeholder="Orden"
          />
          <input
            type="text"
            value={expForm.titulo}
            onChange={(e) => setExpForm({ ...expForm, titulo: e.target.value })}
            placeholder="Título (opcional)"
          />
          <h3>Items</h3>
          {expForm.items.map((item, i) => (
            <div key={i} className="item-row">
              <input value={item.empresa} readOnly />
              <input value={item.detalle} readOnly />
              <input value={item.cargo} readOnly />
              <button onClick={() => handleRemoveItemFromExp(i)}>
                Eliminar
              </button>
            </div>
          ))}
          <div className="item-form">
            <input
              type="text"
              value={newItem.empresa}
              onChange={(e) =>
                setNewItem({ ...newItem, empresa: e.target.value })
              }
              placeholder="Empresa"
            />
            <input
              type="text"
              value={newItem.detalle}
              onChange={(e) =>
                setNewItem({ ...newItem, detalle: e.target.value })
              }
              placeholder="Detalle"
            />
            <input
              type="text"
              value={newItem.cargo}
              onChange={(e) =>
                setNewItem({ ...newItem, cargo: e.target.value })
              }
              placeholder="Cargo"
            />
            <button onClick={handleAddItemToExp}>Agregar Item</button>
          </div>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          {expForm.imagen_url && (
            <img src={expForm.imagen_url} alt="Preview" className="preview" />
          )}
          <button onClick={handleSaveExperiencia}>
            {expForm.id ? "Actualizar Experiencia" : "Agregar Experiencia"}
          </button>
          {uploadMensaje && <p>{uploadMensaje}</p>}
        </div>

        <div className="list">
          {experiencias.map((exp) => (
            <div key={exp.id} className="list-item">
              <p>
                Orden: {exp.orden} | {exp.titulo || "Sin título"}
              </p>
              <p>Items: {exp.items.length}</p>
              {exp.imagen_url && (
                <img
                  src={exp.imagen_url}
                  alt="Imagen"
                  className="small-preview"
                />
              )}
              <button onClick={() => handleEditExperiencia(exp)}>Editar</button>
              <button onClick={() => handleDeleteExperiencia(exp.id)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Certificados normales */}
      <section className="section">
        <h2>Gestión de Certificados</h2>
        <div className="form">
          <input
            type="number"
            value={certForm.orden}
            onChange={(e) =>
              setCertForm({ ...certForm, orden: Number(e.target.value) })
            }
            placeholder="Orden"
          />
          <input
            type="text"
            value={certForm.titulo}
            onChange={(e) =>
              setCertForm({ ...certForm, titulo: e.target.value })
            }
            placeholder="Título"
          />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          {certForm.imagen_url && (
            <img src={certForm.imagen_url} alt="Preview" className="preview" />
          )}
          <button onClick={handleSaveCertificado}>
            {certForm.id ? "Actualizar Certificado" : "Agregar Certificado"}
          </button>
          {uploadMensaje && <p>{uploadMensaje}</p>}
        </div>

        <div className="list">
          {certificados.map((cert) => (
            <div key={cert.id} className="list-item">
              <p>
                Orden: {cert.orden} | {cert.titulo}
              </p>
              {cert.imagen_url && (
                <img
                  src={cert.imagen_url}
                  alt="Imagen"
                  className="small-preview"
                />
              )}
              <button onClick={() => handleEditCertificado(cert)}>
                Editar
              </button>
              <button onClick={() => handleDeleteCertificado(cert.id)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
