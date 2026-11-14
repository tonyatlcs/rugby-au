"use client";

import { SideNavSection } from "@/components/elements/SideNav/SideNavSection/SideNavSection";
import { ProgressBar } from "@/components/elements/ProgressBar/ProgressBar";
import React from "react";
import { Check, ListChecks } from "lucide-react";
import clsx from "clsx";
import styles from "@/features/site/pages/SiteEditorPage/components/OnboardingStepsSection/OnboardingStepsSection.module.scss";

export type OnboardingStep = {
  id: string;
  title: string;
  subtitle: string;
  completed: boolean;
  active: boolean;
};

interface OnboardingStepsSectionProps {
  steps: OnboardingStep[];
  collapsed?: boolean;
}

const StepRow: React.FC<OnboardingStep & { number: number }> = (props) => {
  const isActive = props.active && !props.completed;

  return (
    <div className={styles.stepRowWrapper}>
      <span
        className={clsx(styles.status, {
          [styles.completed]: props.completed,
          [styles.active]: isActive,
        })}
      >
        {props.completed ? <Check size={16} /> : props.number}
      </span>
      <div className={styles.stepContent}>
        <span
          className={clsx({
            [styles.completedTitle]: props.completed,
            [styles.title]: !props.completed,
            [styles.activeTitle]: isActive,
            [styles.pendingTitle]: !props.completed && !isActive,
          })}
        >
          {props.title}
        </span>
        <span className={styles.subtitle}>{props.subtitle}</span>
      </div>
    </div>
  );
};

export const OnboardingStepsSection: React.FC<OnboardingStepsSectionProps> = (
  props,
) => {
  const completedCount = props.steps.filter((step) => step.completed).length;
  const nextStep = props.steps.find((step) => !step.completed);

  return (
    <SideNavSection
      primaryTitle={"Getting Started"}
      titleIcon={
        <>
          {props.collapsed && (
            <ListChecks
              className={styles.titleIcon}
              aria-hidden="true"
              size={20}
            />
          )}
        </>
      }
      secondaryTitle={
        <span className={styles.stepCount}>
          {completedCount} of {props.steps.length}
        </span>
      }
    >
      <ProgressBar
        className={styles.progress}
        value={completedCount}
        max={Math.max(props.steps.length, 1)}
      />
      {props.collapsed ? (
        <p className={styles.nextStep}>
          {nextStep ? (
            <>
              <span>Next:</span> {nextStep.title}
            </>
          ) : (
            "All steps completed"
          )}
        </p>
      ) : (
        props.steps.map((step, index) => (
          <StepRow key={step.id} {...step} number={index + 1} />
        ))
      )}
    </SideNavSection>
  );
};
