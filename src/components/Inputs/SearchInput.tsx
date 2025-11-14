import { useFilter } from "../../hooks/useFilter";

export const SearchInput = () => {
  const {setInputVal, setAccountActions } = useFilter();
  return (
    <div className="header-left" onClick={() => setAccountActions(false)}>
      <i
        className="fa-solid fa-magnifying-glass fa-sm"
        style={{ color: "#a0a0a2" }}
      ></i>
      <input
        type="text"
        placeholder="Search title..."
        onChange={(e) => setInputVal(e.target.value)}
      />
    </div>
  );
};
