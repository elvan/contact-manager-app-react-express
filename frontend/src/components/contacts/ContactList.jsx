import { useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ContactContext } from '../../context/ContactState';
import ContactItem from './ContactItem';

const ContactList = () => {
  const { contacts, filtered } = useContext(ContactContext);

  const filteredContacts =
    filtered && filtered.length > 0 ? filtered : contacts;

  if (filteredContacts.length === 0) {
    return <h4>No contacts found</h4>;
  }

  return (
    <>
      <TransitionGroup>
        {filteredContacts &&
          filteredContacts.length > 0 &&
          filteredContacts.map((contact) => (
            <CSSTransition key={contact.id} timeout={500} classNames='item'>
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </>
  );
};

export default ContactList;
