export interface DataTree<T extends DataTree<T> = DataTree<object>> {
  $id?: string;
  nodes?: T[];
}
