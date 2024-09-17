type SetTimer = typeof setTimeout;
type CallbackId = ReturnType<SetTimer>;
type CallbackTimeout = Exclude<Parameters<SetTimer>[1], undefined>;

/**
 * @description
 * Create debounced effect
 *
 * This function create a debounced callback, which will be called only after a specified delay.
 * It's used to prevent multiple execution of a function in a short time.
 *
 * @param cb - The callback function to be debounced.
 * @param timeout - The timeout duration to wait before executing the callback in milliseconds.
 * @returns The debounced callback function.
 *
 * @example
 *
 */
export function createDebounce<T extends unknown[]>(
  cb: (...args: T) => void,
  timeout: CallbackTimeout
) {
  let timeoutId: CallbackId | null = null;

  const debounceEffect = (...arr: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => cb(...arr), timeout);
  };

  return debounceEffect;
}
