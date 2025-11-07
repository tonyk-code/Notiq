import { auth } from "../../config/FirebaseConfig";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import "./Reauthenticate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export function Reauthenticate() {
  const [providerId, setProviderId] = useState<string | null>(null);
  const inputContRef = useRef<HTMLInputElement | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;

    if (user?.providerData[0]?.providerId) {
      setProviderId(user.providerData[0].providerId);
    }
  }, []);

  return (
    <>
      <div className="reauth-container">
        <div className="good-bye-image-container">
          <img src="Good Bye.png" alt="" width={53} height={80} />
        </div>
        <h2 className="reauth-title">Confirm Your Identity</h2>

        {providerId === "google.com" && (
          <button className="google-btn">
            <img src="Google.png" width={15} height={15} />
            Continue with Google
          </button>
        )}

        {providerId === "password" && (
          <form className="email-reauth-form">
            <div className="reauth-input-container" ref={inputContRef}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                onFocus={() => {
                  if (inputContRef.current)
                    inputContRef.current.style.border = "2px solid #107cf7af";
                }}
                onBlur={() => {
                  if (inputContRef.current) {
                    inputContRef.current.style.border = "2px solid #0000003f";
                  }
                }}
              />
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} className="fa-eye-icon" />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} className="fa-eye-icon" />
                )}
              </div>
            </div>
            <button type="submit">Confirm and Delete Account</button>
          </form>
        )}

        <Link to="/Home page">
          <button className="cancel-btn">Cancel</button>
        </Link>
      </div>
    </>
  );
}
