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
import "./SignupPage.css";
import { errorMap } from "../../utils/Types";
import { HeaderBrand } from "../HeaderBrand/HeaderBrand";
import useAlert from "../../hooks/useAlert";
import AnimatedAlert from "../AnimatedAlert/AnimatedAlert";

export function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { message, visible, type, displayMessage, clearAlert } = useAlert();
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

    displayMessage(
      "Verification Email Sent! Please open the email from us and Check your inbox (and spam folder) and click the link. The link will expire in 2 minutes.",
      "success",
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

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: (user) => {
      if (user) {
        clearAlert();
        navigate("/setting up");
      } else {
        clearAlert();
        displayMessage(
          "Verification timed out. Please sign up again.",
          "error"
        );
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
    <main>
      <HeaderBrand />
      {visible && <AnimatedAlert message={message} type={type} />}
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
          disabled={isPending || visible}
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
