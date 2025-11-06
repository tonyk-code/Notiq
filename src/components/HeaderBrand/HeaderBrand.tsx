import { useNavigate } from "react-router-dom";
import './HeaderBrand.css'

export function HeaderBrand() {
  const navigate = useNavigate();
  return (
    <div className="header-brand-signup" onClick={() => navigate("/")}>
      <img
        src="notiq-logo.png"
        alt="NOTIQ Logo"
        title="NOTIQ"
        width={50}
        height={44}
      />
      <span className="brand-name-signup">NOTIQ</span>
    </div>
  );
}
