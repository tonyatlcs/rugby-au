# Form

`Form` provides the shared form layout and disables its fields when `disabled` is set. Use it with the existing `useForm` hook and inputs; handle validation and requests in the submit handler.

```tsx
const { values, errors, setField, isValid } = useForm(
  { name: "" },
  (values) => values.name.trim() ? {} : { name: "Enter a name" },
);

return (
  <Form onSubmit={() => { if (isValid()) save(values); }}>
    <TextInput label="Name" value={values.name} errorMsg={errors.name}
      onChange={(event) => setField("name", event.target.value)} />
    <button type="submit">Save</button>
  </Form>
);
```
