"use client";

import { DropdownInput } from "@/components/controls/DropdownInput";
import { TextInput } from "@/components/controls/TextInput";
import { Modal } from "@/components/elements/Modal";
import { useModalManager } from "@/providers/Modal";
import styles from "@/features/site/pages/SiteEditorPage/components/CreatePageModal/CreatePageModal.module.scss";
import React, { useState } from "react";
import { Button } from "@/components/controls/Button";
import { Form } from "@/components/controls/Form";
import { useForm } from "@/hooks/useForm";
import { useRouter } from "next/navigation";
import type { CreatePageRequest } from "@rugby-au/contracts";

interface CreatePageModalProps {
  sitePath: string;
  siteId: string;
  pages: { id: string; title: string }[];
}

const initialValues = { title: "", path: "", parentPageId: "" };

const validatePage = (values: Record<string, string>) => {
  const errors: Record<string, string> = {};
  if (!values.title.trim()) errors.title = "Enter a page title";
  if (!values.path.trim()) errors.path = "Enter a page address";
  return errors;
};

export const CreatePageModal: React.FC<CreatePageModalProps> = (props) => {
  const { closeModal } = useModalManager();
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const titleRef = React.useRef<HTMLInputElement>(null);
  const pathRef = React.useRef<HTMLInputElement>(null);
  const { values, errors, setField, isValid } = useForm(
    initialValues,
    validatePage,
  );

  const handleSubmit = async () => {
    const currentValues = {
      parentPageId: values.parentPage,
      title: titleRef.current?.value.trim() ?? "",
      path: pathRef.current?.value.trim() ?? "",
    };
    if (!isValid(currentValues)) return;

    const page: CreatePageRequest = {
      siteId: props.siteId,
      title: currentValues.title,
      path: currentValues.path,
      parentId: currentValues.parentPageId || undefined,
    };
    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
      });
      if (!response.ok) throw new Error("Failed to create page");
      closeModal();
      router.refresh();
    } catch {
      setSubmitError("Could not create the page. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title="Create page"
      subtitle="Add a new page to your site."
      showCloseButton
      canClose={() => true}
      onClose={closeModal}
    >
      <Form
        className={styles.wrapper}
        noValidate
        disabled={submitting}
        onSubmit={handleSubmit}
      >
        <TextInput
          label="Page title"
          defaultValue={values.title}
          ref={titleRef}
          onBlur={(event) => setField("title", event.target.value)}
          onClear={() => {
            if (titleRef.current) titleRef.current.value = "";
            setField("title", "");
          }}
          errorMsg={errors.title}
          required
          placeholder="e.g. Home Page"
          clearable
          variant="outlined"
        />
        <TextInput
          variant="pageAddress"
          label="Page address"
          required
          clearable={false}
          startAdornment={props.sitePath}
          defaultValue={values.path}
          ref={pathRef}
          onBlur={(event) => setField("path", event.target.value)}
          errorMsg={errors.path}
          placeholder="/"
        />
        <DropdownInput
          options={[
            { label: "Website root", value: "" },
            ...props.pages.map((page) => ({
              label: page.title,
              value: page.id,
            })),
          ]}
          value={values.parentPage}
          onChange={(value) => setField("parentPage", value)}
          label="Organise under"
          fullWidth
          placeholder="Choose which page it falls under"
        />
        {submitError && <p role="alert">{submitError}</p>}
        <div className={styles.actionCtaContainer}>
          <Button
            type="button"
            buttonColor="secondary"
            buttonSize="large"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button type="submit" buttonColor="primary" buttonSize="large">
            {submitting ? "Creating…" : "Create page"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
