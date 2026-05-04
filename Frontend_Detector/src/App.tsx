import { Routes, Route } from 'react-router-dom'
import DetectorPage from './pages/DetectorPage'
import './App.css'

export default function App() {
  return (
    <div className="app-container">
      <nav className="app-nav">
        <span className="app-brand">
          <i className="pi pi-search" style={{ fontSize: '1.1rem' }} />
          Detector IA
        </span>
      </nav>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<DetectorPage />} />
          <Route path="/detector" element={<DetectorPage />} />
        </Routes>
      </main>
    </div>
  )
}
