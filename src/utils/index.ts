import { mapTuple } from "@myTypes/index"
import { casingWhitelist } from "./contants"

export function eraseFields<T extends { [K: string]: string }>(fields: T): { [K: string]: "" } {
  const resetedValues = Object.entries(fields!).map(keyPair => [keyPair[0], ""])
  return Object.fromEntries(resetedValues)
}

export const generateId = () => ({
  id: Math.random().toString(36).substring(2, 18),
  created_at: String(new Date()),
  updated_at: String(new Date()),
})

export const FieldsReducers = <T extends object>(formFields: T) => ({
  formFields,
  formatFields: (formatterFn: (tuple: mapTuple) => mapTuple[]): T => {
    const entries = Object.entries(formFields)
    return Object.fromEntries(entries.map(formatterFn))
  },
})

export const Formatter = {
  fields: ([key, value]: mapTuple): mapTuple =>
    casingWhitelist.includes(key) ? [key, value] : [key, value.trim().replace(" ", "_").toLowerCase()],
}
