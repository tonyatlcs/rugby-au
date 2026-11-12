"useClient";

import React, { ReactNode } from "react";
import styles from "@/components/elements/SideNav/SideNav.module.scss";

interface SideNavProps {
  title: string;
  headerNode: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export const SideNav: React.FC<SideNavProps> = (props) => {
  return <div className={styles.wrapper}>{props.children}</div>;
};
