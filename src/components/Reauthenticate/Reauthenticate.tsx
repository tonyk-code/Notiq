import { auth, db, googleProvider } from "../../config/FirebaseConfig";
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
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import AnimatedAlert from "../AnimatedAlert/AnimatedAlert";
import useAlert from "../../hooks/useAlert";
import { errorMap } from "../../utils/Types";
import Spinner from "../Spinner/Spinner";

export function Reauthenticate() {
  const [providerId, setProviderId] = useState<string | null>(null);
  const inputContRef = useRef<HTMLInputElement | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { message, visible, type, displayMessage, clearAlert } = useAlert();

  useEffect(() => {
    const user = auth.currentUser;

    if (user?.providerData[0]?.providerId) {
      setProviderId(user.providerData[0].providerId);
    }
  }, []);

  const handleGoogleReauth = async () => {
    const uid = auth!.currentUser!.uid;
    const userTasksRef = collection(db, "users", uid, "tasks");
    const userDocRef = doc(db, "users", uid);

    await reauthenticateWithPopup(auth!.currentUser!, googleProvider);

    const taskSnapShot = await getDocs(userTasksRef);
    const deletions = taskSnapShot.docs.map((d) => deleteDoc(d.ref));
    await Promise.all(deletions);

    await deleteDoc(userDocRef);
    await deleteUser(auth!.currentUser!);
  };

  const handleEmailReauth = async (password: string) => {
    const uid = auth!.currentUser!.uid;
    const userDocRef = doc(db, "users", uid);
    const taskRef = collection(db, "users", uid, "tasks");

    const creditenials = EmailAuthProvider.credential(
      auth!.currentUser!.email!,
      password
    );
    await reauthenticateWithCredential(auth!.currentUser!, creditenials);

    const taskSnapShot = await getDocs(taskRef);
    const deletions = taskSnapShot.docs.map((taskDoc) =>
      deleteDoc(taskDoc.ref)
    );
    await Promise.all(deletions);

    await deleteDoc(userDocRef);
    await deleteUser(auth!.currentUser!);
  };

  const GoogleReauth = useMutation({
    mutationFn: handleGoogleReauth,
    onSuccess: () => {
      clearAlert();
      <Navigate to="/" replace />;
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        const mess = errorMap[error.code] || "";
        displayMessage(mess, "error");
      }
    },
  });

  const EmailReauth = useMutation({
    mutationFn: handleEmailReauth,
    onSuccess: () => {
      clearAlert();
      <Navigate to="/" replace />;
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        const mess = errorMap[error.code] || "";
        displayMessage(mess, "error");
      }
    },
  });

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
