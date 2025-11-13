import {
  faLinkedin,
  faGithub,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

export function PageNotFound() {
  return (
    <div className="page-not-found-container">
      <header className="page-not-found-header">
        <div className="header-brand" onClick={() => window.location.reload()}>
          <img
            src="notiq-logo.png"
            alt="NOTIQ Logo"
            title="NOTIQ"
            width={50}
            height={44}
          />
          <span className="brand-name">NOTIQ</span>
        </div>

        <nav className="header-social">
          <a href="https://www.linkedin.com/in/yesehakkebere/" target="_blank">
            <FontAwesomeIcon
              icon={faLinkedin}
              size="xl"
              className="faLinkedin-icon"
            />
          </a>
          <a href="https://github.com/tonyk-code" target="_blank">
            <FontAwesomeIcon
              icon={faGithub}
              size="xl"
              className="faGithub-icon"
            />
          </a>
          <a href="https://www.instagram.com/yesehakkebere" target="_blank">
            <FontAwesomeIcon
              icon={faInstagram}
              size="xl"
              className="faInstagram-icon"
            />
          </a>
          <a href="https://www.tiktok.com/@codeolympus" target="_blank">
            <FontAwesomeIcon
              icon={faTiktok}
              size="xl"
              className="faTiktok-icon"
            />
          </a>
        </nav>

        <div className="header-actions">
          <Link to="/login">
            <button className="btn-login">
              <span className="hover-underline-animation">Login</span>
            </button>
          </Link>
          <span className="separate-login-signup">/</span>
          <Link to="/sign-up">
            <button className="btn-sign-up">
              Sign up
              <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </Link>
        </div>
      </header>
      <main>
        <div className="error-container">
          <img
            src="404 image.png"
            alt="Exploding 404 error graphic"
            className="error-image"
            width={500}
            height={275}
          />
          <h3 className="error-title">Page Not Found</h3>
          <p className="error-message">
            We're sorry, the page you requested cannot be located. It might have
            been moved, deleted, or you may have typed the address incorrectly.
          </p>
          <Link to="/">
            <button className="home-button">Go Home</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
