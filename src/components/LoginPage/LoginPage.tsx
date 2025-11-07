import { Link, useNavigate } from "react-router-dom";
import { HeaderBrand } from "../HeaderBrand/HeaderBrand";
import { motion } from "framer-motion";
import { type errorType, errorMap } from "../../utils/Types";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  type User,
} from "firebase/auth";
import { auth, googleProvider } from "../../config/FirebaseConfig";
import "./LoginPage.css";
import { FirebaseError } from "firebase/app";

export function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<errorType>({
    message: "",
    visible: false,
  });
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const navigate = useNavigate();

  const displayErrorMessage = (message: string, duration: number = 3000) => {
    setErrorMessage({
      message: message,
      visible: true,
    });

    if (duration > 0) {
      setTimeout(() => {
        setErrorMessage({
          message: "",
          visible: false,
        });
      }, duration);
    }
  };

  const handleSignInWithEmail = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User> => {
    const persistanceType = rememberMe
      ? browserLocalPersistence
      : browserSessionPersistence;

    await setPersistence(auth, persistanceType);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  };

  const signInWithEmail = useMutation({
    mutationFn: handleSignInWithEmail,
    onSuccess: (user) => {
      if (user) {
        navigate("/Home page");
      } else {
        displayErrorMessage("An unexpected error occurred.");
      }
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        const message = errorMap[error.code] || "An unexpected error occurred.";
        displayErrorMessage(message);
      } else {
        displayErrorMessage("An unknown system error occurred.");
      }
    },
  });

  const handleSignInWithGoogle = async () => {
    const persistanceType = rememberMe
      ? browserLocalPersistence
      : browserSessionPersistence;

    await setPersistence(auth, persistanceType);
    const userCredential = await signInWithPopup(auth, googleProvider);
    return userCredential.user;
  };

  const signInWithGoogle = useMutation({
    mutationFn: handleSignInWithGoogle,
    onSuccess: (user) => {
      if (user) {
        navigate("/Home page");
      } else {
        displayErrorMessage("An unexpected error occurred.");
      }
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        const message = errorMap[error.code] || "An unexpected error occurred.";
        displayErrorMessage(message);
      } else {
        displayErrorMessage("An unknown system error occurred.");
      }
    },
  });

  return (
    <main className="login-page">
      <HeaderBrand />
      {errorMessage.visible && (
        <motion.div
          className="error-message-box"
          initial={{
            opacity: 0,
            y: "-10px",
          }}
          animate={{
            opacity: 1,
            y: "0px",
          }}
          exit={{
            y: "-10px",
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <div
            className={
              errorMessage.message ===
              "Verification Email Sent! Please open the email from us and click the link. The link will expire in 2 minutes."
                ? "error-container-green"
                : "error-container-red"
            }
          >
            <p>{errorMessage.message}</p>
          </div>
        </motion.div>
      )}
      <section className="login-card">
        <hgroup className="login-header">
          <h1 className="login-title">Welcome back!</h1>
          <p className="login-subtitle">Please enter your details.</p>
        </hgroup>

        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <div className="form-remember-me">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="remember-me-txt">
                Remember me
              </label>
            </div>

            <Link to="/password-reset">
              <button type="button" className="forgot-password-link">
                Forgot password?
              </button>
            </Link>
          </div>
        </form>
        <button
          type="submit"
          className="sign-in-button primary-button"
          onClick={() => signInWithEmail.mutate({ email, password })}
          disabled={signInWithEmail.isPending || errorMessage.visible}
        >
          {signInWithEmail.isPending ? (
            <div className="dot-spinner">
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
            </div>
          ) : (
            "Sign in"
          )}
        </button>
        <button
          type="button"
          className="sign-in-google-button secondary-button"
          onClick={() => signInWithGoogle.mutate()}
        >
          <img src="Google.png" width={15} height={15} />
          {signInWithGoogle.isPending ? (
            <div className="dot-spinner dot-spinner-black">
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
            </div>
          ) : (
            "Sign in with Google"
          )}
        </button>

        <p className="signup-prompt">
          Don't have an account?{" "}
          <Link className="sign-up-link" to="/sign-up">
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
}
