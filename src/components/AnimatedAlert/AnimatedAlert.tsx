import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import "./AnimatedAlert.css";

export default function AnimatedAlert({
  type,
  message,
}: {
  type: string;
  message: string;
}) {
  const alertRoot = document.getElementById("root-animated-alert");

  if (!alertRoot) return null;
  return createPortal(
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
      <div className={ type === "error" ? "error-container-red" : "error-container-green"}>
        <p>{message}</p>
      </div>
    </motion.div>,
    alertRoot
  );
}
