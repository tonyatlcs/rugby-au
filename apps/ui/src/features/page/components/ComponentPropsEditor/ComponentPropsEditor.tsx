"use client";

import { Button } from "@/components/controls/Button";
import { DropdownInput } from "@/components/controls/DropdownInput";
import { TextInput } from "@/components/controls/TextInput";
import { ComponentEditorDetails } from "@/features/page/components/ComponentEditorDetails/ComponentEditorDetails";
import { Check } from "lucide-react";
import clsx from "clsx";
import styles from "./ComponentPropsEditor.module.scss";

// The form consumes the JSON Schema subset used by our component prop schemas.
type EditorSchema = {
  type?: string;
  title?: string;
  description?: string;
  default?: unknown;
  properties?: Record<string, EditorSchema>;
  required?: string[];
  items?: EditorSchema;
  choices?: EditorSchema[];
  fixedValue?: string;
};

// TypeBox uses JSON Schema's `anyOf` and `const`; translate them once for the editor.
type JsonSchema = Omit<
  EditorSchema,
  "choices" | "fixedValue" | "properties" | "items"
> & {
  anyOf?: JsonSchema[];
  const?: string;
  properties?: Record<string, JsonSchema>;
  items?: JsonSchema;
};

function toEditorSchema(schema: JsonSchema): EditorSchema {
  const { anyOf, const: fixedValue, properties, items, ...fields } = schema;
  return {
    ...fields,
    fixedValue,
    choices: anyOf?.map(toEditorSchema),
    properties:
      properties &&
      Object.fromEntries(
        Object.entries(properties).map(([key, property]) => [
          key,
          toEditorSchema(property),
        ]),
      ),
    items: items && toEditorSchema(items),
  };
}

type Values = Record<string, unknown>;
export type FormConfig = Record<
  string,
  {
    hidden?: boolean;
    createDefault?: () => unknown;
    itemLabel?: string;
    control?: "layout" | "swatch";
    previews?: Record<string, { columns?: number; color?: string }>;
  }
>;
const labelFor = (key: string) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());

function defaultValue(
  schema: EditorSchema,
  config: FormConfig,
  path: string,
): unknown {
  if (config[path]?.createDefault) return config[path].createDefault();
  if (schema.default !== undefined) return schema.default;
  if (schema.type === "object") {
    return Object.fromEntries(
      Object.entries(schema.properties ?? {})
        .filter(([key]) => schema.required?.includes(key))
        .map(([key, field]) => [
          key,
          defaultValue(field, config, path ? `${path}.${key}` : key),
        ]),
    );
  }
  if (schema.type === "array") return [];
  if (schema.choices?.length) return schema.choices[0].fixedValue ?? "";
  return "";
}

