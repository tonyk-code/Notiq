import { useMutation } from "@tanstack/react-query";
import { auth, db } from "../../../config/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

import { errorMap } from "../../../utils/Types";
import useAlert from "../../../hooks/useAlert";
export default function useUserSetup() {
  const navigate = useNavigate();
  const { message, visible, displayMessage, type } = useAlert();

  const setupDoc = async (): Promise<void> => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      throw new Error("No authenticated user (uid is undefined)");
    }
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      await setDoc(
        userRef,
        {
          createdAt: new Date(),
        },
        { merge: true }
      );
    }
  };

  const { mutate } = useMutation({
    mutationFn: setupDoc,
    onSuccess: () => {
      navigate("/Home page");
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

  return { mutate, visible, message, type, navigate };
}
