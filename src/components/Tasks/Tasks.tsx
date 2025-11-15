import "../Tasks/Tasks.css";
import AnimatedAlert from "../AnimatedAlert/AnimatedAlert";
import Spinner from "../Spinner/Spinner";
import useDeleteTask from "../../hooks/useDeleteTask";

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
  const { message, visible, type, deleteTask } = useDeleteTask();

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
              <Spinner color="dot-spinner-red" />
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
