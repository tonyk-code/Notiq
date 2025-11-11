import { Link } from "react-router";
import "./Reauthenticate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import AnimatedAlert from "../AnimatedAlert/AnimatedAlert";
import Spinner from "../Spinner/Spinner";
import useReauthenticate from "./hooks/useReauthenticate";

export function Reauthenticate() {
  const {
    providerId,
    inputContRef,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    message,
    visible,
    type,
    GoogleReauth,
    EmailReauth,
  } = useReauthenticate();

  return (
    <>
      {visible && <AnimatedAlert type={type} message={message} />}
      <div className="reauth-container">
        <div className="good-bye-image-container">
          <img src="Good Bye.png" alt="" width={53} height={80} />
        </div>
        <h2 className="reauth-title">Confirm Your Identity</h2>

        {providerId === "google.com" && (
          <button className="google-btn" onClick={() => GoogleReauth.mutate()}>
            <img src="Google.png" width={15} height={15} />
            {GoogleReauth.isPending ? (
              <Spinner color="dot-spinner-black" />
            ) : (
              "Continue with Google"
            )}
          </button>
        )}

        {providerId === "password" && (
          <form
            className="email-reauth-form"
            onSubmit={(e) => {
              e.preventDefault();
              EmailReauth.mutate(password);
            }}
          >
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
            <button type="submit">
              {EmailReauth.isPending ? (
                <Spinner color="dot-spinner" />
              ) : (
                "Confirm and Delete Account"
              )}
            </button>
          </form>
        )}

        <Link to="/Home page">
          <button className="cancel-btn">Cancel</button>
        </Link>
      </div>
    </>
  );
}
