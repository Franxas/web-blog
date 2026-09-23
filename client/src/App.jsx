import Header from "./components/Header.jsx"
import HomePage from "./components/pages/HomePage.jsx"
import EntriesPage from "./components/pages/EntriesPage.jsx"
import ProjectsPage from "./components/pages/ProjectsPage.jsx"
import SynthPage from "./components/pages/SynthPage.jsx"

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
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/synth" element={<SynthPage />} />
          </Routes>        
        </BrowserRouter>

        <footer>© 2026 Francisco Ramos · Open source on GitHub</footer>
      </>
  )
}

export default App
