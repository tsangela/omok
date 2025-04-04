import Messages from "../../utils/messages";
import { classNames } from "../../utils/classNames";

import styles from "./InfoTooltip.module.scss";
import { FiInfo } from "react-icons/fi";

type TooltipPosition = "top" | "bottom" | "left" | "right";

type InfoTooltipProps = {
  id: string;
  className?: string;
  message: string;
  position?: TooltipPosition;
  subject: string;
}

export function InfoTooltip({ id, className, subject, message, position = "bottom" }: InfoTooltipProps) {
  return (
    <div className={classNames(styles.tooltip, className)}>
      <FiInfo
        aria-label={Messages.infoTooltip(subject)}
        className={styles.tooltipIcon}
        tabIndex={0}
      />
      <span
        id={id}
        className={classNames(styles.tooltipText, styles[position])}
        role="tooltip"
      >
        {message}
      </span>
    </div>
  )
}