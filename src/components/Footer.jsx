import "../styles/Footer.css";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">

      <div className="footer-container">

        {/* ================= PROJECT INFO ================= */}
        <div className="footer-section">
          <h3 className="footer-title">
            Integrated IOT Surveillance, Fire Detection and Remote Switching Solution for Smart Power Substations
          </h3>

          <p className="footer-sub">
            Final Year Project – EEE Department
          </p>
        </div>

        {/* ================= STUDENT INFO ================= */}
        <div className="footer-section">
          <h4>Project Developed By</h4>
          <p>PRABAVATHI S</p>
          <p>ASVITHA S</p>
        </div>

        {/* ================= COLLEGE INFO ================= */}
        <div className="footer-section">
          <h4>CHENNAI INSTITUTE OF TECHNOLOGY</h4>
          <p>Sarathy Nagar, Kundrathur</p>
          <p>Chennai – 600069</p>
          <p>Department of Electrical and Electronics Engineering</p>
        </div>

        {/* ================= SOCIAL LINKS ================= */}
        <div className="footer-section">
          <h4>Connect With Us</h4>

          <div className="social-icons">
            <a className="linkedin" href="https://www.linkedin.com/in/prabavathi-s-a75982256" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a className="github" href="https://github.com/sivaprabavathi" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a className="instagram" href="https://www.instagram.com/siva_prabavathi" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>

      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="footer-bottom">
        © {year} Electrical Substation Monitoring System | Real-time Monitoring & Control
      </div>

    </footer>
  );
}

export default Footer;