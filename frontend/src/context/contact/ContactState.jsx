import { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ADD_CONTACT, DELETE_CONTACT } from '../types';
import contactReducer from './contactReducer';

const initialState = {
  contacts: [
    {
      id: 1,
      name: 'Aaron',
      email: 'aaron@example.com',
      phone: '111-111-1111',
      type: 'personal',
    },
    {
      id: 2,
      name: 'Bob',
      email: 'bob@example.com',
      phone: '222-222-2222',
      type: 'professional',
    },
    {
      id: 3,
      name: 'Chris',
      email: 'chris@example.com',
      phone: '333-333-3333',
      type: 'personal',
    },
  ],
  current: null,
  filtered: null,
  error: null,
};

export const ContactContext = createContext(initialState);

const ContactState = (props) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const addContact = (contact) => {
    contact.id = uuidv4();
    // @ts-ignore
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  const deleteContact = (id) => {
    // @ts-ignore
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
