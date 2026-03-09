import { useRef, useState } from "react";
import "../styles/FireAlert.css";

function FireAlert() {
  const [visible, setVisible] = useState(false);
  const alarmRef = useRef(null);

  // 🔥 Trigger Fire Manually
  const startFire = () => {
    setVisible(true);
    alarmRef.current?.play();
  };

  // 🛑 Stop Fire
  const stopFire = () => {
    setVisible(false);
    alarmRef.current.pause();
    alarmRef.current.currentTime = 0;
  };

  return (
    <>
      {/* 🔊 Alarm Sound */}
      <audio ref={alarmRef} src="/alarm.mp3" loop />

      {/* 🧪 TEST BUTTON (Bottom Left) */}
      <div className="fire-test-panel">
        {!visible ? (
          <button className="fire-test-btn" onClick={startFire}>
            🔥
          </button>
        ) : (
          <button className="fire-test-btn active" onClick={stopFire}>
            🛑
          </button>
        )}
      </div>

      {/* 🔥 SHOW ALERT UI */}
      {visible && (
        <>
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
                <button className="confirm-no" onClick={stopFire}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FireAlert;
