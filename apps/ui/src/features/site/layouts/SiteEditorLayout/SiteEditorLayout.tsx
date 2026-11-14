"use client";

import { TopNav } from "@/components/elements/TopNav/TopNav";
import type { ReactNode } from "react";
import type { SiteResponse } from "@/lib/server/sites/retrieve-site/retrieve-site.schema";
import { SideNav } from "@/components/elements/SideNav/SideNav";
import styles from "./SiteEditorLayout.module.scss";
import { PageStructureSection } from "@/features/site/pages/SiteEditorPage/components/PageStructureSection/PageStructureSection";
import {
  type OnboardingStep,
  OnboardingStepsSection,
} from "@/features/site/pages/SiteEditorPage/components/OnboardingStepsSection/OnboardingStepsSection";

interface LayoutProps extends SiteResponse {
  children: ReactNode;
  stepInfo: OnboardingStep[];
}

export default function SiteEditorLayout({
  children,
  siteInformation,
  pageInformation,
  stepInfo,
}: LayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <TopNav
          siteInformation={siteInformation}
          pageInformation={pageInformation}
        />
      </div>
      <div className={styles.body}>
        <SideNav footer={<OnboardingStepsSection steps={stepInfo} />}>
          <PageStructureSection
            pageCount={siteInformation.pageCount}
            pageList={pageInformation}
          />
        </SideNav>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
