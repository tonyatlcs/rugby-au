"use client";

import React from "react";
import Image from "next/image";
import styles from "@/features/site/pages/SiteEditorPage/components/EmptyPageBanner/EmptyPageBanner.module.scss";

export const EmptyPageBanner = () => {
  return (
    <div className={styles.wrapper}>
      <Image
        src="/illustrations/empty-page.svg"
        alt=""
        width={60}
        height={80}
      />
      <h5>No pages yet</h5>
      <span>
        Pages you create will be listed here, organised by where they sit in
        your site.
      </span>
    </div>
  );
};
