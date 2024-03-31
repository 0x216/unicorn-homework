import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../api/apiConfig";
import "../../assets/styles/StartTracking.css";

function StartTrackingPage() {
  const [cigarettesPerDay, setCigarettesPerDay] = useState("");
  const [costPerCigarette, setCostPerCigarette] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(`${apiUrl}/tracking/create/`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          cigarettesPerDay: cigarettesPerDay,
          cost: costPerCigarette,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      navigate("/home");
    } catch (error) {
      console.error("Failed to start tracking:", error);
    }
  };

  return (
    <div className="start-tracking">
      <p>Start tracking your journey to a healthier life.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="cigarettesPerDay">
              How many cigarettes do you usually smoke a day?
            </label>
          </div>
          <input
            type="number"
            id="cigarettesPerDay"
            value={cigarettesPerDay}
            onChange={(e) => setCigarettesPerDay(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="costPerCigarette">
            What is the average cost of a cigarette?
          </label>
          <input
            type="number"
            step="0.01"
            id="costPerCigarette"
            value={costPerCigarette}
            onChange={(e) => setCostPerCigarette(e.target.value)}
            required
          />
        </div>
        <button type="submit">Start</button>
      </form>
    </div>
  );
}

export default StartTrackingPage;
