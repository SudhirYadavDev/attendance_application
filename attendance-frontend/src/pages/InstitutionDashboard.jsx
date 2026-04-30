import { useState } from "react";
import { getBatchSummary, createBatch } from "../api/batchApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const InstitutionDashboard = () => {
  const [batchId, setBatchId] = useState("");
  const [summary, setSummary] = useState(null);

  const [newBatch, setNewBatch] = useState({
    name: "",
    institutionId: "",
  });

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleFetchSummary = async () => {
    try {
      const res = await getBatchSummary(batchId);
      setSummary(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch summary");
    }
  };

  const handleCreateBatch = async (e) => {
    e.preventDefault();

    try {
      await createBatch(newBatch);
      alert("Batch created");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating batch");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Institution Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Create Batch</h2>

        <form
          onSubmit={handleCreateBatch}
          className="grid gap-4 md:grid-cols-2"
        >
          <input
            placeholder="Batch Name"
            onChange={(e) =>
              setNewBatch({ ...newBatch, name: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            placeholder="Institution ID"
            onChange={(e) =>
              setNewBatch({ ...newBatch, institutionId: e.target.value })
            }
            className="border p-2 rounded"
          />

          <button className="bg-blue-600 text-white py-2 rounded md:col-span-2">
            Create Batch
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Batch Summary</h2>

        <div className="flex gap-2 mb-4">
          <input
            placeholder="Enter Batch ID"
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <button
            onClick={handleFetchSummary}
            className="bg-gray-800 text-white px-4 rounded"
          >
            Get
          </button>
        </div>

        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-100 p-4 rounded text-center">
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
    </div>
  );
};

export default InstitutionDashboard;