import { useState } from "react";

export default function useAlert() {
  const [message, setMessage] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [type, setType] = useState<"error" | "success">("error");

  const displayMessage = (
    message: string,
    type: "error" | "success",
    duration: number = 3000
  ) => {
    setVisible(true);
    setMessage(message);
    setType(type);

    if (duration > 0) {
      setTimeout(() => {
        clearAlert();
      }, duration);
    }
  };

  const clearAlert = () => {
    setVisible(false);
    setMessage("");
    setType("error");
  };

  return { message, visible, type, displayMessage, clearAlert };
}
