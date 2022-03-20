import { useContext } from 'react';
import { ContactContext } from '../../context/contact/ContactState';
import ContactItem from './ContactItem';

const ContactList = () => {
  const { contacts } = useContext(ContactContext);

  return (
    <>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </>
  );
};

export default ContactList;
