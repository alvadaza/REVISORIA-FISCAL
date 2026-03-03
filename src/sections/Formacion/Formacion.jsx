import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import MainView from "./MainView";
import DiplomasView from "./DiplomasView";

export default function Formacion() {
  const [view, setView] = useState("main");

  return (
    <AnimatePresence mode="wait">
      {view === "main" && <MainView key="main" goTo={setView} />}

      {view !== "main" && (
        <DiplomasView key={view} type={view} goBack={() => setView("main")} />
      )}
    </AnimatePresence>
  );
}
