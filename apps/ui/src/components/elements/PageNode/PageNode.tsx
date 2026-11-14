"use client";
import React from "react";
import styles from "@/components/elements/PageNode/PageNode.module.scss";
import { Check, FileChartColumn, Globe, Plus } from "lucide-react";
import clsx from "clsx";

type PageNodeProps = {
  variant: "page" | "website" | "add";
  title: string;
  description?: string;
  active?: boolean;
  isNew?: boolean;
  onSelect?: () => void;
};

export const PageNode: React.FC<PageNodeProps> = (props) => {
  const renderIcon = () => {
    switch (props.variant) {
      case "add":
        return <Plus size={16} color={"var(--color-primary-500)"} />;
      case "website":
        return <Globe size={16} color={"var(--color-greyscale-0)"} />;
      default:
        return (
          <FileChartColumn
            size={16}
            color={
              props.active
                ? "var(--color-greyscale-0)"
                : "var(--color-greyscale-500)"
            }
          />
        );
    }
  };

  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.websiteWrapper]: props.variant === "website",
        [styles.addWrapper]: props.variant === "add",
        [styles.activeWrapper]: props.active,
      })}
      onClick={props.onSelect}
    >
      {props.active && props.variant === "page" && (
        <span className={styles.activeTick} aria-hidden="true">
          <Check size={12} />
        </span>
      )}
      <div
        className={clsx(styles.iconContainer, {
          [styles.websiteIconContainer]: props.variant === "website",
          [styles.addIconContainer]: props.variant === "add",
        })}
      >
        {renderIcon()}
      </div>
      <div
        className={clsx(styles.contents, {
          [styles.pageContents]: props.variant === "page",
        })}
      >
        <h4>{props.title}</h4>
        <span>{props.description}</span>
      </div>
    </div>
  );
};
