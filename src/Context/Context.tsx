import React, { createContext, useContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  isFetching: false,
  error: false,
};
const SessionStateContext = createContext(INITIAL_STATE);
const SessionDispatchContext = createContext<React.Dispatch<any>>(() => {});
export function UseSessionContext() {
  return useContext(SessionStateContext);
}
export function UseSessionDispatcher() {
  return useContext(SessionDispatchContext);
}
export const ContextProvider = ({ children }: any) => {
  const [SessionState, SessionDispatch] = useReducer(Reducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(SessionState.user));
  }, [SessionState]);
  return (
    <SessionDispatchContext.Provider value={SessionDispatch}>
      <SessionStateContext.Provider value={SessionState}>
        {children}
      </SessionStateContext.Provider>
    </SessionDispatchContext.Provider>
  );
};
