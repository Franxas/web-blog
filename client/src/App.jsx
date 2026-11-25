import Header from "./components/Header.jsx"
import HomePage from "./components/pages/HomePage.jsx"
import EntriesPage from "./components/pages/Entries/EntriesPage.jsx"
import EntryPreviewPage from "./components/pages/Entries/EntryPreviewPage.jsx"
import ProjectsPage from "./components/pages/ProjectsPage.jsx"
import Exercises from "./components/pages/exercises/Exercises.jsx"

//admin
import LoginPage from "./components/pages/admin/LoginPage.jsx"
import EntryEditor from "./components/pages/admin/EntryEditor.jsx"
import EntryManager from "./components/pages/admin/EntryManager.jsx"

//exercises page
import WSPainter from "./components/pages/exercises/WSpainter/WSPainter.jsx"
import Editor from "./components/pages/exercises/Editor/Editor.jsx"
import GUIRoom from "./components/pages/exercises/Simple Gui/GUIRoom.jsx"
import MagicOctDemo from "./components/pages/exercises/Magic Octagon/Demo.jsx"
import Weather from "./components/pages/exercises/Weather/Weather.jsx"

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
            <Route path="/entries/:id" element={<EntryPreviewPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/exercises" element={<Exercises />} />

            <Route path="exercises/wspainter" element={<WSPainter />} />
            <Route path="exercises/editor" element={<Editor />} />
            <Route path="exercises/guiroom" element={<GUIRoom />} />
            <Route path="exercises/magicoctagon" element={<MagicOctDemo />} />
            <Route path="exercises/weather" element={<Weather />} />

            
            <Route path="admin/login" element={<LoginPage />} />
            <Route path="admin/entryeditor" element={<EntryEditor />} />
            <Route path="admin/entryeditor/:id" element={<EntryEditor />} />
            <Route path="admin/entrymanager" element={<EntryManager />} />

          </Routes>        
        </BrowserRouter>

        <footer style={{ marginTop: "0px" }}>© 2026 Francisco Ramos</footer>
      </>
  )
}

export default App
