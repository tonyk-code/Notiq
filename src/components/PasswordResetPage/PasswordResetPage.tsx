import { HeaderBrand } from "../HeaderBrand/HeaderBrand";
import "./PasswordResetPage.css";
import AnimatedAlert from "../AnimatedAlert/AnimatedAlert";
import Spinner from "../Spinner/Spinner";
import usePasswordReset from "./hooks/usePasswordReset";

export function PasswordResetPage() {
  const { handleSubmit, email, setEmail, isPending, message, visible, type } =
    usePasswordReset();

  return (
    <>
      {visible && <AnimatedAlert message={message} type={type} />}
      <HeaderBrand />

      <div className="forgot-password-container">
        <div className="forgot-password-header">
          <div className="key-icon">
            <i className="fa-solid fa-key"></i>
          </div>
          <p className="forgot-password-title">Forgot Password?</p>
          <p className="forgot-password-subtitle">
            Enter your email below and we'll send you instructions to reset your
            password.
          </p>
        </div>

        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="input-field"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="reset-password-button"
            disabled={isPending || visible}
          >
            {isPending ? <Spinner color="dot-spinner" /> : "Reset Password"}
          </button>
        </form>
      </div>
    </>
  );
}
