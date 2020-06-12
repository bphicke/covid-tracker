import React, { createContext, useReducer, ReactNode, Dispatch } from "react";
import { actionTypes } from "./actions";
import { ResponseData } from "../fetch/Fetch";

type Context = {
  state: State;
  dispatch: Dispatch<Action>;
};

const initialState = { loading: false, error: false, data: {} };

const store = createContext<Context>({
  state: { ...initialState },
  dispatch: () => {},
});
const { Provider } = store;

export type State = {
  loading: boolean;
  error: boolean;
  data: ResponseData;
};

export type CovidDataAction = {
  type: actionTypes.storeCovidData;
  // payload: { location: string; data: any };
  payload: ResponseData;
};

export type LoadingAction = {
  type: actionTypes.loading;
  payload: boolean;
};

export type ErrorAction = {
  type: actionTypes.error;
  payload: boolean;
};

export type Action = CovidDataAction | LoadingAction | ErrorAction;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.storeCovidData:
      // const { location, data } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case actionTypes.loading:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.error:
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error("Failed Action Type");
  }
};

const StateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
