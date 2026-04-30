import { useState } from "react";
import { createUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [form, setForm] = useState({
    clerkUserId: "",
    name: "",
    role: "",
    institutionId: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser(form);
      alert("User created successfully!");
      navigate("/login");
    } catch {
      alert("Error creating user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Create User</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="clerkUserId"
            placeholder="Clerk User ID"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <select
            name="role"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Role</option>
            <option value="STUDENT">Student</option>
            <option value="TRAINER">Trainer</option>
            <option value="INSTITUTION">Institution</option>
            <option value="PROGRAMME_MANAGER">Programme Manager</option>
            <option value="MONITORING_OFFICER">Monitoring Officer</option>
          </select>

          <input
            name="institutionId"
            placeholder="Institution ID (optional)"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Create
          </button>
        </form>

        <button
          onClick={() => navigate("/login")}
          className="w-full mt-3 border py-2 rounded hover:bg-gray-100"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default CreateUser;