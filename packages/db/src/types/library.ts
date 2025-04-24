/**
 * A library is composition of components it can contain one or multiple components
 */
export default interface Library {
  name: string;
  componentCount: number;
  rootPath: string;
  desc?: string;
}
