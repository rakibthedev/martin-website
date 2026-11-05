"use client";

import { createContext, useContext, useState } from "react";

/** Shares the search query between the hero search / popular topics and the "All articles" grid. */
type Ctx = { query: string; setQuery: (q: string) => void };
const FilterCtx = createContext<Ctx>({ query: "", setQuery: () => {} });

export function ArticlesFilterProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  return <FilterCtx.Provider value={{ query, setQuery }}>{children}</FilterCtx.Provider>;
}

export const useArticlesFilter = () => useContext(FilterCtx);
