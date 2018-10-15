declare interface StringObj {
  [key: string]: string;
}

declare interface StringObjProtected {
  readonly [key: string]: string;
}

declare interface ObjProtected<T> {
  readonly [key: string]: T;
}
