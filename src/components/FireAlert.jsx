import { useEffect, useRef, useState } from "react";
import "../styles/FireAlert.css";

const ESP32_IP = "http://192.168.137.55"; // your device IP

function FireAlert() {
  const [fire, setFire] = useState(false);
  const [visible, setVisible] = useState(false);
  const alarmRef = useRef(null);

  // 🔁 Poll fire status every 2 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${ESP32_IP}/fire`);
        const data = await res.json();

        if (data.fire) {
          setFire(true);
          setVisible(true);
          alarmRef.current?.play();
        }
      } catch (err) {
        console.log("ESP32 not reachable");
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // 🔕 Stop sound when closed
  const closeToast = () => {
    setVisible(false);
    alarmRef.current.pause();
    alarmRef.current.currentTime = 0;
  };

  if (!visible) return null;

  return (
    <>
      {/* 🔊 Alarm Sound */}
      <audio ref={alarmRef} src="/alarm.mp3" loop />

      {/* 🔥 RED SCREEN OVERLAY */}
      <div className="fire-overlay"></div>

      {/* 🚨 CENTER EMERGENCY TOAST */}
      <div className="center-toast custom-toast danger fire-toast">
        <div className="toast-dot"></div>

        <div style={{ flex: 1 }}>
          <p className="toast-title fire-title">🔥 FIRE DETECTED</p>
          <p className="toast-desc">
            Fire sensor triggered in substation zone.
          </p>

          <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
            <button className="confirm-no" onClick={closeToast}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FireAlert;
