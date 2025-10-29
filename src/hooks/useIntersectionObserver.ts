import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for intersection observer functionality.
 * Useful for lazy loading, infinite scroll, etc.
 */
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
): [React.RefObject<Element>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<Element>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return [ref, isIntersecting];
}

/**
 * Hook for infinite scroll functionality
 */
export function useInfiniteScroll(
  callback: () => void,
  hasMore: boolean,
  loading: boolean
): React.RefObject<Element> {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (isIntersecting && hasMore && !loading) {
      callback();
    }
  }, [isIntersecting, hasMore, loading, callback]);

  return ref;
}

/**
 * Hook for element visibility detection
 */
export function useVisibility(
  threshold: number = 0.1
): [React.RefObject<Element>, boolean] {
  return useIntersectionObserver({ threshold });
}