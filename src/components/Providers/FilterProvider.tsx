import { useMemo, useState } from "react";
import useTask from "../../hooks/useTask";
import { FilterContext } from "../../context/FilterContext";

export default function FilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inputVal, setInputVal] = useState<string>("");
  const [accountActions, setAccountActions] = useState(false);
  const { taskData } = useTask();

  const filtered = taskData.data?.filter((d) =>
    d.title.toLowerCase().includes(inputVal.toLowerCase()),
  );

  const data = useMemo(() => {
    return {
      inputVal,
      filtered,
      setInputVal,
      setAccountActions,
      accountActions,
    };
  },[inputVal, filtered, setInputVal,setAccountActions,accountActions]);

  return (
    <FilterContext.Provider value={data}>{children}</FilterContext.Provider>
  );
}
