import Messages from "../../utils/messages";
import { classNames } from "../../utils/classNames";

import styles from "./InfoTooltip.module.scss";

type InfoIconProps = {
  id: string;
  className?: string;
  message: string;
  subject: string;
}

export function InfoTooltip({ id, className, subject, message }: InfoIconProps) {
  return (
    <div className={styles.tooltip}>
      <span
        aria-label={Messages.infoTooltip(subject)}
        className={classNames(styles.tooltipIcon, className)}
        tabIndex={0}
      />
      <span
        id={id}
        className={classNames(styles.tooltipText)}
        role="tooltip"
      >
        {message}
      </span>
    </div>
  )
}