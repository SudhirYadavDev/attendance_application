import { useEffect, useState } from "react";
import {
  getTrainerSessions,
  createSession,
} from "../api/sessionApi";
import {
  getSessionAttendanceForTrainer,
} from "../api/attendanceApi";
import { createInvite } from "../api/batchApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TrainerDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [showAttendance, setShowAttendance] = useState({});
  const [inviteMap, setInviteMap] = useState({});

  const [form, setForm] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    batch: { id: "" },
  });

  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      const res = await getTrainerSessions();
      setSessions(res.data);
    } catch (err) {
      alert("Failed to load sessions");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "batchId") {
      setForm({
        ...form,
        batch: { id: e.target.value },
      });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createSession(form);
      alert("Session created!");
      fetchSessions();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating session");
    }
  };

  const fetchAttendance = async (sessionId) => {
    try {
      const res = await getSessionAttendanceForTrainer(sessionId);

      setAttendanceMap((prev) => ({
        ...prev,
        [sessionId]: res.data,
      }));

      setShowAttendance((prev) => ({
        ...prev,
        [sessionId]: !prev[sessionId],
      }));
    } catch {
      alert("Failed to load attendance");
    }
  };

  const handleGenerateInvite = async (batchId) => {
    try {
      const res = await createInvite(batchId);

      setInviteMap((prev) => ({
        ...prev,
        [batchId]: res.data.token,
      }));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to generate invite");
    }
  };

  const copyToClipboard = (token) => {
    navigator.clipboard.writeText(token);
    alert("Copied!");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Trainer Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Create Session</h2>

        <form
          onSubmit={handleCreate}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="date"
            type="date"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="startTime"
            type="time"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="endTime"
            type="time"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="batchId"
            placeholder="Batch ID"
            onChange={handleChange}
            className="border p-2 rounded col-span-1 md:col-span-2"
          />

          <button className="bg-blue-600 text-white py-2 rounded col-span-1 md:col-span-2">
            Create Session
          </button>
        </form>
      </div>

      <h2 className="text-lg font-semibold mb-4">Your Sessions</h2>

      {sessions.length === 0 ? (
        <p>No sessions</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="bg-white p-4 rounded shadow"
            >
              <h3 className="font-bold text-lg">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.date}</p>
              <p className="text-sm">
                {s.startTime} - {s.endTime}
              </p>

              <div className="mt-3 flex gap-2 flex-wrap">
                <button
                  onClick={() => fetchAttendance(s.id)}
                  className="bg-gray-800 text-white px-3 py-1 rounded text-sm"
                >
                  {showAttendance[s.id] ? "Hide" : "View"} Attendance
                </button>

                <button
                  onClick={() => handleGenerateInvite(s.batch?.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  Generate Invite
                </button>
              </div>

              {inviteMap[s.batch?.id] && (
                <div className="mt-2">
                  <p className="text-sm">
                    Token:{" "}
                    <span className="font-semibold">
                      {inviteMap[s.batch.id]}
                    </span>
                  </p>
                  <button
                    onClick={() =>
                      copyToClipboard(inviteMap[s.batch.id])
                    }
                    className="text-blue-600 text-sm"
                  >
                    Copy
                  </button>
                </div>
              )}

              {showAttendance[s.id] && (
                <div className="mt-3 border-t pt-2">
                  {attendanceMap[s.id]?.length === 0 ? (
                    <p>No attendance yet</p>
                  ) : (
                    attendanceMap[s.id]?.map((a) => (
                      <p key={a.id} className="text-sm">
                        {a.student?.name} -{" "}
                        <span className="font-semibold">
                          {a.status}
                        </span>
                      </p>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainerDashboard;