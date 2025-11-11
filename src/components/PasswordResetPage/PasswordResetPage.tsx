import { useMutation } from "@tanstack/react-query";
import { HeaderBrand } from "../HeaderBrand/HeaderBrand";
import "./PasswordResetPage.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { useState } from "react";
import { errorMap } from "../../utils/Types";
import { FirebaseError } from "firebase/app";
import useAlert from "../../hooks/useAlert";
import AnimatedAlert from "../AnimatedAlert/AnimatedAlert";
import Spinner from "../Spinner/Spinner";

export function PasswordResetPage() {
  const [email, setEmail] = useState<string>("");
  const { message, visible, type, displayMessage } = useAlert();

  const sendResetLink = async (email: string): Promise<void> => {
    if (!email) {
      throw new Error("auth/missing-email");
    }
    await sendPasswordResetEmail(auth, email);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: sendResetLink,
    onSuccess: () => {
      displayMessage(
        "Password reset link sent! Check your inbox (and spam folder) for instructions.",
        "success",
        60000
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

      displayMessage(message, "error");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(email);
  };

  return (
    <>
      {visible && <AnimatedAlert message={message} type={type} />}
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
            disabled={isPending || visible}
          >
            {isPending ? <Spinner color="dot-spinner" /> : "Reset Password"}
          </button>
        </form>
      </div>
    </>
  );
}
