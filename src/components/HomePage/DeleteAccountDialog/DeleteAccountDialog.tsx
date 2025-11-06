import { useMutation } from "@tanstack/react-query";
import { auth } from "../../../config/FirebaseConfig";
import "./DeleteAccountDialog.css";
import { deleteUser, onAuthStateChanged, type User } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { errorMap } from "../../../utils/Types";

export function DeleteAccountDialog({
  displayErrorMessage,
  setDeleteConfirmation,
}: {
  displayErrorMessage: (message: string, duration?: number) => void;
  setDeleteConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsub();
  }, []);

  const deleteAccount = async (): Promise<void> => {
    if (user) {
      await deleteUser(user);
    } else {
      throw new Error("User not found");
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      navigate("/sign-up");
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        setDeleteConfirmation(false);
        setTimeout(() => {
          const message = errorMap[error.code] || "unexpected error occured";
          displayErrorMessage(message);
        }, 2000);
      } else {
        displayErrorMessage("An unknown system error occurred.");
      }
    },
  });
  return (
    <>
      <div className="account-delete-overlay">
        <div className="account-delete-modal">
          <div className="delete-message">
            <div className="delete-warning-icon">
              <p>!</p>
            </div>
            <h4>Delete account</h4>
            <p>
              Are you sure you want to delete your account? This action is
              permanent and cannot be undone.
            </p>
          </div>

          <div className="delete-actions">
            <button
              className="cancel-btn"
              onClick={() => setDeleteConfirmation(false)}
            >
              Cancel
            </button>
            <button className="delete-btn" onClick={() => mutate()}>
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
                "Delete Account"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
