import { Link } from "react-router-dom";
import "./SignupPage.css";
import { HeaderBrand } from "../HeaderBrand/HeaderBrand";
import AnimatedAlert from "../AnimatedAlert/AnimatedAlert";
import Spinner from "../Spinner/Spinner";
import useSignup from "./hooks/useSignup";

export function SignupPage() {
  const {
    visible,
    message,
    type,
    email,
    setEmail,
    signupWithEmail,
    password,
    setPassword,
    signInWithGoogleMutate,
  } = useSignup();

  return (
    <main>
      <HeaderBrand />
      {visible && <AnimatedAlert message={message} type={type} />}
      <section className="login-card">
        <hgroup className="login-header">
          <h1 className="login-title">Welcome</h1>
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
              disabled={signupWithEmail.isPending}
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
              disabled={signupWithEmail.isPending}
            />
          </div>
        </form>
        <button
          className="sign-in-button primary-button"
          disabled={signupWithEmail.isPending || visible}
          onClick={() => signupWithEmail.mutate({ email, password })}
        >
          {signupWithEmail.isPending ? (
            <Spinner color="dot-spinner" />
          ) : (
            "Sign up"
          )}
        </button>
        <button
          type="button"
          className="sign-in-google-button secondary-button"
          onClick={() => signInWithGoogleMutate.mutate()}
        >
          <img src="Google.png" width={15} height={15} />
          {signInWithGoogleMutate.isPending ? (
            <Spinner color="dot-spinner-black" />
          ) : (
            "Sign up with Google"
          )}
        </button>

        <p className="signup-prompt">
          have an account?
          <Link className="sign-up-link" to="/login">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
