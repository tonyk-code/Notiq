import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import "../Tasks/Tasks.css";
import { auth, db } from "../../../config/FirebaseConfig";
import { errorMap } from "../../../utils/Types";
import { FirebaseError } from "firebase/app";
import useAlert from "../../../hooks/useAlert";
import AnimatedAlert from "../../AnimatedAlert/AnimatedAlert";

export function Tasks({
  id,
  title,
  description,
  createdAt,
  tags,
}: {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  tags: string;
}) {
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
  return (
    <>
      {visible && <AnimatedAlert message={message} type={type} />}
      <div className="task-container" key={id}>
        <div className="task-header">
          <p className="task-title">{title}</p>
          <button
            className="delete-task-btn"
            onClick={() => deleteTask.mutate(id)}
          >
            {deleteTask.isPending ? (
              <div className="dot-spinner-red">
                <div className="dot-spinner__dot-red"></div>
                <div className="dot-spinner__dot-red"></div>
                <div className="dot-spinner__dot-red"></div>
                <div className="dot-spinner__dot-red"></div>
                <div className="dot-spinner__dot-red"></div>
                <div className="dot-spinner__dot-red"></div>
                <div className="dot-spinner__dot-red"></div>
                <div className="dot-spinner__dot-red"></div>
              </div>
            ) : (
              <i className="fa-regular fa-trash-can"></i>
            )}
          </button>
        </div>

        <div className="task-body">
          <p className="task-description">{description}</p>
        </div>

        <div className="task-footer">
          <p className="task-created-date">
            <i
              className="fa-regular fa-calendar"
              style={{ color: "#969697" }}
            ></i>
            {createdAt}
          </p>

          <div className="tags-container">
            {tags.length !== 0 &&
              tags
                .split(" ")
                .map((tag) => (
                  <Tags tagsName={tag} key={crypto.randomUUID()} />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Tags({ tagsName }: { tagsName: string }) {
  return (
    <span className="task-tags">
      <i
        className="fa-solid fa-tag fa-xs"
        style={{ color: "rgba(52, 83, 209, 0.847)" }}
      ></i>
      {tagsName}
    </span>
  );
}
