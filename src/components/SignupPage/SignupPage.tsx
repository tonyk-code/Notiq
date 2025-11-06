import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
  signOut,
  type User,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../config/FirebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { motion } from "framer-motion";
import "./SignupPage.css";
import { type errorType, errorMap } from "../../utils/Types";
import { HeaderBrand } from "../HeaderBrand/HeaderBrand";

export function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<errorType>({
    message: "",
    visible: false,
  });
  const navigate = useNavigate();

  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await sendEmailVerification(user);

    displayErrorMessage(
      "Verification Email Sent! Please open the email from us and Check your inbox (and spam folder) and click the link. The link will expire in 2 minutes.",
      0
    );

    return new Promise<User | null>((resolve) => {

      const checkInterval = setInterval(async () => {
        await user.reload();

        if (user.emailVerified) {
          clearInterval(checkInterval);
          clearTimeout(failTimeout);
          resolve(user);
        }
      }, 1000);

      const failTimeout = setTimeout(async () => {
        await user.reload();
        clearInterval(checkInterval);

        if (!user.emailVerified) {
          await deleteUser(user);
          await signOut(auth);
          resolve(null);
        }
      }, 120000);
    });
  };

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

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: (user) => {
      if (user) {
        navigate("/setting up");
      } else {
        displayErrorMessage("Verification timed out. Please sign up again.");
      }
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        const code = errorMap[error.code] || "An unexpected error occurred.";

        displayErrorMessage(code);
      } else {
        displayErrorMessage("An unknown system error occurred.");
      }
    },
  });

  const signInWithGoogle = async (): Promise<User> => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
    return user;
  };

  const signInWithGoogleMutate = useMutation({
    mutationFn: signInWithGoogle,
    onSuccess: (user) => {
      if (user) {
        navigate("/setting up");
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
    <main>
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
              "Verification Email Sent! Please open the email from us and Check your inbox (and spam folder) and click the link. The link will expire in 2 minutes."
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
          <h1 className="login-title">Welcome</h1>
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
              disabled={isPending}
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
              disabled={isPending}
            />
          </div>
        </form>
        <button
          className="sign-in-button primary-button"
          disabled={isPending || errorMessage.visible}
          onClick={() => mutate({ email, password })}
        >
          {isPending ? (
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
            "Sign up"
          )}
        </button>
        <button
          type="button"
          className="sign-in-google-button secondary-button"
          onClick={() => signInWithGoogleMutate.mutate()}
        >
          <img src="Google.png" width={15} height={15} />
          {signInWithGoogleMutate.isPending ? (
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
            "Sign up with Google"
          )}
        </button>

        <p className="signup-prompt">
          have an account?
          <Link className="sign-up-link" to="/login">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
