"useClient";

import React, { ReactNode } from "react";
import styles from "@/components/elements/SideNav/SideNav.module.scss";

interface SideNavProps {
  children: ReactNode;
  footer: ReactNode;
}

export const SideNav: React.FC<SideNavProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sections}>{props.children}</div>
      <div className={styles.footer}>{props.footer}</div>
    </div>
  );
};
