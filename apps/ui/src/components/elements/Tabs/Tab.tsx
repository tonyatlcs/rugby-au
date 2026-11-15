"use client";

import React from "react";
import clsx from "clsx";
import styles from "@/components/elements/Tabs/Tab.module.scss";

type Tab = {
  value: string;
  label: string;
};

type TabsProps = {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
};

export const Tab: React.FC<TabsProps> = ({ tabs, value, onChange }) => {
  return (
    <div className={styles.wrapper}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          className={clsx(styles.tab, {
            [styles.selected]: tab.value === value,
          })}
          onClick={() => onChange(tab.value)}
        >
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
