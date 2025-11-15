import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth , db} from "../config/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { errorMap } from "../types/Types";
import useAlert from "../hooks/useAlert";

export default function useAddTask(
  setIsTaskFormVisible: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [titleVal, setTitleVal] = useState<string>("");
  const [descriptionVal, setDescriptionVal] = useState<string>("");
  const [tagsVal, setTagsVal] = useState<string>("");
  const [uid, setUid] = useState<string | null>("");
  const { message, type, visible, displayMessage } = useAlert();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const queryClient = useQueryClient();

  onAuthStateChanged(auth, (user) => {
    setUid(user ? user.uid : null);
  });

  const addTaskFn = async ({
    title,
    description,
    tags,
  }: {
    title: string;
    description: string;
    tags: string;
  }): Promise<void> => {
    if (!uid) {
      throw new Error("No Auth");
    }

    const userRef = collection(db, "users", uid, "tasks");
    const userDoc = doc(userRef);

    await setDoc(userDoc, {
      title,
      description,
      tags,
      createdAt:
        new Date().getFullYear() +
        "-" +
        new Date().getMonth() +
        "-" +
        new Date().getDate(),
    });
  };

  const addTask = useMutation({
    mutationFn: addTaskFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos", auth.currentUser?.uid],
      });
      setIsTaskFormVisible(false);
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        const message = errorMap[error.code] || "Unexpected error ocured";
        displayMessage(message, "error");
      } else {
        displayMessage("An unknown system error occurred.", "error");
      }
    },
  });

  return {
    titleVal,
    setTitleVal,
    descriptionVal,
    setDescriptionVal,
    tagsVal,
    setTagsVal,
    titleRef,
    descriptionRef,
    message,
    visible,
    type,
    addTask,
  };
}
