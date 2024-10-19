import type { ComponentType } from 'preact'
import { lazy } from 'preact/compat'

export function lazyImport<
  U extends string,
  T extends { [P in U]: ComponentType },
>(factory: () => Promise<T>, name: U): T {
  return Object.create({
    [name]: lazy(() => factory().then((module) => ({ default: module[name] }))),
  })
}
