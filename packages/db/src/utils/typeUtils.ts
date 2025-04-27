export type SinglePopulatedField<K, P, T extends keyof P> = K & Pick<P, T>;

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
