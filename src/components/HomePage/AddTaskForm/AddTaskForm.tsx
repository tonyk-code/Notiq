import { useRef, useState } from "react";
import "../AddTaskForm/AddTaskForm.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../config/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { errorMap } from "../../../utils/Types";
import useAlert from "../../../hooks/useAlert";
import AnimatedAlert from "../../AnimatedAlert/AnimatedAlert";

export function AddTaskForm({
  isTaskFormVisible,
  setIsTaskFormVisible,
}: {
  isTaskFormVisible: boolean;
  setIsTaskFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
        displayMessage(message , "error");
      } else {
        displayMessage("An unknown system error occurred." , "error");
      }
    },
  });

  return (
    <>
      {visible && (
        <AnimatedAlert message={message} type={type}/>
      )}
      <div
        className="blur-background"
        onClick={() => setIsTaskFormVisible(false)}
      ></div>
      <div className={`add-new-task-form ${isTaskFormVisible ? "show" : ""}`}>
        <form className="add-new-task-body">
          <h2>Add New Task</h2>

          <fieldset className="form-field">
            <label htmlFor="title" className="label-text">
              Title:
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter task title"
              required
              onChange={(e) => setTitleVal(e.target.value)}
              value={titleVal}
              ref={titleRef}
            />
          </fieldset>

          <fieldset className="form-field">
            <label htmlFor="tags" className="label-text">
              Tags:
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              placeholder="e.g., work, personal"
              value={tagsVal}
              onChange={(e) => setTagsVal(e.target.value)}
            />
          </fieldset>

          <fieldset className="form-field">
            <label htmlFor="description" className="label-text">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              cols={50}
              rows={10}
              placeholder="Enter task description"
              onChange={(e) => setDescriptionVal(e.target.value)}
              value={descriptionVal}
              ref={descriptionRef}
            ></textarea>
          </fieldset>
        </form>
        <div className="form-actions">
          <button
            type="button"
            className="close-task-btn"
            onClick={() => {
              setIsTaskFormVisible(false);
            }}
          >
            Cancel
          </button>
          <button
            className="submit-task-btn"
            onClick={() => {
              if (titleVal.trim() === "") {
                if (titleRef.current) {
                  titleRef.current.setCustomValidity("Please enter the title");
                  titleRef.current.reportValidity();
                  titleRef.current.focus();
                }
                return;
              } else if (descriptionVal.trim() === "") {
                if (descriptionRef.current) {
                  descriptionRef.current.setCustomValidity(
                    "Please enter the description"
                  );
                  descriptionRef.current.reportValidity();
                  descriptionRef.current.focus();
                }
                return;
              }

              const title = titleVal;
              const description = descriptionVal;
              const tags = tagsVal;
              addTask.mutate({ title, description, tags });
            }}
          >
            {addTask.isPending ? (
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
              "Add Task"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
