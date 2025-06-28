import React, { MouseEventHandler } from "react";
import styles from "./login-button.module.scss";

interface LoginButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
}

function LoginButton({ onClick, disabled, loading }: LoginButtonProps) {
  return (
    <button
      className={styles.loginButton}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Loading..." : "Login"}
    </button>
  );
}

export default LoginButton;
