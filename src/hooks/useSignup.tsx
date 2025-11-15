import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
  signOut,
  type User,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../config/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { errorMap } from "../types/Types";
import useAlert from "./useAlert";

export default function useSignup() {
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

  const signupWithEmail = useMutation({
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
  return {
    email,
    setEmail,
    password,
    setPassword,
    message,
    visible,
    type,
    signInWithGoogleMutate,
    signupWithEmail,
  };
}
