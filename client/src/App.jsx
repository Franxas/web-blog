import Header from "./components/Header.jsx"
import HomePage from "./components/pages/HomePage.jsx"
import EntriesPage from "./components/pages/Entries/EntriesPage.jsx"
import EntryPreviewPage from "./components/pages/Entries/EntryPreviewPage.jsx"
import ProjectsPage from "./components/pages/ProjectsPage.jsx"
import WeeklyChallengesPage from "./components/pages/weekly challenges/WeeklyChallengesPage.jsx"

import WSPainter from "./components/pages/weekly challenges/WSpainter/WSPainter.jsx"
import Editor from "./components/pages/weekly challenges/Editor/Editor.jsx"

import LoginPage from "./components/pages/admin/LoginPage.jsx"
import EntryEditor from "./components/pages/admin/EntryEditor.jsx"
import EntryManager from "./components/pages/admin/EntryManager.jsx"

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
            <Route path="/weeklychallenges" element={<WeeklyChallengesPage />} />

            <Route path="wc-wspainter" element={<WSPainter />} />
            <Route path="wc-editor" element={<Editor />} />
            
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
