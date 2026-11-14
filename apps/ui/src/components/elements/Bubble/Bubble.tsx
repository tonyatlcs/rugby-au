import type { MouseEventHandler, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Bubble.module.scss";

type BubbleProps = {
  icon: ReactNode;
  title?: string;
  description?: string;
  variant?: "default" | "action";
  label?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Bubble = (props: BubbleProps) => {
  const className = clsx(styles.wrapper, {
    [styles.action]: props.variant === "action",
  });

  if (props.variant === "action") {
    return (
      <button className={className} type="button" onClick={props.onClick}>
        <span className={styles.actionIcon} aria-hidden="true">{props.icon}</span>
        <span>{props.label}</span>
      </button>
    );
  }

  return (
    <div className={className}>
      <div className={styles.iconContainer}>{props.icon}</div>
      <div className={styles.textContainer}>
        {props.title && <h4>{props.title}</h4>}
        {props.description && <span>{props.description}</span>}
      </div>
    </div>
  );
};
