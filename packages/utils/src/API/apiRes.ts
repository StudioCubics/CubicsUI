export type ActionResponse<
  K extends string = string,
  E extends K[] = K[],
  P = unknown,
> = {
  success: boolean;
  payload?: P;
  error?: string;
  fieldErrors?: Record<K, E>;
};

export type FormActionResponse<
  K extends string = string,
  E extends K[] = K[],
  P = unknown,
  F extends Record<K, FormDataEntryValue> = Record<K, FormDataEntryValue>,
> = ActionResponse<K, E, P> & { formState: F };

export const apiRes = {
  actionFail: <K extends string = string, E extends K[] = K[], P = unknown>(
    error: ActionResponse<K, E, P>["error"],
    fieldErrors?: Record<string, string[]>,
  ): ActionResponse<K, E, P> => ({
    success: false,
    error,
    fieldErrors: fieldErrors as ActionResponse<K, E, P>["fieldErrors"],
  }),

  actionSuccess: <K extends string = string, E extends K[] = K[], P = unknown>(
    payload?: P,
  ): ActionResponse<K, E, P> => ({
    success: true,
    payload,
  }),
  /**
   * "You are not authenticated to access this resource."
   */
  unauthorised: "You are not authenticated to access this resource.",
  /**
   * "You do not have the necessary permissions to access this resource."
   */
  forbidden:
    "You do not have the necessary permissions to access this resource.",
  /**
   * "${item} is of wrong type, expected type: ${expectedType}"
   */
  wrongType: (item: string, expectedType?: string) =>
    `${item} is of wrong type${expectedType ? `, expected type: ${expectedType}` : ""}.`,
  /**
   * "An error occured trying to read the formdata in these fields:
   * ${fields}."
   */
  formdataError: (fields: string | string[]) =>
    `An error occured trying to read the formdata in these fields:\n${JSON.stringify(fields)}.`,
  /**
   * "Missing parameter: ${param}."
   */
  missingParams: (param: string | string[]) =>
    `Missing parameter: ${JSON.stringify(param)}.`,
  /**
   * "${item} not found!"
   */
  notFound: (item: string) => `${item} not found!`,
  /**
   * "${item} already exists!"
   */
  alreadyExists: (item: string) => `${item} already exists!`,
  /**
   * "${contentName} size exceeded the maximum of ${maxSize}"
   */
  contentTooLarge: (contentName: string, maxSize?: string) =>
    `${contentName} size exceeded${
      maxSize ? ` the maximum of ${maxSize}` : ""
    }.`,
  /**
   * An API Error has occurred:
   * Check here => ${location}
   * More Info: ${errorMessage}
   */
  error: (location: string, errorMessage: string = "") =>
    `An API Error has occurred:\nCheck here => ${location}\nMore Info: ${errorMessage}`,
};
