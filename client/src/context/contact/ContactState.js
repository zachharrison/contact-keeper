import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Oprah Winfrey',
        email: 'oprah@gmail.com',
        phone: '250-581-2210',
        type: 'professional'
      },
      {
        id: 2,
        name: 'Tom Hardy',
        email: 'thardy@gmail.com',
        phone: '250-580-1000',
        type: 'professional'
      },
      {
        id: 3,
        name: 'Margot Robbie',
        email: 'ozzygirl@gmail.com',
        phone: '250-780-4200',
        type: 'personal'
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // ADD CONTACT 
  const addContact = (contact) => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // DELETE CONTACT
  const deleteContact = (id) => dispatch({ type: DELETE_CONTACT, payload: id });

  // SET CURRENT CONTACT

  // CLEAR CURRENT CONTACT

  // UPDATE THE CONTACT

  // FILTER CONTACTS

  // CLEAR FILTER

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        deleteContact,
      }}
    >
      { props.children }
    </ContactContext.Provider>
  );
};

export default ContactState;