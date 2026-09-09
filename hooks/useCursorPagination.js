"use client";
import { useState, useCallback, useMemo } from "react";

/**
 * useCursorPagination — cursor-based pagination for client-side arrays.
 *
 * Features:
 *  - Returns a slice of `items` up to `pageSize`, plus a `cursor`
 *    that points to the next unloaded item index.
 *  - `loadMore()` appends the next page of items.
 *  - `hasMore` is false when all items have been loaded.
 *  - `reset()` restores to the initial page.
 *
 * Usage:
 *   const { page, hasMore, loadMore, reset, total } = useCursorPagination(allItems, 5);
 */
export default function useCursorPagination(items = [], pageSize = 5) {
  const [cursor, setCursor] = useState(pageSize);

  // Items currently displayed
  const page = useMemo(() => items.slice(0, cursor), [items, cursor]);

  // Whether there's still data to load
  const hasMore = cursor < items.length;

  // Append the next page
  const loadMore = useCallback(() => {
    setCursor((prev) => Math.min(prev + pageSize, items.length));
  }, [pageSize, items.length]);

  // Jump to a specific cursor position (useful for "jump to page N")
  const goTo = useCallback(
    (newCursor) => {
      setCursor(Math.min(Math.max(pageSize, newCursor), items.length));
    },
    [pageSize, items.length]
  );

  // Reset back to first page
  const reset = useCallback(() => {
    setCursor(pageSize);
  }, [pageSize]);

  return {
    page,
    hasMore,
    loadMore,
    goTo,
    reset,
    total: items.length,
    loadedCount: page.length,
    cursor,
  };
}
