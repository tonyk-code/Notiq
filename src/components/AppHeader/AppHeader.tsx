import "./AppHeader.css";
import { HeaderBrand } from "../HeaderBrand/HeaderBrand";
import { SearchInput } from "../Inputs/SearchInput";
import { HomeProfileDropdown } from "../Dropdown/HomeProfileDropdown";

export const AppHeader = () => {
  return (
    <div className="header">
      <div className="header-left-container">
        <HeaderBrand />
        <SearchInput />
      </div>
      <HomeProfileDropdown />
    </div>
  );
};
