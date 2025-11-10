import { Link, useNavigate } from "react-router-dom";
import { HeaderBrand } from "../HeaderBrand/HeaderBrand";
import { errorMap } from "../../utils/Types";
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
import useAlert from "../../hooks/useAlert";
import AnimatedAlert from "../AnimatedAlert/AnimatedAlert";

export function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { message, visible, type, displayMessage, clearAlert } = useAlert();
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const navigate = useNavigate();

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
        clearAlert();
        navigate("/Home page");
      } else {
        displayMessage("An unexpected error occurred.", "error");
      }
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        const message = errorMap[error.code] || "An unexpected error occurred.";
        displayMessage(message, "error");
      } else {
        displayMessage("An unknown system error occurred.", "error");
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
        clearAlert();
        navigate("/Home page");
      } else {
        displayMessage("An unexpected error occurred.", "error");
      }
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        const message = errorMap[error.code] || "An unexpected error occurred.";
        displayMessage(message, "error");
      } else {
        displayMessage("An unknown system error occurred.", "error");
      }
    },
  });

  return (
    <main className="login-page">
      <HeaderBrand />
      {visible && <AnimatedAlert message={message} type={type} />}
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
          disabled={signInWithEmail.isPending || visible}
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
