import "../AddTaskForm/AddTaskForm.css";
import AnimatedAlert from "../AnimatedAlert/AnimatedAlert";
import Spinner from "../Spinner/Spinner";
import useAddTask from "../../hooks/useAddTask";

export function AddTaskForm({
  isTaskFormVisible,
  setIsTaskFormVisible,
}: {
  isTaskFormVisible: boolean;
  setIsTaskFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
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
  } = useAddTask(setIsTaskFormVisible);

  return (
    <>
      {visible && <AnimatedAlert message={message} type={type} />}
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
            {addTask.isPending ? <Spinner color="dot-spinner" /> : "Add Task"}
          </button>
        </div>
      </div>
    </>
  );
}
