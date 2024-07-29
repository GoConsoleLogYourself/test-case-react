import { FC } from "react";
import styles from "./loading.module.scss";

const Loading: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loading;
