import { useState, useEffect } from "react";
import "../styles/CameraGrid.css";

import camerafeed1 from "../assets/camera-feed-1.jpg";
import camerafeed2 from "../assets/camera-feed-2.jpg";
import camerafeed3 from "../assets/camera-feed-3.jpg";
import camerafeed4 from "../assets/camera-feed-4.jpg";
import { FaVideo } from "react-icons/fa";

function CameraGrid() {
  const [showLiveStream, setShowLiveStream] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [time, setTime] = useState(new Date());

  /* ---------- LIVE CLOCK ---------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  /* ---------- CAMERA DATA ---------- */
  const cameras = [
    {
      id: 1,
      name: "CAM-01 Transformer Bay",
      location: "Zone A - North",
      status: "active",
      alert: false,
      type: "Night Vision",
      image: camerafeed1,
    },
    {
      id: 2,
      name: "CAM-02 Switchgear Room",
      location: "Zone B - Indoor",
      status: "active",
      alert: true,
      type: "Night Vision",
      image: camerafeed2,
    },
    {
      id: 3,
      name: "CAM-03 Thermal Imaging",
      location: "Zone A - Panels",
      status: "active",
      alert: false,
      type: "Thermal",
      image: camerafeed3,
    },
    {
      id: 4,
      name: "CAM-04 Control Panel",
      location: "Zone C - Main",
      status: "active",
      alert: false,
      type: "Standard",
      image: camerafeed4,
    },
  ];

  /* ---------- REUSABLE LIVE UI ---------- */
  const CameraLiveUI = ({ type }) => (
    <div className="camera-top-left">
      <div className="live-badge">
        <span className="live-dot"></span>
        LIVE
      </div>
      <div className="camera-mode">{type}</div>
    </div>
  );

  /* =======================================================
        LIVE STREAM MODE (HIDES GRID)
  ======================================================= */

  if (showLiveStream) {
    return (
      <div className="camera-grid-container">
        <div className="section-header">
          <h2>📹 Live Camera Monitoring</h2>

          <div className="header-actions">
            <button
              className="back-btn"
              onClick={() => setShowLiveStream(false)}
            >
              ⬅ Back to Camera Grid
            </button>

            <span className="active-count">ESP32 Live Stream Active</span>
          </div>
        </div>

        <div className="live-stream-wrapper">
          <img
            src="http://192.168.137.55/stream"
            alt="ESP32 Live Stream"
            className="live-stream-frame"
          />
        </div>
      </div>
    );
  }

  /* =======================================================
        EXPANDED MODE
  ======================================================= */

  if (selectedCamera) {
    const camera = cameras.find((c) => c.id === selectedCamera);

    return (
      <div className="camera-grid-container">
        <div className="section-header">
          <h2>📹 Live Camera Monitoring</h2>

          <div className="header-actions">
            <button
              className="live-switch-btn"
              onClick={() => setShowLiveStream(true)}
            >
              <FaVideo className="live-icon" />
              Switch to Live Camera
            </button>

            <span className="active-count">4 cameras active</span>
          </div>
        </div>

        <div
          className="camera-card expanded"
          onClick={() => setSelectedCamera(null)}
        >
          <div className="camera-feed">
            <div className="camera-placeholder">
              <img
                src={camera.image}
                alt={camera.name}
                className="camera-live-image"
              />

              <CameraLiveUI type={camera.type} />

              <div className="camera-scan-line"></div>

              <div className="camera-timestamp">
                {time.toLocaleTimeString()}
              </div>

              {camera.alert && (
                <div className="alert-overlay">
                  <div className="alert-box">⚠️ Anomaly Detected</div>
                </div>
              )}
            </div>
          </div>

          <div className="camera-info">
            <div className="camera-details">
              <h4>{camera.name}</h4>
              <p>{camera.location}</p>
            </div>

            <div className={`camera-status ${camera.status}`}>
              <span className="status-dot"></span>
              {camera.status}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
        GRID MODE
  ======================================================= */

  return (
    <div className="camera-grid-container">
      <div className="section-header">
        <h2>📹 Live Camera Monitoring</h2>

        <div className="header-actions">
          <button
            className="live-switch-btn"
            onClick={() => setShowLiveStream(true)}
          >
            <FaVideo className="live-icon" />
            Switch to Live Camera
          </button>

          <span className="active-count">4 cameras active</span>
        </div>
      </div>

      <div className="camera-grid">
        {cameras.map((camera) => (
          <div
            key={camera.id}
            className={`camera-card ${camera.alert ? "alert" : ""}`}
            onClick={() => setSelectedCamera(camera.id)}
          >
            <div className="camera-feed">
              <div className="camera-placeholder">
                <img
                  src={camera.image}
                  alt={camera.name}
                  className="camera-live-image"
                />

                <CameraLiveUI type={camera.type} />

                <div className="camera-scan-line"></div>

                <div className="camera-timestamp">
                  {time.toLocaleTimeString()}
                </div>

                {camera.alert && (
                  <div className="alert-overlay">
                    <div className="alert-box">⚠️ Anomaly Detected</div>
                  </div>
                )}
              </div>
            </div>

            <div className="camera-info">
              <div className="camera-details">
                <h4>{camera.name}</h4>
                <p>{camera.location}</p>
              </div>

              <div className={`camera-status ${camera.status}`}>
                <span className="status-dot"></span>
                {camera.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CameraGrid;
