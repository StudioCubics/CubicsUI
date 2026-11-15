/** Width and height */
export type Size2D<T = number> = { width: T; height: T };
/** Width, height and depth */
export type Size3D<T = number> = { width: T; height: T; depth: T };
/** Direction/magnitude in 2D space */
export type Vector2D<T = number> = { i: T; j: T };
/** Direction/magnitude in 3D space */
export type Vector3D<T = number> = { i: T; j: T; k: T };
/** Position in 2D space */
export type Point2D<T = number> = { x: T; y: T };
/** Position in 3D space */
export type Point3D<T = number> = { x: T; y: T; z: T };
/** Rectangle defined by its top-left origin and size */
export type Rect<T = number> = Point2D<T> & Size2D<T>;

/** Circle defined by its center and radius */
export type Circle<T = number> = {
  center: Point2D<T>;
  radius: T;
};

/** Triangle defined by its three vertices */
export type Triangle<T = number> = {
  a: Point2D<T>;
  b: Point2D<T>;
  c: Point2D<T>;
};

/** Matrix stored as rows of values, e.g. Matrix<number>[row][col] */
export type Matrix<T = number> = T[][];

/** 2x2 matrix, row-major */
export type Matrix2x2<T = number> = readonly [readonly [T, T], readonly [T, T]];

/** 3x3 matrix, row-major (2D transforms in homogeneous coordinates) */
export type Matrix3x3<T = number> = readonly [
  readonly [T, T, T],
  readonly [T, T, T],
  readonly [T, T, T],
];

/** 4x4 matrix, row-major (3D transforms in homogeneous coordinates) */
export type Matrix4x4<T = number> = readonly [
  readonly [T, T, T, T],
  readonly [T, T, T, T],
  readonly [T, T, T, T],
  readonly [T, T, T, T],
];
/** Cylinder defined by the center of its base, radius and height (axis along +z) */
export type Cylinder<T = number> = {
  base: Point3D<T>;
  radius: T;
  height: T;
};
