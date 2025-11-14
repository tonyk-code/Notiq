import { useQuery } from "@tanstack/react-query";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import type { Task } from "../utils/Types";
import { useAuth } from "./useAuth";

export default function useTask() {
  const { user } = useAuth();
  const getTasks = async (): Promise<Task[] | null> => {
    if (!user?.uid) return null;
    const tasksRef = collection(db, "users", user.uid, "tasks");
    const q = query(tasksRef, orderBy("createdAt", "desc"));
    const tasksSnapShot = await getDocs(q);

    const tasks = tasksSnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
    return tasks;
  };

  const taskData = useQuery({
    queryKey: ["todos", user?.uid],
    queryFn: getTasks,
    enabled: !!user?.uid,
  });

  return {
    taskData,
  };
}
