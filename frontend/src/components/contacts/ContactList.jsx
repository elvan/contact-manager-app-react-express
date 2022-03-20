import { useContext } from 'react';
import { ContactContext } from '../../context/contact/ContactState';
import ContactItem from './ContactItem';

const ContactList = () => {
  const { contacts, filtered } = useContext(ContactContext);

  const filteredContacts = filtered ?? contacts;

  if (contacts.length === 0) {
    return <h4>No contacts found</h4>;
  }

  if (filtered?.length === 0) {
    return <h4>No filtered contacts found</h4>;
  }

  return (
    <>
      {filteredContacts &&
        filteredContacts.length > 0 &&
        filteredContacts.map((contact) => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
    </>
  );
};

export default ContactList;
