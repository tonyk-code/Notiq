import { Link } from "react-router-dom";
import "./LoginPage.css";
import useLogin from "../../hooks/useLogin";
import AnimatedAlert from "../../components/AnimatedAlert/AnimatedAlert";
import { HeaderBrand } from "../../components/HeaderBrand/HeaderBrand";
import Spinner from "../../components/Spinner/Spinner";

export function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    message,
    visible,
    type,
    signInWithGoogle,
    signInWithEmail,
    rememberMe,
    setRememberMe,
  } = useLogin();

  return (
    <main className="login-page">
      <HeaderBrand />
      {visible && <AnimatedAlert message={message} type={type} />}
      <section className="login-card">
        <hgroup className="login-header">
          <h1 className="login-title">Welcome back!</h1>
          <p className="login-subtitle">Please enter your details.</p>
        </hgroup>

        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <div className="form-remember-me">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="remember-me-txt">
                Remember me
              </label>
            </div>

            <Link to="/password-reset">
              <button type="button" className="forgot-password-link">
                Forgot password?
              </button>
            </Link>
          </div>
        </form>
        <button
          type="submit"
          className="sign-in-button primary-button"
          onClick={() => signInWithEmail.mutate({ email, password })}
          disabled={signInWithEmail.isPending || visible}
        >
          {signInWithEmail.isPending ? <Spinner color="" /> : "Sign in"}
        </button>
        <button
          type="button"
          className="sign-in-google-button secondary-button"
          onClick={() => signInWithGoogle.mutate()}
        >
          <img src="Google.png" width={15} height={15} />
          {signInWithGoogle.isPending ? (
            <Spinner color="dot-spinner-black" />
          ) : (
            "Sign in with Google"
          )}
        </button>

        <p className="signup-prompt">
          Don't have an account?{" "}
          <Link className="sign-up-link" to="/sign-up">
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
}
