import Messages from "../../utils/messages";
import { classNames } from "../../utils/classNames";

import styles from "./InfoTooltip.module.scss";

type InfoIconProps = {
  className?: string;
  message: string;
}

export function InfoTooltip({ className, message }: InfoIconProps) {
  return (
    <div className={classNames(styles.tooltip, className)}>
      <span
        className={styles.icon}
        aria-label={Messages.information}
      />
      <span className={classNames(styles.tooltipText)}>{message}</span>
    </div>
  )
}