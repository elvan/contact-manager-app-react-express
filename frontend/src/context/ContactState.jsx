import { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  ADD_CONTACT,
  CLEAR_CONTACTS,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  GET_CONTACTS,
  SET_CURRENT,
  UPDATE_CONTACT,
} from './types';

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
  filtered: [],
  error: null,
};

export const ContactContext = createContext(initialState);

const contactReducer = (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            contact.name.match(regex) ||
            contact.email.match(regex) ||
            contact.phone.match(regex)
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

const ContactState = (props) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const addContact = (contact) => {
    contact.id = uuidv4();
    // @ts-ignore
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  const updateContact = (contact) => {
    // @ts-ignore
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  const deleteContact = (id) => {
    // @ts-ignore
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  const setCurrent = (contact) => {
    // @ts-ignore
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  const clearCurrent = () => {
    // @ts-ignore
    dispatch({ type: CLEAR_CURRENT });
  };

  const filterContacts = (contacts) => {
    // @ts-ignore
    dispatch({ type: FILTER_CONTACTS, payload: contacts });
  };

  const clearFilter = () => {
    // @ts-ignore
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        updateContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
