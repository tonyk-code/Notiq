import { Link } from "react-router";
import "./DeleteAccountDialog.css";

export function DeleteAccountDialog({
  setDeleteConfirmation,
}: {
  setDeleteConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className="account-delete-overlay">
        <div className="account-delete-modal">
          <div className="delete-message">
            <div className="delete-warning-icon">
              <p>!</p>
            </div>
            <h4>Delete account</h4>
            <p>
              Are you sure you want to delete your account? This action is
              permanent and cannot be undone.
            </p>
          </div>

          <div className="delete-actions">
            <button
              className="cancel-btn"
              onClick={() => setDeleteConfirmation(false)}
            >
              Cancel
            </button>
            <Link to="/reauthenticate" className="delete-btn-link">
              <button className="delete-btn">Delete Account</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
