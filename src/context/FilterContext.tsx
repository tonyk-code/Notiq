import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Task } from "../utils/Types";

type FilterContextType = {
  inputVal: string;
  filtered: Task[] | undefined;
  setInputVal: Dispatch<SetStateAction<string>>;
  setAccountActions: Dispatch<SetStateAction<boolean>>;
  accountActions: boolean;
};
export const FilterContext = createContext<FilterContextType>(
  {} as FilterContextType,
);
