import { createContext, useReducer } from 'react';
import contactReducer from './contactReducer';

const ContactContext = createContext({
  contacts: null,
  current: null,
  filtered: null,
  error: null,
});

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
