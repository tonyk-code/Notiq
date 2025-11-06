import { useMutation } from "@tanstack/react-query";
import { HeaderBrand } from "../HeaderBrand/HeaderBrand";
import "./PasswordResetPage.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { motion } from "framer-motion";
import { useState } from "react";
import { errorMap, type errorType } from "../../utils/Types";
import { FirebaseError } from "firebase/app";

export function PasswordResetPage() {
  const [email, setEmail] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<errorType>({
    message: "",
    visible: false,
  });

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

  const sendResetLink = async (email: string): Promise<void> => {
    if (!email) {
      throw new Error("auth/missing-email");
    }
    await sendPasswordResetEmail(auth, email);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: sendResetLink,
    onSuccess: () => {
      displayErrorMessage(
        "Password reset link sent! Check your inbox (and spam folder) for instructions.",
        10000
      );
    },
    onError: (error) => {
      let message: string;

      if (error instanceof FirebaseError) {
        message =
          errorMap[error.code] ||
          "An unexpected error occurred. Please try again.";
      } else if (
        error instanceof Error &&
        error.message === "auth/missing-email"
      ) {
        message = "Please enter your email address.";
      } else {
        message = "An unknown error occurred.";
        console.error("Mutation Error: " + message);
      }

      displayErrorMessage(message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(email);
  };

  return (
    <>
      {errorMessage.visible && (
        <motion.div
          className="error-message-box-password-reset"
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
              "Password reset link sent! Check your inbox (and spam folder) for instructions."
                ? "error-container-green-password-reset"
                : "error-container-red-password-reset"
            }
          >
            <p>{errorMessage.message}</p>
          </div>
        </motion.div>
      )}
      <HeaderBrand />

      <div className="forgot-password-container">
        <div className="forgot-password-header">
          <div className="key-icon">
            <i className="fa-solid fa-key"></i>
          </div>
          <p className="forgot-password-title">Forgot Password?</p>
          <p className="forgot-password-subtitle">
            Enter your email below and we'll send you instructions to reset your
            password.
          </p>
        </div>

        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="input-field"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="reset-password-button"
            disabled={isPending}
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
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
