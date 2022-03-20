import { createContext, useReducer } from 'react';

const initialState = {
  token: localStorage.getItem('contact-manager-app-token'),
  user: null,
  error: null,
  isAuthenticated: false,
  isLoading: false,
};

export const AuthContext = createContext(initialState);

const authReducer = (state, action) => {};

const AuthState = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
