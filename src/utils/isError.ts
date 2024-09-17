/**
 * @description
 * Test whether `value` is error object.
 *
 * @param value
 * @returns - `true` if `value` is error object, otherwise `false`.
 */
export function isError(value: unknown): value is Error {
  if (value instanceof Error) return true;
  if (
    value &&
    typeof value === "object" &&
    "stack" in value &&
    "message" in value
  )
    return true;

  const str = Object.prototype.toString.call(value);

  if (str.includes("Error") || str.includes("Exception")) {
    return true;
  }

  return false;
}
