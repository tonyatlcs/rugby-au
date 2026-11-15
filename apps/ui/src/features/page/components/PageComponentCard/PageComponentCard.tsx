import React, { type ReactNode } from "react";
import clsx from "clsx";
import styles from "./PageComponentCard.module.scss";

interface PageComponentCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  locked?: boolean;
  children?: ReactNode;
}

export const PageComponentCard: React.FC<PageComponentCardProps> = ({
  title,
  description,
  icon,
  locked = false,
  children,
}) => (
  <div className={styles.card}>
    <div className={styles.content}>
      <span className={clsx(styles.icon, { [styles.lockedIcon]: locked })} aria-hidden="true">
        {icon}
      </span>
      <div className={styles.text}>
        <h4 className={clsx({ [styles.muted]: locked })}>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
    {children}
  </div>
);
