import React, { type ReactNode } from "react";
import clsx from "clsx";
import styles from "@/features/page/components/PageStructureGuideRow/PageStructureGuideRow.module.scss";

interface PageStructureGuideRowProps {
  title: string;
  description: string;
  icon: ReactNode;
  variant?: "page" | "component";
  indent?: 0 | 1 | 2;
}

export const PageStructureGuideRow: React.FC<PageStructureGuideRowProps> = ({
  title,
  description,
  icon,
  variant = "component",
  indent = 0,
}) => (
  <li className={clsx(styles.level, {
    [styles.indentOne]: indent === 1,
    [styles.indentTwo]: indent === 2,
  })}>
    <span className={clsx(styles.icon, { [styles.pageIcon]: variant === "page" })} aria-hidden="true">
      {icon}
    </span>
    <div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </li>
);
