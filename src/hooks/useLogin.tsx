import { useNavigate } from "react-router-dom";
import { errorMap } from "../types/Types";
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
import { auth, googleProvider } from "../config/FirebaseConfig";
import { FirebaseError } from "firebase/app";
import useAlert from "../hooks/useAlert";

export default function useLogin() {
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

  return {
    email,
    setEmail,
    password,
    setPassword,
    message,
    visible,
    type,
    signInWithGoogle,
    signInWithEmail,
    rememberMe,
    setRememberMe,
  };
}
