/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />

type AsyncReturnType<
  T extends (...args: never) => Promise<unknown>
> = ReturnType<T> extends Promise<infer U> ? U : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Saga = Generator<Effect, void, any>;
