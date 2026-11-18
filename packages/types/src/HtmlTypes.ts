/** data-* key type */
export type DataAttributeName = `data-${string}`;

/** For the data-* attributes in an element */
export type DataAttributes = {
  [key: DataAttributeName]: string | number | boolean | undefined;
};