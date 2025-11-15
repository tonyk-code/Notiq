import { useMutation } from "@tanstack/react-query";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import { useState } from "react";
import { errorMap } from "../types/Types";
import { FirebaseError } from "firebase/app";
import useAlert from "../hooks/useAlert";

export default function usePasswordReset() {
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

  return { handleSubmit, email, setEmail, isPending, message, visible, type };
}
