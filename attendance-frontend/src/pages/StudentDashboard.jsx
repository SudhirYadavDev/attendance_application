import { useEffect, useState } from "react";
import { getStudentSessions } from "../api/sessionApi";
import { markAttendance, getMyAttendance } from "../api/attendanceApi";
import { joinBatch } from "../api/batchApi";
import { useAuth } from "../context/AuthContext";

const StudentDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [batchId, setBatchId] = useState("");
  const [token, setToken] = useState("");
  const { logout } = useAuth();

  const fetchData = async () => {
    try {
      const sessionRes = await getStudentSessions();
      setSessions(sessionRes.data);

      const attRes = await getMyAttendance();

      const map = {};
      attRes.data.forEach((a) => {
        map[a.session.id] = a.status;
      });

      setAttendanceMap(map);
    } catch (err) {
      console.log(err);
      alert("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMark = async (sessionId, status) => {
    try {
      await markAttendance(sessionId, status);

      setAttendanceMap((prev) => ({
        ...prev,
        [sessionId]: status,
      }));
    } catch (err) {
      alert(err.response?.data?.message || "Error marking attendance");
    }
  };

  const handleJoinBatch = async () => {
    try {
      await joinBatch(batchId, token);
      alert("Joined batch successfully");
      setBatchId("");
      setToken("");
      fetchData();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to join batch");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Student Dashboard</h2>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="text-lg font-semibold mb-3">Join Batch</h3>
          <div className="flex gap-3 flex-wrap">
            <input
              className="border p-2 rounded w-full md:w-auto flex-1"
              placeholder="Batch ID"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
            />
            <input
              className="border p-2 rounded w-full md:w-auto flex-1"
              placeholder="Invite Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <button
              onClick={handleJoinBatch}
              disabled={!batchId || !token}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              Join
            </button>
          </div>
        </div>

        {sessions.length === 0 ? (
          <p className="text-center text-gray-600">No sessions available</p>
        ) : (
          <div className="grid gap-4">
            {sessions.map((s) => {
              const status = attendanceMap[s.id];

              return (
                <div
                  key={s.id}
                  className="bg-white p-4 rounded shadow"
                >
                  <h4 className="text-lg font-semibold">{s.title}</h4>
                  <p className="text-gray-600">Date: {s.date}</p>
                  <p className="text-gray-600 mb-3">
                    Time: {s.startTime} - {s.endTime}
                  </p>

                  {status ? (
                    <p className="font-medium">
                      Status:{" "}
                      <span className="text-green-600 uppercase">
                        {status}
                      </span>
                    </p>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMark(s.id, "present")}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Present
                      </button>
                      <button
                        onClick={() => handleMark(s.id, "absent")}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Absent
                      </button>
                      <button
                        onClick={() => handleMark(s.id, "late")}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Late
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;