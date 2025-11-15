import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/FirebaseConfig";
import { errorMap } from "../types/Types";
import { FirebaseError } from "firebase/app";
import useAlert from "../hooks/useAlert";

export default function useDeleteTask() {
  const { message, visible, type, displayMessage } = useAlert();

  const queryClient = useQueryClient();

  const deleteTaskFn = async (id: string): Promise<void> => {
    if (auth.currentUser?.uid) {
      const taskRef = doc(db, "users", auth.currentUser?.uid, "tasks", id);
      await deleteDoc(taskRef);
    }
  };

  const deleteTask = useMutation({
    mutationFn: deleteTaskFn,
    onSuccess: () => {
      displayMessage("Task deleted", "success");
      queryClient.invalidateQueries({
        queryKey: ["todos", auth.currentUser?.uid],
      });
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        const message = errorMap[error.code] || "unexpected error occured";
        displayMessage(message, "error");
      } else {
        displayMessage("An unknown system error occurred.", "error");
      }
    },
  });

  return { message , visible , type , deleteTask }
}
