import { useContext } from "react";
import { FilterContext } from "../context/FilterContext";

export function useFilter() {
  const data = useContext(FilterContext);
  if(!data) throw new Error("'useFilter needs to be in a filter provider'")
  return data;

}