function Field({
  schema,
  label,
  value,
  optional,
  onChange,
  config,
  path,
}: {
  schema: EditorSchema;
  config: FormConfig;
  path: string;
  label: string;
  value: unknown;
  optional: boolean;
  onChange: (value: unknown) => void;
}) {
  if (config[path]?.hidden) return null;
  const title = schema.title ?? label;
  const options = schema.choices?.map((option) => option.fixedValue);
  if (
    options?.length &&
    options.every((option): option is string => typeof option === "string")
  ) {
    if (config[path]?.control) {
      const control = config[path].control;
      return (
        <ComponentEditorDetails title={title}>
          <div
            className={
              control === "layout" ? styles.layoutOptions : styles.swatchOptions
            }
          >
            {schema.choices?.map((option) => (
              <Button
                key={option.fixedValue}
                type="button"
                buttonColor="primary"
                buttonSize="medium"
                variant="outlinedDark"
                className={styles.optionContent}
                containerClassName={clsx(styles.option, {
                  [styles.selected]: value === option.fixedValue,
                })}
                onClick={() => onChange(option.fixedValue)}
              >
                {value === option.fixedValue && (
                  <Check
                    className={styles.check}
                    size={16}
                  />
                )}
                {control === "layout" ? (
                  <span className={styles.layoutPreview}>
                    {Array.from(
                      {
                        length:
                          config[path]?.previews?.[option.fixedValue ?? ""]
                            ?.columns ?? 1,
                      },
                      (_, index) => (
                        <span key={index} />
                      ),
                    )}
                  </span>
                ) : (
                  <span
                    className={styles.swatch}
                    style={{
                      background:
                        config[path]?.previews?.[option.fixedValue ?? ""]
                          ?.color,
                    }}
                  />
                )}
                {option.title ??
                  labelFor((option.fixedValue ?? "").replace(/-/g, " "))}
              </Button>
            ))}
          </div>
          {schema.description && (
            <p className={styles.hint}>{schema.description}</p>
          )}
        </ComponentEditorDetails>
      );
    }
    return (
      <DropdownInput
        label={title}
        fullWidth
        value={typeof value === "string" ? value : undefined}
        options={options.map((option) => ({
          value: option,
          label: labelFor(option.replace(/-/g, " ")),
        }))}
        onChange={onChange}
      />
    );
  }
  if (schema.type === "object") {
    if (optional && value == null) {
      return (
        <Button
          type="button"
          buttonColor="secondary"
          buttonSize="medium"
          fullWidth
          onClick={() => onChange(defaultValue(schema, config, path))}
        >
          Add {title.toLowerCase()}
        </Button>
      );
    }
    return (
      <fieldset className={styles.group}>
        <legend>{title}</legend>
        <ObjectFields
          schema={schema}
          config={config}
          path={path}
          value={(value ?? {}) as Values}
          onChange={onChange}
        />
        {optional && (
          <Button
            type="button"
            buttonColor="secondary"
            buttonSize="small"
            onClick={() => onChange(undefined)}
          >
            Remove {title.toLowerCase()}
          </Button>
        )}
      </fieldset>
    );
  }
  if (schema.type === "array" && schema.items) {
    const items = Array.isArray(value) ? value : [];
    const itemSchema = schema.items;
    const itemLabel = config[path]?.itemLabel ?? "Item";
    return (
      <fieldset className={styles.group}>
        <legend>
          {title} ({items.length})
        </legend>
        {items.map((item, index) => (
          <div
            className={styles.item}
            key={typeof item?.id === "string" ? item.id : index}
          >
            <Field
              schema={itemSchema}
              config={config}
              path={path}
              label={`${itemLabel} ${index + 1}`}
              value={item}
              optional={false}
              onChange={(next) =>
                onChange(
                  items.map((current, i) => (i === index ? next : current)),
                )
              }
            />
            <Button
              type="button"
              buttonColor="alert"
              buttonSize="small"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            >
              Remove {itemLabel.toLowerCase()}
            </Button>
          </div>
        ))}
        <Button
          type="button"
          buttonColor="secondary"
          buttonSize="medium"
          fullWidth
          onClick={() =>
            onChange([...items, defaultValue(itemSchema, config, path)])
          }
        >
          Add {itemLabel.toLowerCase()}
        </Button>
      </fieldset>
    );
  }
  if (schema.type === "string") {
    return (
      <TextInput
        label={title}
        width="100%"
        clearable={false}
        value={typeof value === "string" ? value : ""}
        onChange={(event) =>
          onChange(
            optional && !event.target.value ? undefined : event.target.value,
          )
        }
      />
    );
  }
  return <p>Unsupported field: {title}</p>;
}

function ObjectFields({
  schema,
  value,
  onChange,
  config,
  path,
}: {
  schema: EditorSchema;
  config: FormConfig;
  path: string;
  value: Values;
  onChange: (value: Values) => void;
}) {
  return (
    <div className={styles.fields}>
      {Object.entries(schema.properties ?? {}).map(([key, field]) => (
        <Field
          key={key}
          schema={field}
          config={config}
          path={path ? `${path}.${key}` : key}
          label={labelFor(key)}
          value={value[key]}
          optional={!schema.required?.includes(key)}
          onChange={(next) => {
            const updated = { ...value };
            if (next === undefined) delete updated[key];
            else updated[key] = next;
            onChange(updated);
          }}
        />
      ))}
    </div>
  );
}

export function ComponentPropsEditor<T extends object>({
  schema,
  value,
  onChange,
  config = {},
}: {
  schema: unknown;
  config?: FormConfig;
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <ObjectFields
      schema={toEditorSchema(schema as JsonSchema)}
      config={config}
      path=""
      value={value as Values}
      onChange={(next) => onChange(next as T)}
    />
  );
}
