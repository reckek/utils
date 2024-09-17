import { type RefObject, useEffect, useRef, useCallback } from "react";

type Handler<T extends keyof HTMLElementEventMap> = (
  this: HTMLElement,
  ev: HTMLElementEventMap[T]
) => unknown;

export function useEventManager(ref: RefObject<HTMLElement> | null) {
  const eventsRef = useRef<
    Map<
      keyof HTMLElementEventMap,
      Array<HTMLElementEventMap[keyof HTMLElementEventMap]>
    >
  >(new Map());

  const on = useCallback(
    <K extends keyof HTMLElementEventMap>(event: K, handler: Handler<K>) => {
      ref?.current?.addEventListener(event, handler);
      eventsRef.current.set(event, [
        // @ts-expect-error
        ...(eventsRef.current.get(event) || []),
        // @ts-expect-error
        handler,
      ]);
    },
    [ref?.current]
  );

  const off = useCallback(
    <K extends keyof HTMLElementEventMap>(event: K, handler: Handler<K>) => {
      ref?.current?.removeEventListener(event, handler);
    },
    [ref?.current]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const clearEvents = useCallback(
    (eventName?: keyof HTMLElementEventMap) => {
      eventsRef.current.forEach((value, key) => {
        for (const event of value) {
          if (typeof event === "undefined" || eventName === key) {
            // @ts-expect-error
            ref?.current?.removeEventListener(key, eventName);
          }
        }
      });
    },
    [eventsRef.current]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    return () => clearEvents();
  }, [eventsRef.current]);

  return { on, off, clear: clearEvents };
}
