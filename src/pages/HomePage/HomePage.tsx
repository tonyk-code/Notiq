import { Tasks } from "../../components/Tasks/Tasks";
import { DeleteAccountDialog } from "../../components/DeleteAccountDialog/DeleteAccountDialog";
import { AddTaskForm } from "../../components/AddTaskForm/AddTaskForm";
import { motion } from "framer-motion";
import "../HomePage/HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import AnimatedAlert from "../../components/AnimatedAlert/AnimatedAlert";
import Spinner from "../../components/Spinner/Spinner";
import useHomePageLogic from "../../hooks/useHomePageLogic";
import type { User } from "firebase/auth";
import { HeaderBrand } from "../../components/HeaderBrand/HeaderBrand";
import { LoadingSpinnerBlade } from "../../components/LoadingSpinnerBlade/LoadingSpinnerBlade";

export function HomePage({ user }: { user: User | null }) {
  const {
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
    isFetching,
    isLoading,
    filtered,
    signOutMutation,
  } = useHomePageLogic();

  return (
    <>
      {visible && <AnimatedAlert message={message} type={type} />}
      <div className="Home-page-container">
        <div className="header">
          <div className="header-left-container">
            <HeaderBrand
              className=""
              onClick={() => window.location.reload()}
            />
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
            {user?.photoURL !== null || user.photoURL === "" ? (
              <img
                src={user?.photoURL}
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
            <p className="account-name">{user?.displayName || user?.email}</p>
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
                  <Spinner color="dot-spinner-black" />
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
            <LoadingSpinnerBlade />
          ) : filtered === null ||
            filtered === undefined ||
            filtered.length === 0 ? (
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
          <DeleteAccountDialog setDeleteConfirmation={setDeleteConfirmation} />
        )}
      </div>
    </>
  );
}
