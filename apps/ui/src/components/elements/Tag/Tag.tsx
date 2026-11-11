"use client";

import React, { ReactNode } from "react";
import styles from "@/components/elements/Tag/Tag.module.scss";
import clsx from "clsx";

interface TagProps {
  children: ReactNode;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ children, className }) => {
  return <div className={clsx(styles.wrapper, className)}>{children}</div>;
};
