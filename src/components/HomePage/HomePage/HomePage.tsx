import { Tasks } from "../Tasks/Tasks";
import { DeleteAccountDialog } from "../DeleteAccountDialog/DeleteAccountDialog";
import { AddTaskForm } from "../AddTaskForm/AddTaskForm";
import { useState, useEffect } from "react";
import { auth, db } from "../../../config/FirebaseConfig";
import { motion } from "framer-motion";
import "../HomePage/HomePage.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { errorMap, type Task, type errorType } from "../../../utils/Types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

export function HomePage() {
  const [isTaskFormVisible, setIsTaskFormVisible] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>("");
  const [activeGrid, setActiveGrid] = useState<boolean>(true);
  const [activeCalander, setActiveCalander] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null | undefined>("");
  const [accountActions, setAccountActions] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<errorType>({
    message: "",
    visible: false,
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const navigate = useNavigate();

  const displayErrorMessage = (message: string, duration: number = 3000) => {
    setErrorMessage({
      message: message,
      visible: true,
    });

    if (duration > 0) {
      setTimeout(() => {
        setErrorMessage({
          message: "",
          visible: false,
        });
      }, duration);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email);
        setPhotoUrl(user.photoURL);
      }
    });
    return () => unsub();
  }, []);

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
        displayErrorMessage(message);
      } else {
        displayErrorMessage("An unknown system error occurred.");
      }
    },
  });

  return (
    <>
      {errorMessage.visible && (
        <motion.div
          className="error-message-box"
          initial={{
            opacity: 0,
            y: "-10px",
          }}
          animate={{
            opacity: 1,
            y: "0px",
          }}
          exit={{
            y: "-10px",
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <div
            className={
              errorMessage.message ===
              "Verification Email Sent! Please open the email from us and click the link. The link will expire in 2 minutes."
                ? "error-container-green"
                : "error-container-red"
            }
          >
            <p>{errorMessage.message}</p>
          </div>
        </motion.div>
      )}
      <div className="Home-page-container">
        <div className="header">
          <div className="header-left-container">
            <div
              className="header-brand-homePage"
              onClick={() => window.location.reload()}
            >
              <img
                src="notiq-logo.png"
                alt="NOTIQ Logo"
                title="NOTIQ"
                width={50}
                height={44}
              />
              <span className="brand-name-signup">NOTIQ</span>
            </div>
            <div
              className="header-left"
              onClick={() => setAccountActions(false)}
            >
              <i
                className="fa-solid fa-magnifying-glass fa-sm"
                style={{ color: "#a0a0a2" }}
              ></i>
              <input
                type="text"
                placeholder="Search title..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
            </div>
          </div>

          <div
            className="header-right-homepage"
            onClick={() => setAccountActions(!accountActions)}
          >
            {photoUrl !== null || photoUrl === "" ? (
              <img
                src={photoUrl}
                alt="Profile"
                style={{ borderRadius: "50%" }}
                width={30}
                height={30}
              />
            ) : (
              <i
                className="fa-solid fa-circle-user fa-xl"
                style={{ color: "#107bf7" }}
              ></i>
            )}
            <p className="account-name">{userName}</p>
          </div>
          {accountActions && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "90px",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              className="account-actions"
            >
              <motion.button
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="signout-button danger-button"
                onClick={() => {
                  signOutMutation.mutate();
                }}
              >
                {signOutMutation.isPending ? (
                  <div className="dot-spinner dot-spinner-black">
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
                  "Sign out"
                )}
              </motion.button>
              <motion.button
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                onClick={() => setDeleteConfirmation(true)}
                className="delete-account-button danger-button"
              >
                Delete account
              </motion.button>
            </motion.div>
          )}
        </div>

        <p
          className="task-manager-text"
          onClick={() => setAccountActions(false)}
        >
          Task Manager
        </p>

        <div
          className="display-buttons"
          onClick={() => setAccountActions(false)}
        >
          <div className="display-buttons-left">
            <button
              className={`grid-view-btn ${activeGrid ? "active-btn" : ""}`}
              onClick={() => {
                setActiveGrid(true);
                setActiveCalander(false);
              }}
            >
              <i className="fa-solid fa-grip"></i>
              Roomy
            </button>

            <button
              className={`calender-view-btn ${
                activeCalander ? "active-btn" : ""
              }`}
              onClick={() => {
                setActiveGrid(false);
                setActiveCalander(true);
              }}
            >
              <i className="fa-regular fa-calendar"></i>
              Calander
            </button>
          </div>

          <div className="display-buttons-right">
            <button
              className="add-new-task-btn"
              onClick={() => {
                setIsTaskFormVisible(true);
                setAccountActions(false);
              }}
            >
              <FontAwesomeIcon icon={faCalendarPlus} />
              New Task
            </button>
          </div>
        </div>

        <div className="task-grid" onClick={() => setAccountActions(false)}>
          {isLoading || isFetching ? (
            <div className="spinner center">
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
            </div>
          ) : data === null || data === undefined || data.length === 0 ? (
            <p className="no-task-text">
              You have no tasks yet! Click the <strong>"New Task"</strong>{" "}
              button above to add your first task.
            </p>
          ) : (
            filtered?.map((task) => (
              <Tasks
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                tags={task.tags}
                createdAt={task.createdAt}
              />
            ))
          )}
        </div>

        {isTaskFormVisible && (
          <AddTaskForm
            isTaskFormVisible={isTaskFormVisible}
            setIsTaskFormVisible={setIsTaskFormVisible}
          />
        )}

        {deleteConfirmation && (
          <DeleteAccountDialog
            displayErrorMessage={displayErrorMessage}
            setDeleteConfirmation={setDeleteConfirmation}
          />
        )}
      </div>
    </>
  );
}
