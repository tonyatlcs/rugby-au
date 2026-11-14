import { useState } from 'react'

type FormValues = Record<string, string>
type FormErrors = Record<string, string>

export function useForm(
  initialValues: FormValues,
  validate: (values: FormValues) => FormErrors,
) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})

  function setField(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }))
  }

  function isValid(currentValues = values) {
    const nextErrors = validate(currentValues)
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  return { values, errors, setField, isValid }
}
