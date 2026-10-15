
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/api/members";

function EditMember() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    membershipPlan: "Monthly",
    membershipStartDate: "",
    status: "Active"
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load the existing member details
  useEffect(() => {
    async function fetchMember() {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load member");
        }

        setFormData({
          fullName: data.fullName || "",
          age: data.age ?? "",
          gender: data.gender || "",
          phone: data.phone || "",
          email: data.email || "",
          membershipPlan: data.membershipPlan || "Monthly",
          membershipStartDate: data.membershipStartDate
            ? new Date(data.membershipStartDate)
                .toISOString()
                .slice(0, 10)
            : "",
          status: data.status || "Active"
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMember();
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  // Save the updated member
  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
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
          data.message || data.error || "Failed to update member"
        );
      }

      alert("Member updated successfully!");
      navigate("/members");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Loading member details...</p>;
  }

  if (error && !formData.fullName) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => navigate("/members")}>
          Back to Members
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit Member</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <p>
          <label>Full Name</label><br />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label>Age</label><br />
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
          <label>Gender</label><br />
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
          <label>Phone</label><br />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label>Email</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label>Membership Plan</label><br />
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
          <label>Membership Start Date</label><br />
          <input
            type="date"
            name="membershipStartDate"
            value={formData.membershipStartDate}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label>Status</label><br />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </p>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Update Member"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/members")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditMember;
