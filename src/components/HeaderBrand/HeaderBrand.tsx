import { useNavigate } from "react-router-dom";
import "./HeaderBrand.css";

export function HeaderBrand({
  className = "",
  onClick,
}: {
  className: string;
  onClick?: () => void;
}) {
  const navigate = useNavigate();
  const handleClick = onClick || (() => navigate("/"));

  return (
    <div className={`header-brand ${className}`} onClick={handleClick}>
      <img
        src="notiq-logo.png"
        alt="NOTIQ Logo"
        title="NOTIQ"
        width={50}
        height={44}
      />
      <span className="brand-name">NOTIQ</span>
    </div>
  );
}
