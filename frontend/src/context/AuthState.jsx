import axios from 'axios';
import { createContext, useReducer } from 'react';
import {
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from './types';

const initialState = {
  token: localStorage.getItem('contact-manager-app-token'),
  user: null,
  error: null,
  isAuthenticated: false,
  isLoading: false,
};

export const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('contact-manager-app-token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        token: null,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

const AuthState = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadUser = () => {
    console.log('loadUser');
  };

  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        '/api/users/register',
        formData,
        config
      );

      // @ts-ignore
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // @ts-ignore
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
    }
  };

  const login = () => {
    console.log('login');
  };

  const logout = () => {
    console.log('logout');
  };

  const clearErrors = () => {
    // @ts-ignore
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        loadUser,
        register,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
