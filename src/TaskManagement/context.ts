import React from "react";
import type { User } from "./type";

interface IAuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
}
export const AuthContext = React.createContext<IAuthContext>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser: (_user: User | null) => {},
});

interface IFilterContext {
  filters: { status: string; priority: string };
  setFilters: (filters: { status: string; priority: string }) => void;
}

export const FilterContext = React.createContext<IFilterContext>({
  filters: { status: "", priority: "" },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setFilters: (_filters: { status: string; priority: string }) => {},
});
