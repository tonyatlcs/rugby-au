"useClient";

import React, { ReactNode } from "react";
import clsx from "clsx";
import styles from "@/components/elements/SideNav/SideNav.module.scss";

interface SideNavProps {
  orientation: "left" | "right";
  children: ReactNode;
  footer?: ReactNode;
}

export const SideNav: React.FC<SideNavProps> = (props) => {
  return (
    <div className={clsx(styles.wrapper, styles[props.orientation])}>
      <div className={styles.sections}>{props.children}</div>
      <div className={styles.footer}>{props.footer}</div>
    </div>
  );
};
