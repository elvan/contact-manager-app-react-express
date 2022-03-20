import React, { useContext } from 'react';
import { ContactContext } from '../../context/ContactState';

const ContactFilter = () => {
  const { filterContacts, clearFilter } = useContext(ContactContext);

  const onChange = (event) => {
    if (event.target.value !== '') {
      filterContacts(event.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <input type='text' placeholder='Filter Contacts...' onChange={onChange} />
    </form>
  );
};

export default ContactFilter;
