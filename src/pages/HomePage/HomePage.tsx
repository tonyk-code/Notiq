import "../HomePage/HomePage.css";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimatedAlert from "../../components/AnimatedAlert/AnimatedAlert";
import { DeleteAccountDialog } from "../../components/DeleteAccountDialog/DeleteAccountDialog";
import { AddTaskForm } from "../../components/Form/AddTaskForm/AddTaskForm";
import { Tasks } from "../../components/Tasks/Tasks";
import useHomePageLogic from "../../hooks/useHomePageLogic";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import useAlert from "../../hooks/useAlert";
import { useFilter } from "../../hooks/useFilter";
import useTask from "../../hooks/useTask";

export function HomePage() {
  const {
    isTaskFormVisible,
    setIsTaskFormVisible,
    activeGrid,
    setActiveGrid,
    activeCalander,
    setActiveCalander,
    deleteConfirmation,
    setDeleteConfirmation,
  } = useHomePageLogic();

  const { message, visible, type } = useAlert();
  const { filtered, setAccountActions } = useFilter();
  const { taskData } = useTask()

  return (
    <>
      {visible && <AnimatedAlert message={message} type={type} />}
      <div className="Home-page-container">
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
              className={`calender-view-btn ${activeCalander ? "active-btn" : ""
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
          {taskData.isLoading || taskData.isFetching ? (
            <LoadingSpinner />
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
