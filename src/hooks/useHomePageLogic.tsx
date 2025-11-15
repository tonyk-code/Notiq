import { useState } from "react";
import { auth, db } from "../config/FirebaseConfig";
import { signOut } from "firebase/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { errorMap, type Task } from "../types/Types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import useAlert from "../hooks/useAlert";

export default function useHomePageLogic() {
  const [isTaskFormVisible, setIsTaskFormVisible] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>("");
  const [activeGrid, setActiveGrid] = useState<boolean>(true);
  const [activeCalander, setActiveCalander] = useState<boolean>(false);
  const [accountActions, setAccountActions] = useState(false);
  const { message, visible, type, displayMessage } = useAlert();
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const navigate = useNavigate();

  const getTasks = async (): Promise<Task[] | null> => {
    if (auth.currentUser) {
      const tasksRef = collection(db, "users", auth.currentUser.uid, "tasks");
      const q = query(tasksRef, orderBy("createdAt", "desc"));
      const tasksSnapShot = await getDocs(q);

      const tasks = tasksSnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      return tasks;
    } else {
      return null;
    }
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["todos", auth.currentUser?.uid],
    queryFn: getTasks,
    enabled: !!auth.currentUser,
  });

  const filtered = data?.filter((d) =>
    d.title.toLowerCase().includes(inputVal.toLowerCase())
  );

  const signOutFn = async (): Promise<void> => {
    await signOut(auth);
  };

  const signOutMutation = useMutation({
    mutationFn: signOutFn,
    onSuccess: () => {
      navigate("/login");
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

  return {
    isTaskFormVisible,
    setIsTaskFormVisible,
    inputVal,
    setInputVal,
    activeGrid,
    setActiveGrid,
    activeCalander,
    setActiveCalander,

    accountActions,
    setAccountActions,
    message,
    visible,
    type,
    deleteConfirmation,
    setDeleteConfirmation,
    data,
    isFetching,
    isLoading,
    filtered,
    signOutMutation,
  };
}
