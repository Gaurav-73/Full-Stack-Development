
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation
} from "react-router-dom";

import Memberships from "./Memberships";
import EditMember from "./EditMember";
import Login from "./Login";
import "./App.css";

const API_URL = "http://localhost:5000/api/members";

// Protect pages from users who are not logged in
function ProtectedRoute({ children }) {
  const isLoggedIn =
    sessionStorage.getItem("isLoggedIn") === "true";

  return isLoggedIn
    ? children
    : <Navigate to="/login" replace />;
}

// Logout
function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("isLoggedIn");
    navigate("/login", { replace: true });
  }, [navigate]);

  return <p>Logging out...</p>;
}

// Dashboard
function Dashboard() {
  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadDashboard() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load members");
      }

      const members = Array.isArray(data)
        ? data
        : data.members || [];

      setTotalMembers(members.length);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div>
     
<div
  className="dashboard-banner"
  style={{
    backgroundImage:
      'linear-gradient(rgba(15, 24, 34, 0.45), rgba(15, 24, 34, 0.45)), url("/gym-background.png")',
  }}
>


      <h1>Absolute Fitness</h1>
      <p>Welcome to your gym management dashboard.</p>
      </div>

      <div className="dashboard-card">
        <h3>Total Members</h3>
        <p className="member-count">{totalMembers}</p>

        <button onClick={loadDashboard} disabled={loading}>
          {loading ? "Loading..." : "Refresh Member Count"}
        </button>

        {error && <p className="error-message">{error}</p>}
      </div>

    



      <h2>Membership Plans</h2>

      <ul>
        <li>Monthly - ₹1,000</li>
        <li>Quarterly - ₹2,700</li>
        <li>Yearly - ₹10,000</li>
      </ul>
    </div>
  );
}

// View and delete members
function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchMembers() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch members");
      }

      setMembers(Array.isArray(data) ? data : data.members || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  async function deleteMember(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmed) return;

    setError("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete member");
      }

      setMembers((previous) =>
        previous.filter((member) => member._id !== id)
      );

      alert("Member deleted successfully!");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h1>Gym Members</h1>
      <p>View and manage your gym members here.</p>

      <div className="members-actions">
        <Link to="/members/add">
          <button type="button">Add New Member</button>
        </Link>

        <button
          type="button"
          onClick={fetchMembers}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh Members"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && members.length === 0 && (
        <p>No members found.</p>
      )}

      {members.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Membership</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr key={member._id}>
                <td>{member.fullName}</td>
                <td>{member.age}</td>
                <td>{member.gender}</td>
                <td>{member.phone}</td>
                <td>{member.email}</td>
                <td>{member.membershipPlan}</td>
                <td>
                  <Link to={`/members/edit/${member._id}`}>
                    <button type="button">Edit</button>
                  </Link>

                  <button
                    type="button"
                    onClick={() => deleteMember(member._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Add a new member
function AddMember() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    membershipPlan: "Monthly",
    membershipStartDate: new Date().toISOString().slice(0, 10),
    status: "Active"
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Failed to add member"
        );
      }

      alert("Member added successfully!");
      navigate("/members");
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1>Add New Member</h1>

      <form onSubmit={handleSubmit}>
        <p>
          <label>Full Name</label>
          <br />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label>Age</label>
          <br />
          <input
            type="number"
            name="age"
            min="1"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label>Gender</label>
          <br />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </p>

        <p>
          <label>Phone</label>
          <br />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label>Membership Plan</label>
          <br />
          <select
            name="membershipPlan"
            value={formData.membershipPlan}
            onChange={handleChange}
            required
          >
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </p>

        <p>
          <label>Membership Start Date</label>
          <br />
          <input
            type="date"
            name="membershipStartDate"
            value={formData.membershipStartDate}
            onChange={handleChange}
            required
          />
        </p>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Add Member"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/members")}
        >
          Cancel
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

// About page
function AboutGym() {
  return (
    <div>
      <h1>About Gym Management System</h1>
      
      <div className="about-box">
        <p>
          The Gym Management System is a simple web application
          developed to manage gym members and their membership plans.
        </p>

        <h2>Features</h2>
        <ul>
          <li>Add new gym members</li>
          <li>View member details</li>
          <li>Update member information</li>
          <li>Delete member records</li>
          <li>View membership plans</li>
        </ul>

        <h2>Technology Used</h2>
        <ul>
          <li>Frontend: React.js, HTML and CSS</li>
          <li>Backend: Node.js and Express.js</li>
          <li>Database: MongoDB</li>
          <li>Communication: REST API</li>
        </ul>
      </div>
    </div>
  );
}

// Navigation and application routes
function AppRoutes() {
  const location = useLocation();
  const isLoggedIn =
    sessionStorage.getItem("isLoggedIn") === "true";

  const showNavigation =
    isLoggedIn && location.pathname !== "/login";

  return (
    <div>
      {showNavigation && (
        <nav>
          <Link to="/dashboard">Dashboard</Link>{" | "}
          <Link to="/members">Members</Link>{" | "}
          <Link to="/memberships">Memberships</Link>{" | "}
          <Link to="/about">About Gym</Link>{" | "}
          <Link to="/logout">Logout</Link>
        </nav>
      )}

      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <Members />
            </ProtectedRoute>
          }
        />

        <Route
          path="/members/add"
          element={
            <ProtectedRoute>
              <AddMember />
            </ProtectedRoute>
          }
        />

        <Route
          path="/members/edit/:id"
          element={
            <ProtectedRoute>
              <EditMember />
            </ProtectedRoute>
          }
        />

        <Route
          path="/memberships"
          element={
            <ProtectedRoute>
              <Memberships />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutGym />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  );
}

// Main application
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
