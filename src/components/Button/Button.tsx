import { FC } from "react";
import styles from "./button.module.scss";

interface buttonProps {
  text: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<buttonProps> = ({ text, disabled, onClick }) => {
  return (
    <button
      disabled={disabled}
      className={disabled ? styles.buttodDisabled : styles.button}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
