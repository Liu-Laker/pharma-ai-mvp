import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ToastProvider } from './components/ui/ToastContext'
import Layout from './components/Layout'
import VisitPrep from './pages/VisitPrep'
import VisitCopilot from './pages/VisitCopilot'
import VisitSummary from './pages/VisitSummary'
import AdminPanel from './pages/AdminPanel'
import DemoLanding from './pages/DemoLanding'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<DemoLanding />} />
      <Route path="/prep" element={<VisitPrep />} />
      <Route path="/copilot" element={<VisitCopilot />} />
      <Route path="/summary" element={<VisitSummary />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <ToastProvider>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </ToastProvider>
  )
}

export default App
