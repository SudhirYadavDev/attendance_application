import { useEffect, useState } from "react";
import { getProgrammeSummary } from "../api/batchApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MonitorDashboard = () => {
  const [summary, setSummary] = useState(null);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchSummary = async () => {
    try {
      const res = await getProgrammeSummary();
      setSummary(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load summary");
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Monitoring Officer Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {!summary ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded text-center">
            <p className="text-sm text-gray-600">Institutions</p>
            <p className="font-bold">{summary.totalInstitutions}</p>
          </div>

          <div className="bg-blue-100 p-4 rounded text-center">
            <p className="text-sm text-gray-600">Batches</p>
            <p className="font-bold">{summary.totalBatches}</p>
          </div>

          <div className="bg-indigo-100 p-4 rounded text-center">
            <p className="text-sm text-gray-600">Students</p>
            <p className="font-bold">{summary.totalStudents}</p>
          </div>

          <div className="bg-green-100 p-4 rounded text-center">
            <p className="text-sm text-gray-600">Present</p>
            <p className="font-bold">{summary.present}</p>
          </div>

          <div className="bg-red-100 p-4 rounded text-center">
            <p className="text-sm text-gray-600">Absent</p>
            <p className="font-bold">{summary.absent}</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded text-center">
            <p className="text-sm text-gray-600">Late</p>
            <p className="font-bold">{summary.late}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitorDashboard;