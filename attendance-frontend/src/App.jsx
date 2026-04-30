import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";

import StudentDashboard from "./pages/StudentDashboard";
import TrainerDashboard from "./pages/TrainerDashboard";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import ProgrammeDashboard from "./pages/ProgrammeDashboard";
import MonitoringDashboard from "./pages/MonitoringDashboard";
import CreateUser from "./pages/CreateUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateUser />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/trainer"
        element={
          <ProtectedRoute allowedRoles={["TRAINER"]}>
            <TrainerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/institution"
        element={
          <ProtectedRoute allowedRoles={["INSTITUTION"]}>
            <InstitutionDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/programme"
        element={
          <ProtectedRoute allowedRoles={["PROGRAMME_MANAGER"]}>
            <ProgrammeDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/monitoring"
        element={
          <ProtectedRoute allowedRoles={["MONITORING_OFFICER"]}>
            <MonitoringDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
