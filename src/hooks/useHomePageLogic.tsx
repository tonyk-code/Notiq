import { useState } from "react";

export default function useHomePageLogic() {
  const [isTaskFormVisible, setIsTaskFormVisible] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>("");
  const [activeGrid, setActiveGrid] = useState<boolean>(true);
  const [activeCalander, setActiveCalander] = useState<boolean>(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

 
  return {
    isTaskFormVisible,
    setIsTaskFormVisible,
    inputVal,
    setInputVal,
    activeGrid,
    setActiveGrid,
    activeCalander,
    setActiveCalander,
    deleteConfirmation,
    setDeleteConfirmation,
  };
}
