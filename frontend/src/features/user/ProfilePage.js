import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import "../../assets/styles/ProfilePage.css";
import { apiUrl } from "../../api/apiConfig";

function ProfilePage() {
  const [user, setUser] = useState({
    email: "",
    name: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [initialData, setInitialData] = useState({ email: "", name: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${apiUrl}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUser({ ...user, email: data.email, name: data.name });
        setInitialData({ email: data.email, name: data.name });
      } catch (error) {
        setError("Failed to load profile data");
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authorization token found");
      return;
    }

    if (user.name !== initialData.name) {
      try {
        const nameResponse = await fetch(`${apiUrl}/users/update/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: user.name }),
        });
        if (!nameResponse.ok) throw new Error("Failed to update name");
        setSuccessMessage("Name updated successfully");
        setInitialData({ ...initialData, name: user.name });
      } catch (error) {
        setError(error.message);
        return;
      }
    }

    if (user.newPassword && user.newPassword === user.confirmNewPassword && user.oldPassword) {
      try {
        const passwordResponse = await fetch(
          `${apiUrl}/users/update-password/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              new_password: user.newPassword,
              old_password: user.oldPassword,
            }),
          }
        );
        if (!passwordResponse.ok) throw new Error("Failed to update password");
        setUser({
          ...user,
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setSuccessMessage(successMessage => successMessage + (successMessage ? " & Password" : "Password") + " updated successfully");
      } catch (error) {
        setError(error.message);
        return;
      }
    } else if (user.newPassword !== user.confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }
  };

  return (
    <div className="profile-container">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Profile Page</h2>
        <FaUser className="profile-logo" />
        <input type="email" placeholder="Email" value={user.email} readOnly />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={user.oldPassword}
          onChange={handleChange}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={user.newPassword}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          value={user.confirmNewPassword}
          onChange={handleChange}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
        <div className="button-container">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
