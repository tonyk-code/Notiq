import { auth, googleProvider } from "../../config/FirebaseConfig";
import { Link, Navigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import "./Reauthenticate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useMutation } from "@tanstack/react-query";
import {
  deleteUser,
  reauthenticateWithPopup,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

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

  const handleGoogleReauth = async () => {
    await reauthenticateWithPopup(auth!.currentUser!, googleProvider);
    await deleteUser(auth!.currentUser!);
  };

  const handleEmailReauth = async (password: string) => {
    const creditenials = EmailAuthProvider.credential(
      auth!.currentUser!.email!,
      password
    );
    await reauthenticateWithCredential(auth!.currentUser!, creditenials);
    await deleteUser(auth!.currentUser!);
  };

  const GoogleReauth = useMutation({
    mutationFn: handleGoogleReauth,
    onSuccess: () => {
      <Navigate to="/" replace />;
    },
    onError: () => {},
  });

  const EmailReauth = useMutation({
    mutationFn: handleEmailReauth,
    onSuccess: () => {
      <Navigate to="/" replace />;
    },
    onError: () => {},
  });

  return (
    <>
      <div className="reauth-container">
        <div className="good-bye-image-container">
          <img src="Good Bye.png" alt="" width={53} height={80} />
        </div>
        <h2 className="reauth-title">Confirm Your Identity</h2>

        {providerId === "google.com" && (
          <button className="google-btn" onClick={() => GoogleReauth.mutate()}>
            <img src="Google.png" width={15} height={15} />
            Continue with Google
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
