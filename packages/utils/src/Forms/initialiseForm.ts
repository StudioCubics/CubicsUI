import type { ActionResponse } from "../API/apiRes";

export function initialiseForm<T extends string = string>(
  ...fieldNames: T[]
): ActionResponse<T, T[]> {
  const fieldErrors = {} as Record<T, T[]>;
  for (const fieldName of fieldNames) {
    fieldErrors[fieldName] = [] as T[];
  }
  return {
    success: false,
    fieldErrors,
  };
}
