import Header from "./components/Header.jsx"
import HomePage from "./components/pages/HomePage.jsx"
import EntriesPage from "./components/pages/Entries/EntriesPage.jsx"
import EntryPage from "./components/pages/Entries/EntryPage.jsx"
import ProjectsPage from "./components/pages/ProjectsPage.jsx"
import SynthPage from "./components/pages/Synth/SynthPage.jsx"

import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";

function App() {

  return (
      <>
        <BrowserRouter>
          <Header />
        
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/entries" element={<EntriesPage />} />
            <Route path="/entries/:id" element={<EntryPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/synth" element={<SynthPage />} />
          </Routes>        
        </BrowserRouter>

        <footer style={{ userSelect: "none" }}>© 2026 Francisco Ramos</footer>
      </>
  )
}

export default App
