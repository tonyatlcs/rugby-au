"use client";

import type { ReactNode } from "react";
import styles from "@/components/elements/TopNav/TopNav.module.scss";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface TopNavProps {
  title: string;
  description?: ReactNode;
  path?: ReactNode;
  actions?: ReactNode;
}

export const TopNav: React.FC<TopNavProps> = ({
  title,
  description,
  path,
  actions,
}) => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleContainer}>
        <button
          aria-label="Go back"
          type="button"
          className={styles.backCta}
          onClick={() => router.back()}
        >
          <ArrowLeft
            className={styles.backBtn}
            size={20}
            strokeWidth={2}
            color="currentColor"
          />
        </button>
        <div>
          <h3>{title}</h3>
          {description && (
            <div className={styles.overviewDescripton}>{description}</div>
          )}
        </div>
      </div>
      {path}
      {actions && <div className={styles.pageActionContainer}>{actions}</div>}
    </div>
  );
};
