import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardLayout from './components/DashboardLayout'
import Home from './pages/Home'
import Agents from './pages/Agents'
import Ado from './pages/Ado'
import Settings from './pages/Settings'
import Documentation from './pages/Documentation'
import Tools from './pages/Tools'
import ClientEngagements from './pages/ClientEngagements'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          }
        />
        <Route
          path="/agents"
          element={
            <DashboardLayout>
              <Agents />
            </DashboardLayout>
          }
        />
        <Route
          path="/client-engagements/github"
          element={
            <DashboardLayout>
              <Agents />
            </DashboardLayout>
          }
        />
        <Route
          path="/ado"
          element={
            <DashboardLayout>
              <Ado />
            </DashboardLayout>
          }
        />
        <Route
          path="/client-engagements/ado"
          element={
            <DashboardLayout>
              <Ado />
            </DashboardLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />
        <Route
          path="/documentation"
          element={
            <DashboardLayout>
              <Documentation />
            </DashboardLayout>
          }
        />
        <Route
          path="/tools"
          element={
            <DashboardLayout>
              <Tools />
            </DashboardLayout>
          }
        />
        <Route
          path="/client-engagements"
          element={
            <DashboardLayout>
              <ClientEngagements />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  )
}

export default App

