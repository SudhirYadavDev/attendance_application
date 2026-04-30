import { useState } from "react";
import { getUser } from "../api/userApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [clerkUserIdInput, setClerkUserIdInput] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await getUser(clerkUserIdInput);
      login(res.data);

      switch (res.data.role) {
        case "STUDENT":
          navigate("/student");
          break;
        case "TRAINER":
          navigate("/trainer");
          break;
        case "INSTITUTION":
          navigate("/institution");
          break;
        case "PROGRAMME_MANAGER":
          navigate("/programme");
          break;
        case "MONITORING_OFFICER":
          navigate("/monitoring");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Enter Clerk User ID"
          value={clerkUserIdInput}
          onChange={(e) => setClerkUserIdInput(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-2 border py-2 rounded hover:bg-gray-100"
        >
          Create User
        </button>
      </div>
    </div>
  );
};

export default Login;