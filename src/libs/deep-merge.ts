export function deepMerge<T extends Record<string, any>>(
  target: T,
  source: T
): T {
  if (typeof target !== "object" || typeof source !== "object") {
    return target;
  }

  for (let key in source) {
    if (typeof source[key] === "object") {
      if (!target[key]) {
        target[key] = {} as T[Extract<keyof T, string>];
      }

      deepMerge(target[key], source[key]);
    } else {
      target[key as Extract<keyof T, string>] = source[key];
    }
  }

  return target;
}
