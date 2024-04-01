import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../api/apiConfig";
import Modal from "../../components/common/Modal";
import "../../assets/styles/Dashboard.css";

function HomePage() {
  const [trackingData, setTrackingData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [trackingError, setTrackingError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    const token = localStorage.getItem("token");
    fetch(`${apiUrl}/tracking/delete/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          closeModal();
          navigate(0);
        } else {
          // TODO: Handle error
          closeModal();
          navigate(0);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    fetch(`${apiUrl}/tracking/`, { headers })
      .then((response) => {
        if (response.status === 404) {
          throw new Error("Not found");
        }
        return response.json();
      })
      .then((data) => setTrackingData(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setTrackingError(true);
      });

    fetch(`${apiUrl}/users/me/`, { headers })
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const startTrackingHandler = () => {
    navigate("/start-tracking");
  };

  const getTimeSmokeFree = () => {
    if (trackingData && trackingData.createdAt) {
      const startDate = new Date(trackingData.createdAt);
      const currentDate = new Date();
      const difference = currentDate - startDate;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      let timeUnit = "";
      let timeValue = 0;

      if (days > 0) {
        timeUnit = " days";
        timeValue = days;
      } else if (hours > 0) {
        timeUnit = " hours";
        timeValue = hours;
      } else {
        timeUnit = " minutes";
        timeValue = minutes;
      }

      return (
        <>
          <strong>{timeValue}</strong>
          <span>{timeUnit}</span>
        </>
      );
    }
    return "Calculating...";
  };

  const getCigarettesNotSmoked = () => {
    if (trackingData && trackingData.createdAt) {
      const startDate = new Date(trackingData.createdAt);
      const currentDate = new Date();
      const difference = currentDate - startDate;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      return days * trackingData.savings.cigarettesPerDay;
    }
    return "No info";
  };

  return (
    <div>
      <div className="dashboard">
        {trackingError ? (
          <div className="start-tracking">
            <p>Start tracking your journey to a healthier life.</p>
            <button onClick={startTrackingHandler}>Start Tracking</button>
          </div>
        ) : trackingData && userData ? (
          <div className="centered-container">
            {" "}
            {/* Добавлен новый контейнер для центрирования */}
            <div className="circle">{getTimeSmokeFree()}</div>
            <div className="statistics">
              <h2>Hey, {userData.name || "User"}</h2>
              <p>Days smoke-free: {getTimeSmokeFree()}</p>
              <p>Cigarettes not smoked: {getCigarettesNotSmoked()}</p>
              <button className="relapse-button" onClick={openModal}>
                Relapse
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        title="Reset Progress"
        onClose={closeModal}
        onConfirm={handleConfirm}
      >
        <p>
          Are you sure you want to reset your progress? This action cannot be
          undone.
        </p>
      </Modal>
    </div>
  );
}

export default HomePage;
