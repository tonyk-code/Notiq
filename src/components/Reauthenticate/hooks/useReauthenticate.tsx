import { auth, db, googleProvider } from "../../../config/FirebaseConfig";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  deleteUser,
  reauthenticateWithPopup,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import useAlert from "../../../hooks/useAlert";
import { errorMap } from "../../../utils/Types";

export default function useReauthenticate() {
  const [providerId, setProviderId] = useState<string | null>(null);
  const inputContRef = useRef<HTMLInputElement | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { message, visible, type, displayMessage, clearAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;

    if (user?.providerData[0]?.providerId) {
      setProviderId(user.providerData[0].providerId);
    }
  }, []);

  const handleGoogleReauth = async () => {
    const uid = auth!.currentUser!.uid;
    const userTasksRef = collection(db, "users", uid, "tasks");
    const userDocRef = doc(db, "users", uid);

    await reauthenticateWithPopup(auth!.currentUser!, googleProvider);

    const taskSnapShot = await getDocs(userTasksRef);
    const deletions = taskSnapShot.docs.map((d) => deleteDoc(d.ref));
    await Promise.all(deletions);

    await deleteDoc(userDocRef);
    await deleteUser(auth!.currentUser!);
  };

  const handleEmailReauth = async (password: string) => {
    const uid = auth!.currentUser!.uid;
    const userDocRef = doc(db, "users", uid);
    const taskRef = collection(db, "users", uid, "tasks");

    const creditenials = EmailAuthProvider.credential(
      auth!.currentUser!.email!,
      password
    );
    await reauthenticateWithCredential(auth!.currentUser!, creditenials);

    const taskSnapShot = await getDocs(taskRef);
    const deletions = taskSnapShot.docs.map((taskDoc) =>
      deleteDoc(taskDoc.ref)
    );
    await Promise.all(deletions);

    await deleteDoc(userDocRef);
    await deleteUser(auth!.currentUser!);
  };

  const GoogleReauth = useMutation({
    mutationFn: handleGoogleReauth,
    onSuccess: () => {
      clearAlert();
      navigate("/");
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        const mess = errorMap[error.code] || "";
        displayMessage(mess, "error");
      }
    },
  });

  const EmailReauth = useMutation({
    mutationFn: handleEmailReauth,
    onSuccess: () => {
      clearAlert();
      navigate("/");
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        const mess = errorMap[error.code] || "";
        displayMessage(mess, "error");
      }
    },
  });

  return {
    providerId,
    inputContRef,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    message,
    visible,
    type,
    GoogleReauth,
    EmailReauth,
  };
}
